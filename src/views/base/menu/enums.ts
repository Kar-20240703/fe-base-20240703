import type { OptionsType } from "@/components/ReSegmented";

export const showFlagOptions: Array<OptionsType> = [
  {
    label: "显示",
    tip: "会在菜单中显示",
    value: true
  },
  {
    label: "隐藏",
    tip: "不会在菜单中显示",
    value: false
  }
];

export const enableFlagOptions: Array<OptionsType> = [
  {
    label: "启用",
    value: true
  },
  {
    label: "禁用",
    value: false
  }
];
