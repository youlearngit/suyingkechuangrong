import {ref} from "vue";

//头部拖拉
export default function useTouchMove(callback:Function) {
    const moving = ref(false)
    const startY = ref(0)
    const coverTransform = ref('')
    const coverTransition = ref('')

    const coverTouchStart = (e: any) => {
        //滑动开始 记录目标原始坐标
        startY.value = e.touches[0].clientY;
        coverTransition.value = 'transform .2s linear'
    }
    const coverTouchMove = (e: any) => {
        //滑动中
        let moveY = e.touches[0].clientY; //记录移动的坐标
        let moveDistance = moveY - startY.value; //计算当前坐标与原始坐标的差
        if (moveDistance < 0) {
            //如果小于0 不做操作
            moving.value = false
            return;
        }
        moving.value = true

        if (moveDistance >= 60) {
            //如果差在该区间内
            moveDistance = 60;
        }

        if (moveDistance > 0 && moveDistance <= 60) {
            coverTransform.value = `translateY(${moveDistance}px)`
        }
    }

    const coverTouchEnd = (e: any) => {
        //滑动结束 回到原始位置
        if (moving.value == false) {
            return;
        }
        coverTransform.value = 'translateY(0px)'
        moving.value = false
        coverTransition.value = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)'
        callback&&callback()
    }
    return {
        coverTransform, coverTransition,
        coverTouchStart, coverTouchMove, coverTouchEnd
    }
}
