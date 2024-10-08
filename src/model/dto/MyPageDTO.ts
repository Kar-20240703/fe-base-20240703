import type MyOrderDTO from "@/model/dto/MyOrderDTO";

export default interface MyPageDTO {
  current?: string; // 第几页

  pageSize?: string; // 每页显示条数

  sort?: Record<string, string>; // 排序字段（只在前端使用，实际传值：order）

  order?: MyOrderDTO; // 排序字段
}
