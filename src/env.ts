export interface Env {
    baseUrl: string
}

const betaEnv: Env = {
    baseUrl: "https://betabdsadmin.youxianvip.com"
}

const masterEnv: Env = {
    baseUrl: "https://admin.bds.yituochina.com"
}

export function getEnv(): Env {
    const mode = process.env.REACT_APP_MODE ?? "beta";
    if (mode === "master") return masterEnv;
    return betaEnv;
}


