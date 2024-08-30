import type { DictVO } from "@/api/http/base/BaseRoleController";
import type { IDialogFormProps } from "@/model/types/IDialogFormProps";
import type { BaseMenuDO } from "@/api/http/base/BaseMenuController";

export interface IRoleDialogFormProps extends IDialogFormProps {
  userDictList: DictVO[];
  authDictList: DictVO[];
  menuDictList: BaseMenuDO[];
}
