import type MyOrderDTO from "@/model/dto/MyOrderDTO";
import { http } from "@/utils/http";
import { baseApi } from "@/api/http/utils";
import type { PureHttpRequestConfig } from "@/utils/http/types";

export interface NotEmptyIdSet {
  idSet?: string[]; // 主键 idSet，required：true，format：int64
}

// 批量删除
export function baseMenuDeleteByIdSet(
  form: NotEmptyIdSet,
  config?: PureHttpRequestConfig
) {
  return http.request<string>(
    "post",
    baseApi("/base/menu/deleteByIdSet"),
    form,
    config
  );
}

export interface BaseMenuPageDTO {
  redirect?: string; // 重定向，优先级最高
  linkFlag?: boolean; // 是否外链，即，打开页面会在一个新的窗口打开
  auths?: string; // 权限，多个可用逗号拼接，例如：menu:insertOrUpdate,menu:page,menu:deleteByIdSet,menu:infoById
  pageSize?: string; // 每页显示条数，format：int64
  authFlag?: boolean; // 是否是权限菜单，权限菜单：不显示，只代表菜单权限
  parentId?: string; // 父节点id（顶级则为0），format：int64
  showFlag?: boolean; // 是否显示在 左侧的菜单栏里面，如果为 false，也可以通过 $router.push()访问到
  path?: string; // 页面的 path，备注：相同父菜单下，子菜单 path不能重复
  current?: string; // 第几页，format：int64
  router?: string; // 路由
  name?: string; // 菜单名
  firstFlag?: boolean; // 是否是起始页面，备注：只能存在一个 firstFlag === true 的菜单
  enableFlag?: boolean; // 是否启用
  order?: MyOrderDTO; // 排序字段
}

export interface BaseMenuDO {
  redirect?: string; // 重定向，优先级最高
  linkFlag?: number; // 是否外链，即，打开页面会在一个新的窗口打开，可以配合 router，format：int32
  orderNo?: number; // 排序号（值越大越前面，默认为 0），format：int32
  hiddenPageContainerFlag?: boolean; // 是否隐藏：PageContainer
  icon?: string; // 图标
  updateTime?: string; // 修改时间，format：date-time
  remark?: string; // 备注
  pid?: string; // 父节点id（顶级则为0），format：int64
  uuid?: string; // 该菜单的 uuid，用于：同步租户菜单等操作，备注：不能重复
  showFlag?: number; // 是否显示在 左侧的菜单栏里面，如果为 false，也可以通过 $router.push()访问到，format：int32
  updateId?: string; // 修改人id，format：int64
  path?: string; // 页面的 path，备注：相同父菜单下，子菜单 path不能重复
  router?: string; // 路由
  createTime?: string; // 创建时间，format：date-time
  children?: BaseMenuDO[]; // 子节点
  createId?: string; // 创建人id，format：int64
  name?: string; // 菜单名
  id?: string; // 主键 id，format：int64
  firstFlag?: number; // 是否是起始页面，备注：只能存在一个 firstFlag === true 的菜单，format：int32
  enableFlag?: boolean; // 是否启用
}

// 分页排序查询
export function baseMenuPage(
  form: BaseMenuPageDTO,
  config?: PureHttpRequestConfig
) {
  return http.request<BaseMenuDO>(
    "post",
    baseApi("/base/menu/page"),
    form,
    config
  );
}

export interface ChangeNumberDTO {
  idSet?: string[]; // 主键 idSet，required：true，format：int64
  number?: string; // 需要改变的数值，required：true，format：int64
}

// 通过主键 idSet，加减排序号
export function baseMenuAddOrderNo(
  form: ChangeNumberDTO,
  config?: PureHttpRequestConfig
) {
  return http.request<string>(
    "post",
    baseApi("/base/menu/addOrderNo"),
    form,
    config
  );
}

// 获取：当前用户绑定的菜单
export function baseMenuUserSelfMenuList(config?: PureHttpRequestConfig) {
  return http.request<BaseMenuDO[]>(
    "post",
    baseApi("/base/menu/userSelfMenuList"),
    undefined,
    config
  );
}

export interface NotNullId {
  id?: string; // 主键 id，required：true，format：int64
}

// 通过主键id，查看详情
export function baseMenuInfoById(
  form: NotNullId,
  config?: PureHttpRequestConfig
) {
  return http.request<BaseMenuDO>(
    "post",
    baseApi("/base/menu/infoById"),
    form,
    config
  );
}

// 查询：树结构
export function baseMenuTree(
  form: BaseMenuPageDTO,
  config?: PureHttpRequestConfig
) {
  return http.request<BaseMenuDO[]>(
    "post",
    baseApi("/base/menu/tree"),
    form,
    config
  );
}

export interface BaseMenuInsertOrUpdateDTO {
  redirect?: string; // 重定向，优先级最高
  linkFlag?: boolean; // 是否外链，即，打开页面会在一个新的窗口打开
  orderNo?: number; // 排序号（值越大越前面，默认为 0），format：int32
  hiddenPageContainerFlag?: boolean; // 是否隐藏：PageContainer
  auths?: string; // 权限，多个可用逗号拼接，例如：menu:insertOrUpdate,menu:page,menu:deleteByIdSet,menu:infoById
  icon?: string; // 图标
  pid?: string; // 父节点id（顶级则为0），format：int64
  remark?: string; // 备注
  showFlag?: boolean; // 是否显示在 左侧的菜单栏里面，如果为 false，也可以通过 $router.push()访问到
  path?: string; // 页面的 path，备注：相同父菜单下，子菜单 path不能重复
  router?: string; // 路由
  name?: string; // 菜单名，required：true
  id?: string; // 主键 id，format：int64
  firstFlag?: boolean; // 是否是起始页面，备注：只能存在一个 firstFlag === true 的菜单
  enableFlag?: boolean; // 是否启用
}

// 新增/修改
export function baseMenuInsertOrUpdate(
  form: BaseMenuInsertOrUpdateDTO,
  config?: PureHttpRequestConfig
) {
  return http.request<string>(
    "post",
    baseApi("/base/menu/insertOrUpdate"),
    form,
    config
  );
}
