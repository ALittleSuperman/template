import React, {useEffect, WheelEvent, useRef} from "react";
import styles from "./NavigationTabsBar.module.css"
import {Breadcrumb, Button, Dropdown, Menu} from 'antd';
import {useStore, useCurrentRoute, NavLink, Routers, Navigation, Router} from "f22";
import {ClickParam} from "antd/lib/menu";
import {CloseCircleOutlined, MenuOutlined} from "@ant-design/icons"

const ButtonGroup = Button.Group;

export default () => {
  const {state: routers, dispatch} = useStore<Routers>("routerTabs");
  const scrollTabsRef = useRef<HTMLDivElement>(null);
  const currentRouter = useCurrentRoute()
  useEffect(() => {
    if (!currentRouter || currentRouter.path === "/") return
    dispatch<Router>("add", currentRouter)
    // 自动跳转
    setTimeout(() => {
      if (!scrollTabsRef?.current) return
      const index = routers.findIndex(item => item.name === currentRouter?.name && item.path === currentRouter?.path);
      const tNum = (index === -1) ? routers.length : index;
      scrollTabsRef.current.scrollLeft = tNum * 100
    }, 100)
  }, [currentRouter])


  useEffect(() => {
    if (process.env.NODE_ENV === "development") return
    if (!routers.length && currentRouter?.path !== "/Main") {
      Navigation.replace("/Main")
    }
  }, [routers])


  // 更多操作
  const handleMenuClick = ({key}: ClickParam) => {
    if (key === "other") {
      dispatch("closeOther", currentRouter);
    }

    if (key === "all") {
      dispatch("reset");
    }
  }


  // 鼠标滚轮事件
  const wheelHandler = (e: WheelEvent<HTMLDivElement>) => {
    if (!scrollTabsRef?.current) return
    const maxWidth = scrollTabsRef.current.scrollWidth;
    const scrollLeft = scrollTabsRef.current.scrollLeft;
    let newWidth = scrollLeft + e.deltaY;
    newWidth = newWidth > maxWidth ? maxWidth : newWidth <= 0 ? 0 : newWidth
    scrollTabsRef.current.scrollLeft = newWidth
  };

  return (
    <div className={styles.container}>
      {/*<BreadcrumbNavigation></BreadcrumbNavigation>*/}
      <Button size="middle"
              style={{marginRight: "10px"}}
              type={"/Main" === Navigation.location().pathname ? "primary" : "default"}
              onClick={() => Navigation.push("/Main")}
      >首页</Button>
      <div className={styles.tabs} onWheel={wheelHandler} ref={scrollTabsRef}>
        {
          routers.map((item, index) => {
            const isCurrentRuter = item.path === Navigation.location().pathname
            return (
              <ButtonGroup key={index} style={{marginRight: "8px"}}>
                <Button
                  type={isCurrentRuter ? "primary" : "default"}
                  onClick={() => {
                    Navigation.push(item.path as string)
                  }}
                >{item.name}</Button>
                <Button onClick={() => {
                  dispatch("minus", item)
                  if (isCurrentRuter) {
                    Navigation.back()
                  }
                }} type={isCurrentRuter ? "primary" : "default"}>
                  <CloseCircleOutlined/>
                </Button>
              </ButtonGroup>
            )
          })
        }
      </div>
      <div className={styles.tabsOther}>
        <Dropdown overlay={
          <Menu onClick={handleMenuClick}>
            <Menu.Item key="other">关闭其他</Menu.Item>
            <Menu.Item key="all">关闭全部</Menu.Item>
          </Menu>
        }>
          <Button>
            <MenuOutlined/>
          </Button>
        </Dropdown>
      </div>
    </div>
  )
}


const BreadcrumbNavigation = () => {
  const router = useCurrentRoute();
  return (
    <Breadcrumb style={{width: "150px"}}>
      <Breadcrumb.Item><NavLink to="/Main">首页</NavLink></Breadcrumb.Item>
      {
        router && router.path !== "/Main" ?
          <Breadcrumb.Item>
            {router?.name}
          </Breadcrumb.Item>
          : null
      }
    </Breadcrumb>
  )
}
