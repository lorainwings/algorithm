# bytedance 面试题

1. https 与 http 的区别, 为什么要采用?

    http 不安全, 是明文传输, 在传输层加上了 SSL/TLS 安全传输层

2. cdn 怎么确定就是附近的主机?

    CNAME 地址记录别名, A 记录(地址记录)

    通过 ip 得到最近的服务器地址, 通过 url 资源获取哪台服务器上有, 再结合负载均衡情况进行访问

3. iframe 通信?

    window.name + iframe ==> a.html(加载 b,后面重定向到 c.html,就能获取到 window.name) b(跨域 window.name) c.html

    window.hash + iframe ==> a.html(ifr.src=b.html#xx=yy) b(hashchange=>获取后=>ifr.src=c.html#k=v) c.html(window.parent.parent.cb(res))

    postMessage (ifr.onload ==> .contentWinodw.postMessage(obj,host 可以为\*)=>onmessage)

4. 为什么使用 Redux 而不是用 get/set?

    Redux 设计理念: 使用简单数组和对象来表示状态, 使用对象来描述状态的改变, 状态的改变逻辑必须是纯函数

    Redux 三个特点: 单一数据源, 所有数据都是只读的(只能通过 dispath('name',action)来触发), 处理 action 只是新生成对象而不修改原状态

    注定了 Redux 的数据可靠性, 可测试性, 无副作用, 数据的来源是清晰的, 数据的修改也能追溯

    而 set/get 的状态管理混乱, 无数据可靠性(不清楚 set 是否会覆盖其他的对象), 无法追溯数据来源(直接 get 太混乱, 导致复用性差), 不便于测试
