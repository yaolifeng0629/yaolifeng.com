-   Hey, 我是 沉浸式趣谈
-   本文首发于【沉浸式趣谈】，我的个人博客 **https://yaolifeng.com** 也同步更新。
-   转载请在文章开头注明出处和版权信息。
-   如果本文对您有所帮助，请 **点赞**、**评论**、**转发**，支持一下，谢谢！

给大家分享一个关于 Node.js 的宝藏项目，目前已经有 10+万 Star，非常值得学习。

## 这个项目是啥？

Node.js Best Practices 是 GitHub 上一个超级热门的项目，

目前已经有 102k Star。它汇集了 100+条关于 Node.js 开发的最佳实践，涵盖了从项目架构到安全防范的方方面面。

-   官网：`https://practica.dev`

-   Github：`https://github.com/goldbergyoni/nodebestpractices`

最厉害的是，它不像其他很多教程那样空洞地讲概念，每条最佳实践都包含了：

1. **简明扼要的说明** - 适合快速浏览
2. **详细的解释** - 为什么要这么做
3. **代码例子** - 好代码 vs 坏代码的对比
4. **相关资源链接** - 想深入了解的话可以继续学习

而且内容分门别类，按照项目结构、错误处理、编码规范、测试、安全、性能等主题组织，非常清晰。

## 实战案例

### 实践一：利用 CPU 多核能力

之前的问题：

```javascript
// app.js - 传统单进程启动方式
const express = require('express');
const app = express();
// ...其他代码
app.listen(3000, () => console.log('服务启动在3000端口'));
```

我们的服务器是 8 核 CPU，但上面的代码只能利用其中一个核心，大量计算资源被浪费。

参考最佳实践 5.6「利用 CPU 多核」，改进后：

```javascript
// app.js - 使用Node.js内置cluster模块
const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`主进程 ${process.pid} 正在运行`);

    // 根据CPU数量创建工作进程
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`工作进程 ${worker.process.pid} 已退出`);
        // 当工作进程退出后，立即创建新的工作进程
        cluster.fork();
    });
} else {
    // 工作进程共享同一个TCP连接
    const express = require('express');
    const app = express();

    // ...其他代码

    app.listen(3000, () => {
        console.log(`工作进程 ${process.pid} 监听端口3000`);
    });
}
```

效果立竿见影！CPU 利用率从原来的 12%左右提升到了 80%以上，系统吞吐量提高了 6 倍多。

### 实践二：避免阻塞事件循环

之前的问题：

```javascript
app.get('/process-data', (req, res) => {
    // 直接在API请求中执行CPU密集型操作
    const result = processLargeDataSet(req.body.data);
    res.json(result);
});

function processLargeDataSet(data) {
    // 一个CPU密集型的操作，处理几十万条记录
    let result = [];
    for (let i = 0; i < data.length; i++) {
        // 复杂计算...
    }
    return result;
}
```

这段代码在处理大量数据时会阻塞事件循环，导致其他用户请求无法得到响应，超时报错。

参考最佳实践 7.1「不要阻塞事件循环」，改进后：

```javascript
const { Worker } = require('worker_threads');

app.get('/process-data', (req, res) => {
    const data = req.body.data;

    // 创建一个工作线程来处理CPU密集型任务
    const worker = new Worker('./data-processor.js', {
        workerData: data,
    });

    worker.on('message', result => {
        res.json(result);
    });

    worker.on('error', err => {
        res.status(500).json({ error: err.message });
    });
});

// data-processor.js
const { workerData, parentPort } = require('worker_threads');

function processLargeDataSet(data) {
    // 复杂计算...
    let result = [];
    // 处理数据...
    return result;
}

const result = processLargeDataSet(workerData);
parentPort.postMessage(result);
```

改进后，即使在处理大数据集的时候，API 服务依然能流畅响应其他请求，用户体验大大提升。

### 实践三：使用中间件处理错误

之前的问题：

```javascript
app.get('/api/users/:id', (req, res) => {
    try {
        const user = getUserById(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
    } catch (error) {
        console.error('获取用户出错:', error);
        res.status(500).json({ error: '服务器内部错误' });
    }
});

// 每个路由都重复类似的错误处理代码...
```

这种方式导致每个路由都要写重复的错误处理代码，不仅冗余，也容易漏掉某些错误处理。

参考最佳实践 2.1「使用 Async-Await 或 Promise 处理异步错误」，改进后：

```javascript
// 统一的错误处理中间件
app.use((err, req, res, next) => {
    console.error('应用错误:', err);

    // 根据错误类型返回不同状态码
    if (err.name === 'NotFoundError') {
        return res.status(404).json({ error: err.message });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }

    // 默认服务器错误
    res.status(500).json({ error: '服务器内部错误' });
});

// 自定义错误类
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}

// 路由变得简洁
app.get('/api/users/:id', async (req, res, next) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            throw new NotFoundError('用户不存在');
        }
        res.json(user);
    } catch (error) {
        next(error); // 传递给错误处理中间件
    }
});
```

改进后，代码更加简洁，错误处理也更加统一和健壮。

## 我最推荐的几条最佳实践

在所有的实践中，以下五条是我认为对前端开发转 Node.js 的开发者最有价值的：

1. **不要在客户端保存敏感信息** - 看似常识，但很多人会犯的错误
2. **使用环境变量存储机密数据** - 不要把数据库密码直接写在代码里
3. **优先使用内置方法** - 很多人喜欢引入 lodash，其实原生方法已经足够好
4. **一次只处理一个错误** - 嵌套的错误处理是噩梦的开始

## 写在最后

说实话，之前我总觉得编码就是实现功能，能跑就行。

接触 Node.js Best Practices 后，我才明白写出高质量的 Node.js 代码需要考虑这么多方面。

最后，强烈推荐每一个使用 Node.js 的开发者都去看看这个项目。

它不仅告诉你 **"怎么做"**，更重要的是解释了 **"为什么要这么做"**，这对于提升开发能力至关重要。
