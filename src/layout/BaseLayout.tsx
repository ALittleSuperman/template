import React, {useEffect, useState} from "react"
import {NavigationView, useStore, Routers, useCurrentRoute, Router, Navigation} from "f22"
import NavigationBar from "../components/navigation/NavigationBar"
import {Layout, Dropdown, Menu} from "antd";
import NavigationTabsBar from "../components/navigation/NavigationTabsBar";
import styles from "./BaseLayout.module.css"
import {UserInfoEntity} from "../components/pages/user-help/Login/UserInfoEntity";
import {DoubleRightOutlined, DoubleLeftOutlined, CaretDownOutlined} from "@ant-design/icons"

const {Sider, Header, Content, Footer} = Layout
export default (props: {}) => {
  const {state: routers} = useStore<Routers>("routerTabs");
  const {state, dispatch} = useStore<UserInfoEntity>("userInfo");
  if (!state) Navigation.replace("/Login")
  const [collapsed, setCollapsed] = useState(false)

  const menu = (
    <Menu>
      <Menu.Item onClick={(item) => {
        // 退出登录
        if (item.key === "item_0") {
          dispatch("set", null)
          Navigation.replace("/Login")
        }
      }}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header style={{color: "#fff", paddingLeft: 24}}>
                <span style={{fontSize: 20}}><img onClick={() => {
                  Navigation.replace("/Main");
                }}
                                                  style={{cursor: "pointer"}}
                                                  src="http://youxian-1251509844.cos.ap-beijing.myqcloud.com/goods/bcfdb78710dc462fbd3f4def6aa52bf6.jpg"
                                                  width={230} height={37}/></span>
        <Dropdown overlay={menu}>
          <span style={{float: "right"}}> {state?.user_name} <CaretDownOutlined/></span>
        </Dropdown>
      </Header>
      <Layout>
        <Sider
          collapsed={collapsed}
          style={{
            height: "calc(100vh - 64px)",
            position: "relative"
          }}
        >
          <NavigationBar></NavigationBar>
          <div className={styles.collapsed} onClick={() => setCollapsed(collapsed => !collapsed)}>
            {
              collapsed ? <DoubleRightOutlined/> : <DoubleLeftOutlined/>
            }
          </div>
        </Sider>
        <Content>
          <Layout>
            <NavigationTabsBar></NavigationTabsBar>
            <Content>
              <div style={{
                margin: '0px 16px 0',
                padding: "16px",
                boxSizing: "border-box",
                height: "calc(100vh - 166px)",
                backgroundColor: "#fff",
                overflowX: "hidden"
              }}>
                {
                  process.env.NODE_ENV === "development" ?
                    <NavigationView/>
                    :
                    <NavigationView cacheKeys={routers.map(item => item.path as string)}/>
                }
              </div>
            </Content>
            <Footer style={{textAlign: 'center', padding: "12px 0"}}>Design ©2020 Created by
              xindongnet.com</Footer>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  )
}
