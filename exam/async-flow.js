const task = (timer, light) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (light === 'red') {
                red()
            }
            else if (light === 'green') {
                green()
            }
            else if (light === 'yellow') {
                yellow()
            }
            resolve()
        }, timer)
    })
}

// 异步流程交替递归执行
(function step() {
    task(3000, 'red')
        .then(() => task(1000, 'green'))
        .then(() => task(2000, 'yellow'))
        .then(step)
}())
