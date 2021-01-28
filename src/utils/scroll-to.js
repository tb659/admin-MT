// 二次缓出函数 缓动效果
Math.easeInOutQuad = function(t, b, c, d) {
  t /= d / 2
  if (t < 1) return (c / 2) * t * t + b
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}

// 缓动函数
var requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  )
})()

/**
 * @param {number} amount 因为要检测滚动元素太难了，把它们都移动一下
 */
function move(amount) {
  document.documentElement.scrollTop = amount
  document.body.parentNode.scrollTop = amount
  document.body.scrollTop = amount
}

function position() {
  return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop
}

/**
 * @param {number} to
 * @param {number} duration
 * @param {Function} callback
 */
export function scrollTo(to, duration = 500, callback) {
  const start = position()
  const change = to - start
  const increment = 20
  let currentTime = 0
  var animateScroll = function() {
    // 递增时间
    currentTime += increment
    // 用二次缓出函数求值
    var val = Math.easeInOutQuad(currentTime, start, change, duration)
    // 滚动页面
    move(val)
    // 动画是否结束
    if (currentTime < duration) {
      requestAnimFrame(animateScroll)
    } else {
      if (callback && typeof callback === 'function') {
        // 动画结束回调
        callback()
      }
    }
  }
  animateScroll()
}
