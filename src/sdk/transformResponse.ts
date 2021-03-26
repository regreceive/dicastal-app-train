/**
 * 查询返回数据转换入口，防止接口变动
 */
import camelCase from 'lodash/camelCase';

function toCamel<S, T>(obj: S) {
  return Object.entries(obj).reduce<T>((prev, [key, value]) => {
    return { ...prev, [camelCase(key)]: value };
  }, {} as T);
}

/** 设备实例相关量测实例 */
interface MeasurementRes {
  measurements?: {
    bound_point_instance_id: number;
  }[];
}
export function measurement(data: MeasurementRes) {
  return (data?.measurements ?? []).map((row) => ({
    boundPointInstanceId: row.bound_point_instance_id,
  }));
}

interface EntityPointsRes {
  entity_id: number;
  attributes: {
    display_name: string;
  };
}
/** 实体查询 - 测点实例 */
export function entityPoints(data: EntityPointsRes[]) {
  return data.map(({ entity_id, attributes }) => ({
    entityId: entity_id,
    displayName: attributes.display_name,
  }));
}
