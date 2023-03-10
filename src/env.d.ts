/// <reference types="vite/client" />


declare module '*.vue' {
    import {DefineComponent} from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}
declare module 'uview-plus' {
    import HttpRequest from "uview-plus/libs/luch-request";

    export function install(): void

    interface $u {
        http: HttpRequest,
        toast:Function,
        [key: string]: any
    }

    global {
        interface Uni {
            $u: $u
        }
    }
}
declare module 'pinia-plugin-persistedstate'
declare module 'wx'