import { h, ref } from "vue";
import {
  type BaseMenuDO,
  baseMenuInsertOrUpdate,
  type BaseMenuInsertOrUpdateDTO,
  type BaseMenuPageDTO,
  baseMenuTree
} from "@/api/http/base/BaseMenuController";
import { addDialog, type DialogOptions } from "@/components/ReDialog/index";
import { deviceDetection } from "@pureadmin/utils";
import CommonConstant from "@/model/constant/CommonConstant";
import editForm from "@/views/base/menu/editForm.vue";
import { ToastSuccess } from "@/utils/ToastUtil";

interface IEditFormProps extends BaseMenuInsertOrUpdateDTO {
  higherMenuOptions?: BaseMenuDO[];
}

export function useHook() {
  const search = ref<BaseMenuPageDTO>({});
  const loading = ref<boolean>(false);
  const dataList = ref<BaseMenuDO[]>([]);
  const form = ref<BaseMenuInsertOrUpdateDTO>({});
  const formRef = ref();
  const formProps = ref<IEditFormProps>({});

  function onSearch() {
    loading.value = true;
    baseMenuTree(search.value)
      .then(res => {
        dataList.value = res.data;
        formProps.value.higherMenuOptions = res.data;
      })
      .finally(() => {
        loading.value = false;
      });
  }

  function resetSearch(searchRef) {
    if (!searchRef) return;
    searchRef.resetFields();
    onSearch();
  }

  function openDialog(title: string, row?: BaseMenuDO) {
    form.value = {
      ...row,
      orderNo: row?.orderNo || CommonConstant.DEFAULT_ORDER_NO,
      showFlag: row?.showFlag || true
    };

    const options: DialogOptions<IEditFormProps> = {
      title: title,
      props: formProps.value,
      width: "45%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: done => {
        const realFormRef = formRef.value.getRef();
        const curData = form.value;
        realFormRef.validate(valid => {
          if (!valid) {
            return;
          }
          baseMenuInsertOrUpdate(curData).then(res => {
            ToastSuccess(res.msg);
            done(); // 关闭弹框
            onSearch(); // 刷新表格数据
          });
        });
      }
    };

    addDialog(options);
  }

  return { search, loading, dataList, onSearch, resetSearch, openDialog, form };
}
