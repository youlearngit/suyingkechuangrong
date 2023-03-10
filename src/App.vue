<script setup lang="ts">
import {onHide, onLaunch, onShow} from "@dcloudio/uni-app";

onLaunch(() => {
  
})
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import "uview-plus/index.scss";
@import "static/iconfont/iconfont.css";
</style>
