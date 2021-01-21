/**
* electron 主进程
*/
const { app, BrowserWindow, Notification, ipcMain } = require('electron');
const notifier = require('node-notifier');
let win;

// 监听ready事件
app.on('ready', () => {
    win = new BrowserWindow({
        width: 300,
        height: 300,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('./index.html')
    handleIPC()
})

function handleIPC() {
    ipcMain.handle('work-notification', async function () {
        let res = await new Promise((resolve, reject) => {
            // let notification = notifier.notify({
            notifier.notify({
                title: '任务结束',
                // body: '是否开始休息',
                message: '是否开始休息',
                // actions: [{ text: '开始休息', type: 'button' }],
                closeButtonText: '继续工作'
            }, function (err, res, metadata) {
                console.log({ err, res, metadata })
            })
            // notification.show()
            // notification.on('action', () => {
            //     resolve('rest')
            // })
            // notification.on('close', () => {
            //     resolve('work')
            // })
            notifier.on('click', () => {
                resolve('rest')
            })
            notifier.on('timeout', () => {
                resolve('work')
            })
        })
        return res
    })
}