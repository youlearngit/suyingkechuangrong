import {createSSRApp} from "vue";
import App from "./App.vue";
import {pinia} from './store'
import viewPlus from 'uview-plus'
import config from './config/request'
export function createApp() {
    const app = createSSRApp(App);
    app.use(pinia).use(viewPlus).use(config)
    return {
        app,
    };
}
