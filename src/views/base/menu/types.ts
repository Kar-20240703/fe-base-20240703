import type { BaseMenuDO } from "@/api/http/base/BaseMenuController";
import type { R } from "@/model/vo/R";

export interface IEditFormProps {
  higherMenuOptions?: BaseMenuDO[];
  title?: string;
  confirmFun?: () => Promise<R<any>>;
  confirmAfterFun?: (res: R<any>) => void;
}
