import BaseLayout from "./layout/BaseLayout";
import {Routers} from "f22";

export const routerConfig: Routers = [
  {
    path: "/Login",
    asyncComponent: () => import("./components/pages/user-help/Login")
  },
  {
    path: "/",
    component: BaseLayout,
    redirect: "/Main",
    children: [
      {
        name: "首页",
        path: "/Main",
        asyncComponent: () => import("./components/pages/main/Main")
      }
    ]
  },
]
