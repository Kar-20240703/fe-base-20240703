import type { BaseMenuDO } from "@/api/http/base/BaseMenuController";

export interface IEditFormProps {
  higherMenuOptions?: BaseMenuDO[];
  title?: string;
  confirmFun?: Promise<any>;
}
