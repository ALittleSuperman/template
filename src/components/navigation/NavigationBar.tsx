import React, {useCallback, useEffect, useState} from "react";
import {Menu} from "antd"
import {menusConfig, MenuConfig} from "./menus"
import {Navigation, useCurrentRoute, findDeep} from "f22";
import {ClickParam} from "antd/lib/menu";

const {SubMenu} = Menu;

enum ThemeEnum {
    LIGHT = "light",
    DARK = "dark"
}

export default () => {
    const [theme] = useState<string>(ThemeEnum.DARK)
    const [menus] = useState(menusConfig)
    const [menusPath, setMenusPath] = useState<string[]>([])
    const router = useCurrentRoute();

    useEffect(() => {
        if (!router) return
        const result = findDeep(router?.path, menusConfig, "to")
        const newMenusPath = result[1]
        const newMenusStringPath = newMenusPath.map(item => item + "")
        setMenusPath(newMenusStringPath)
    }, [router])

    const handleClick = ({key, keyPath}: ClickParam) => {
        setMenusPath(keyPath);
        const keyArray: number[] = key.split("-").map((item: string) => parseInt(item));
        let item: MenuConfig = {
            icon: "",
            name: "",
            children: menusConfig
        };
        for (let i of keyArray) {
            // @ts-ignore
            item = item.children[i]
        }
        Navigation.push(item.to as string)
    };

    return (
        <Menu
            theme={theme as (ThemeEnum.DARK | ThemeEnum.LIGHT)}
            onClick={handleClick}
            style={{marginTop:-4}}
            selectedKeys={[menusPath.join("-")]}
            mode="inline"
        >
            {
                menus.map((item, index) => {
                    if (item.children) {
                        return (
                            <SubMenu
                                key={`${index}`}
                                title={
                                    <span>
                                            <span>{item.name}</span>
                                        </span>
                                }
                            >
                                {
                                    item.children.map((child, childIndex) => {
                                        return <Menu.Item key={`${index}-${childIndex}`}>
                                                   <span>
                                            <span>{child.name}</span>
                                        </span>
                                        </Menu.Item>
                                    })
                                }
                            </SubMenu>
                        )
                    }
                    return <Menu.Item key={`${index}`}>
                               <span>
                                            <span>{item.name}</span>
                                        </span>
                    </Menu.Item>
                })
            }
        </Menu>
    )
}
