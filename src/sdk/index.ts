/**
 * 模拟portal的sdk，用于当前子应用独立运行
 */
import MockService from './lib/MockService';
import * as service from '@/services';

export type Convert<T, C> = {
  [P in keyof T]: C;
};

export interface ResponseData<T = any> {
  code?: number;
  data?: T;
  results?: {
    series?: {
      tags: { node_id: string; [key: string]: string };
      values: any[];
    }[];
  }[];
}

interface PortalResponseData {
  err: null | Error;
  res: ResponseData;
}

interface SemiService {
  get: <T = any>(url: string) => Promise<ResponseData<T>>;
  post: <T = any>(url: string, data: any) => Promise<ResponseData<T>>;
}

export type AppMapType = {
  alone: boolean;
  appType: string;
  category: string;
  key: string;
  label: string;
  url: string;
};

/**
 * APP列表
 */
class AppMap {
  private map = new Map();
  public get(key: string): AppMapType | Promise<AppMapType> {
    if (this.map.has(key)) {
      return this.map.get(key);
    }
    return service
      .getInstance('front_apps', {
        attributes: 'alone,type,category,key,name,url',
      })
      .then((res) => {
        (res?.data ?? []).map(
          (row: {
            attributes: {
              alone: boolean;
              type: string;
              category: string;
              key: string;
              name: string;
              url: string;
            };
          }) => {
            // 和波波的声明一致
            const { type, name, ...restProps } = row.attributes;
            this.map.set(row.attributes.key, {
              ...restProps,
              appType: type,
              label: name,
              url: row.attributes.url.replace(
                '%PUBLIC%/',
                window.location.origin + window.location.pathname,
              ),
            });
          },
        );
        return this.map.get(key);
      });
  }
}

const mockSDK = {
  loadCss(win: Window, resolve?: Function) {
    resolve && resolve();
  },
  lib: {
    utils: {
      service: {
        k2Assets: new MockService(window.env.RUNTIME_API_K2ASSETS as string),
        datalabModeler: new MockService(
          window.env.RUNTIME_API_DATALAB_MODELER as string,
        ),
        dataService: new MockService(
          window.env.RUNTIME_API_DATA_SERVICE as string,
        ),
        influxdb: new MockService(
          window.env.RUNTIME_API_INFLUXDB as string,
          true,
        ),
        gateway: new MockService(window.env.RUNTIME_API_GATEWAY as string),
      },
    },
    central: {
      appConfig: {
        state: {
          appMap: new AppMap(),
        },
      },
    },
  },
  config: {},
};

function proxyFact(service: MockService) {
  const proxyMethod = ['get', 'post'];
  return new Proxy(service, {
    get(target: MockService, p: string) {
      if (proxyMethod.includes(p)) {
        return (...args: any[]) => {
          return Reflect.apply(Reflect.get(target, p), target, args)
            .end()
            .then((response: PortalResponseData) => {
              return Promise.resolve(response?.res ?? {});
            });
        };
      }
      return Reflect.get(target, p);
    },
  });
}

let defaultSDK: typeof mockSDK;
try {
  // https禁止这样访问
  defaultSDK = window.$$K2RootWindow.$$_K2_SDK as typeof mockSDK;
} catch (_) {
  defaultSDK = mockSDK;
}
if (!defaultSDK) {
  defaultSDK = mockSDK;
}

type SemiServiceList = Convert<
  typeof defaultSDK.lib.utils.service,
  SemiService
>;

export default defaultSDK;
export const portalWindow = window.$$K2RootWindow;
export const api = Object.entries(
  defaultSDK.lib.utils.service,
).reduce<SemiServiceList>((prev, [key, value]) => {
  return { ...prev, [key]: proxyFact(value) };
}, {} as SemiServiceList);
