"use strict";
var common_vendor = require("../../../common/vendor.js");
function useTouchMove(callback) {
  const moving = common_vendor.ref(false);
  const startY = common_vendor.ref(0);
  const coverTransform = common_vendor.ref("");
  const coverTransition = common_vendor.ref("");
  const coverTouchStart = (e) => {
    startY.value = e.touches[0].clientY;
    coverTransition.value = "transform .2s linear";
  };
  const coverTouchMove = (e) => {
    let moveY = e.touches[0].clientY;
    let moveDistance = moveY - startY.value;
    if (moveDistance < 0) {
      moving.value = false;
      return;
    }
    moving.value = true;
    if (moveDistance >= 60) {
      moveDistance = 60;
    }
    if (moveDistance > 0 && moveDistance <= 60) {
      coverTransform.value = `translateY(${moveDistance}px)`;
    }
  };
  const coverTouchEnd = (e) => {
    if (moving.value == false) {
      return;
    }
    coverTransform.value = "translateY(0px)";
    moving.value = false;
    coverTransition.value = "transform 0.3s cubic-bezier(.21,1.93,.53,.64)";
    callback && callback();
  };
  return {
    coverTransform,
    coverTransition,
    coverTouchStart,
    coverTouchMove,
    coverTouchEnd
  };
}
exports.useTouchMove = useTouchMove;
