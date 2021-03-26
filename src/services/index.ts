import { api, Convert } from '@/sdk';
import transform, * as transformQuery from '@/sdk/transformRequest';

type ConvertRequest<T> = Partial<Convert<T, any>>;

interface Relation {
  attributes: { [key: string]: any };
  entity_id: number;
  data: Relation[];
}

/** 通用查表 */
export async function getInstance<T = any>(
  entityName: string,
  query?: ConvertRequest<typeof transformQuery.entity>,
) {
  return api.dataService.get<{ attributes: T }[]>(
    `/data/namespaces/{namespace_name}/entity_types/${entityName}/entities?${transform(
      query,
      transformQuery.entity,
    )}`,
  );
}

/** 通用关联查表 */
export async function getRelation(
  entityName: string,
  query?: ConvertRequest<typeof transformQuery.relation>,
) {
  return api.dataService.get<Relation[]>(
    `/data/namespaces/{namespace_name}/entity_types/${entityName}/entities_via_relation_types?${transform(
      query,
      transformQuery.relation,
    )}`,
  );
}

/** 取得产线的机台 */
export async function getMachines<
  T = { display_name: string; name: string }
>(query: {}) {
  return api.k2Assets.get<T[]>(
    `/namespaces/{namespace_name}/asset_instances/?${transform(query, {})}`,
  );
}

/** 取得设备实例的量测 */
export async function getMeasurements(instanceName: string, query?: {}) {
  return api.k2Assets.get<{
    measurements: {
      bound_point_instance_id: number;
      display_name: string;
      point_instance_name: string;
      name: string;
    }[];
  }>(
    `/namespaces/{namespace_name}/asset_instances/${instanceName}/measurements?${transform(
      query,
      {},
    )}`,
  );
}

/**
 * 获得当前机器设备的测点时序
 */
export function getMachineTS(instanceName: string, query?: {}) {
  return api.k2Assets.get(
    `/namespaces/{namespace_name}/asset_instances/${instanceName}/measurements/data/ts?${transform(
      query,
      {},
    )}`,
  );
}

/** 通用influxdb时序数据查询 **/
export async function getInfluxdb(sql: string) {
  return api.influxdb.get('/query?q=' + sql);
}

/** 工况数据 */
export async function getSummary(id: string) {
  return api.gateway.get(`/mock/api/summary?id=${id}`);
}
