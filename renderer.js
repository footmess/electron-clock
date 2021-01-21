const { ipcRenderer } = require('electron');
const timer = require('timer.js');

function startWork(num) {
    let workTimer = new timer({
        ontick: (ms) => {
            updateTime(ms);
        },
        onend: () => {
            notification();
        }
    })
    workTimer.start(num);
}

/**
*更新时间
*@param ms
**/
function updateTime(ms) {
    let timerContainer = document.getElementById('timer-container');
    // 小数位保留0位，取整
    let s = (ms / 1000).toFixed(0);
    // 秒
    let ss = s % 60;
    // 分
    let mm = (s / 60).toFixed(0);
    timerContainer.innerText = `${String(mm).padStart(2, 0)} : ${String(ss).padStart(2, 0)}`
}

/**
*通知
**/
async function notification() {
    // 渲染进程触发主进程事件
    let res = await ipcRenderer.invoke('work-notification');
    if (res === 'rest') {
        setTimeout(() => {
            alert('休息');
        }, 5 * 1000)
        // startWork(5)
    } else if (res === 'work') {
        startWork(15)
    }
}

startWork(10);