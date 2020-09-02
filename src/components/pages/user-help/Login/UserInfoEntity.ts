export interface PlatformInfo {
    user_id: number;
    phone: string;
    sys_mark: string;
    username: string;
}

export interface StoreInfo {
    oms_store_id: string;
    oms_user_id: string;
    phone: string;
    name: string;
    qr_code: string;
    id: string;
}

export interface UserInfoEntity {
    area: number;
    store_info: StoreInfo;
    open_id: string;
    phone: string;
    user_name: string;
    platform_info: PlatformInfo;
    id: number;
    sys_mark: string;
    token: string;
    status: number;
}
