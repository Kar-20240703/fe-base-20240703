export default interface MyOrderDTO {
  name: string; // 排序的字段名

  value?: "ascend" | "descend"; // ascend（升序，默认） descend（降序）
}
