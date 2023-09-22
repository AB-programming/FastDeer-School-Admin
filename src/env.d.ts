interface ImportMetaEnv {
    readonly VITE_TOKEN: string
    readonly VITE_END_ADDRESS: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}