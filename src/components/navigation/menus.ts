export interface MenuConfig {
  name: string,
  icon: string,
  to?: string,
  children?: MenuConfig[]
}

export const menusConfig: MenuConfig[] = [
  {
    name: "首页",
    icon: "home",
    to: "/Main"
  },
]
