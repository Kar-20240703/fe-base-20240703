import { http } from "@/utils/http";
import type { R } from "@/model/vo/R";

export const getAsyncRoutes = () => {
  return http.request<R<any[]>>("get", "/get-async-routes");
};
