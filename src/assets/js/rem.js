/**

 * @Author: ww
 * @Date: 2022/5/26
 * @Path: src/assets/js
 * @Name: rem.js

 **/

// 设置rem单位
function setRem() {
    let html = document.getElementsByTagName("html");
    let width = document.body.offsetWidth;
    let rem = width/1920*100
    if(rem>100) rem=100
    html[0].style.fontSize= rem + "px"
}

function debounce(fn, wait) {
    let timeout = null;      //定义一个定时器
    return function () {
        if (timeout !== null)
            clearTimeout(timeout);  //清除这个定时器
        timeout = setTimeout(fn, wait);
    }
}
setRem()

// 添加事件 addEventListener
// 参数 resize  监听浏览器窗口大小
window.addEventListener('resize', debounce(setRem, 500));








