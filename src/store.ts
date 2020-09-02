import {Model, createModel, Routers, Router} from "f22";
import {UserInfoEntity} from "./components/pages/user-help/Login/UserInfoEntity";
import {Session} from "inspector";


// 路由tabs
export const routerTabs = createModel<Routers>({
    state: [],
    reducers: {
        // 重置
        reset() {
            return [];
        },
        // 添加路由
        add(state, route: Router) {
            if (state.find(item => item.path === route.path && item.name === route.name) || route.path === "/Main") return state
            return [...state, route]
        },
        // 减去路由
        minus(state, route: Router) {
            return state.filter(item => !(item.path === route.path && item.name === route.name))
        },
        // 关闭其他
        closeOther(state, route: Router) {
            return state.filter(item => (item.path === route.path && item.name === route.name))
        }
    }
});

// 登录信息
const userInfoStr = sessionStorage.getItem("userInfo");
const initUserInfo = JSON.parse(userInfoStr ? userInfoStr : "null");
export const userInfo = createModel<UserInfoEntity | null>({
    state: initUserInfo,
    reducers: {
        set(state, payload: UserInfoEntity | null) {
            payload ? sessionStorage.setItem("userInfo", JSON.stringify(payload)) : sessionStorage.removeItem("userInfo")
            return payload
        }
    }
});


