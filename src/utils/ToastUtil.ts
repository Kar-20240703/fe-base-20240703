import type { VNode } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

export function ToastSuccess(msg: string | VNode, duration: number = 5000) {
  if (!msg) {
    return;
  }

  ElMessage.success({
    message: msg,
    duration
  });
}

export function ToastInfo(msg: string | VNode, duration: number = 5000) {
  if (!msg) {
    return;
  }

  ElMessage.info({
    message: msg,
    duration
  });
}

export function ToastWarning(msg: string | VNode, duration: number = 5000) {
  if (!msg) {
    return;
  }

  ElMessage.warning({
    message: msg,
    duration
  });
}

export function ToastError(msg: string | VNode, duration: number = 8000) {
  if (!msg) {
    return;
  }

  ElMessage.error({
    message: msg,
    duration
  });
}

// 注意：【confirmFun】和【cancelFun】，如果是 http请求，则需要 return http 请求，如果不是 Promise，则在方法前面加 async，即可
export function ExecConfirm(
  confirmFun: () => Promise<any>,
  cancelFun?: () => Promise<any>,
  msg?: string | VNode,
  res?: (value?: any) => void,
  rej?: (reason?: any) => void
) {
  ElMessageBox({
    title: "提示",
    message: msg,
    showCancelButton: true,
    type: "warning",
    boxType: "confirm",
    showClose: false,
    closeOnPressEscape: false,
    closeOnClickModal: false,
    beforeClose: (action, instance, done) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        instance.confirmButtonDisabled = true;

        if (confirmFun) {
          confirmFun()
            .then(() => {
              done(); // 关闭
              if (res) {
                res();
              }
            })
            .catch(() => {
              done(); // 关闭
              if (rej) {
                rej();
              }
            });
        } else {
          done(); // 关闭
          if (res) {
            res();
          }
        }
      } else {
        if (cancelFun) {
          cancelFun()
            .then(() => {
              done(); // 关闭
              if (rej) {
                rej();
              }
            })
            .catch(() => {
              done(); // 关闭
              if (rej) {
                rej();
              }
            });
        } else {
          done(); // 关闭
          if (rej) {
            rej();
          }
        }
      }
    }
  });
}

// 注意：【confirmFun】和【cancelFun】，如果是 http请求，则需要 return http 请求，如果不是 Promise，则在方法前面加 async，即可
export function ExecConfirmPromise(
  confirmFun: () => Promise<void>,
  cancelFun?: () => Promise<void>,
  msg?: VNode
) {
  return new Promise<any>((res, rej) => {
    ExecConfirm(confirmFun, cancelFun, msg, res, rej);
  });
}
