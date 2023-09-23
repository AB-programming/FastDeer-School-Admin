interface ImportMetaEnv {
    readonly VITE_TOKEN: string
    readonly VITE_END_ADDRESS: string,
    readonly VITE_OPENID: string,
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}