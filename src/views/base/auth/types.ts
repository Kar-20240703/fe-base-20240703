import type { DictVO } from "@/api/http/base/BaseRoleController";
import type { IDialogFormProps } from "@/model/types/IDialogFormProps";

export interface IAuthDialogFormProps extends IDialogFormProps {
  roleDictList: DictVO[];
}
