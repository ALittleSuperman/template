import React, {useState} from "react";
import styles from "./index.module.css"
import {fetch, MethodEnum, useStore} from "f22";
import {Navigation} from "f22";
import logo from "../../../../assets/img/login/logo@2x.png"
import icon1 from "../../../../assets/img/login/ic-官网@2x.png"
import icon2 from "../../../../assets/img/login/ic-手机APP下载@2x.png"
import userIcon from "../../../../assets/img/login/ic-用户名@2x.png"
import passwordIcon from "../../../../assets/img/login/ic-密码@2x.png"
import {UserInfoEntity} from "./UserInfoEntity";

function loginService(request: { phone: string, password: string }) {
    return fetch<UserInfoEntity>({
        url: "/user/login",
        method: MethodEnum.POST,
        request
    })
}


export default () => {
    const [account, setAccount] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const {state, dispatch} = useStore("userInfo");

    function loginHandler() {
        dispatch("set", [])
            Navigation.replace("/")
    }

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.topBox}>
                    <img src={logo}/>
                </div>
                <div className={styles.topOther}>
                    <div><img src={icon1} alt=""/><span onClick={() => {
                        window.open("http://www.xindongnet.com/")
                    }}>官网链接</span></div>
                    <div><img src={icon2}/><span onClick={() => {
                        window.open("http://www.xindongnet.com/app")
                    }}>手机APP下载</span></div>
                </div>
            </div>
            <div className={styles.middle}>
                <div className={styles.box}>
                    <div className={styles.boxTabs}>
                        <div className={styles.line}/>
                        <div className={styles.boxTab}>账号登录</div>
                    </div>
                    <div style={{padding: "0 24px"}}>
                        <Input placeholder="用户名/手机号" icon={userIcon} style={{marginTop: "40px"}} value={account}
                               onChange={(e) => {
                                   setAccount(e.target.value);
                               }}/>
                        <Input placeholder="密码" icon={passwordIcon} style={{marginTop: "10px"}} value={password}
                               isPassword
                               onChange={(e) => {
                                   setPassword(e.target.value);
                               }}/>
                        <div className={styles.button} onClick={loginHandler}/>
                        <div className={styles.other}>
                            {/*<span>申请入驻</span>*/}
                            {/*<span>忘记密码?</span>*/}
                        </div>
                    </div>


                </div>
            </div>
            <div className={styles.bottom}>
                <div>让千万食材商家生意更轻松</div>
                <div>优鲜供应链有限公司版权所有-Copyright ©2006-2020</div>
            </div>
        </div>
    )
}

interface InputProps {
    value?: string,
    onChange?: (e: any) => void;
    icon: string,
    placeholder: string,
    style?: { [key: string]: any },
    isPassword?: boolean
}

const Input = (props: InputProps) => {
    const [focus, setFocus] = useState(false);
    const style = props.style ?? {}
    return (
        <div className={styles.input}
             style={{borderColor: focus ? "rgba(53, 114, 254, 1)" : "rgba(239, 239, 239, 1)", ...style}}>
            <img src={props.icon}/>
            <input type={props.isPassword ? "password" : "text"}
                   value={props.value}
                   onChange={props.onChange}
                   placeholder={props.placeholder}
                   onFocus={() => setFocus(true)}
                   onBlur={() => setFocus(false)}
            />
        </div>
    )
}


