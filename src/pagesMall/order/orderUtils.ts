//取消订单
export const cancelOrder = (orderId: number) => {
  uni.navigateTo({
    url: '/pagesMall/order/cancelOrder?orderId=' + orderId
  });
}


export const  refundStatus = (value: number) => {
  if (value == 0) {
    return '待审核'
  } else if (value == 1) {
    return '已拒绝'
  } else if (value == 2) {
    return '审核通过'
  } else if (value == 3) {
    return '待发货'
  } else if (value == 4) {
    return '退款成功'
  } else if (value == 5) {
    return '待平台收货'
  }
}


export const setStatus = (value: number) => {
  if (value == 0) {
    return '待付款'
  } else if (value == 1) {
    return '支付中'
  } else if (value == 2) {
    return '待发货'
  } else if (value == 3) {
    return '待收货'
  } else if (value == 4) {
    return '待评价'
  } else if (value == 5) {
    return '已完成'
  } else if (value == 6) {
    return '商品已退款'
  } else if (value == 7) {
    return '商品退款中'
  } else if (value == 8) {
    return '退款申请不通过'
  }else if (value == 9) {
    return '退款成功'
  }
  if (value == -1) {
    return '已取消'
  }
}