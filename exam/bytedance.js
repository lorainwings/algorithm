//1. https 与 http的区别, 为什么要采用?
// http不安全, 是明文传输, 在传输层加上了SSL/TLS安全传输层

//2. cdn怎么确定就是附近的主机?

// 通过ip得到最近的服务器地址, 通过url资源获取哪台服务器上有, 再结合负载均衡情况进行访问

//3. iframe通信?

// window.name + iframe ==> a.html(加载b,后面重定向到c.html,就能获取到window.name)  b(跨域window.name) c.html
// window.hash + iframe ==> a.html(ifr.src=b.html#xx=yy)  b(hashchange=>获取后=>ifr.src=c.html#k=v) c.html(window.parent.parent.cb(res))
// postMessage (ifr.onload=>ifr.contentWinodw.postMessage(obj,host 可以为*)=>onmessage)