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

/** 通用influxdb时序数据查询 **/
export async function getInfluxdb(sql: string) {
  return api.influxdb.get('/query?q=' + sql);
}

/** 工况数据 */
export async function getSummary(id: string) {
  return api.gateway.get(`/api/list-data?id=${id}`);
}
