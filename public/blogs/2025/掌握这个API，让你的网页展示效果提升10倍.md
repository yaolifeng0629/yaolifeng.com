-   Hey, 我是 沉浸式趣谈
-   本文首发于 【沉浸式趣谈】，我的个人博客 https://yaolifeng.com 也同步更新。
-   转载请在文章开头注明出处和版权信息。
-   如果本文对您有所帮助，请点赞、评论、转发，支持一下，谢谢！

## 如何原生实现让任意 div 全屏展示

最近在做一个项目，需要实现点击按钮让某个 div 全屏展示的功能。

第一反应是用 CSS 设置 `position: fixed` 加上宽高 100%，但这样并不是真正的全屏，因为浏览器的工具栏还在。

后来发现浏览器原生就提供了 Fullscreen API，可以让任意元素真正全屏展示，今天就来聊聊这个有趣的 API。

### 基础用法：让元素全屏

先来看最简单的使用方式。假设我们有一个文章阅读器，想让用户能够专注阅读：

```html
<div id="reader">
    <article>
        <h1>一篇很棒的文章</h1>
        <p>这是文章的正文内容...</p>
    </article>
    <button id="fullscreenBtn">
        <span>进入阅读模式</span>
        <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
        </svg>
    </button>
</div>

<script>
    const reader = document.getElementById('reader');
    const fullscreenBtn = document.getElementById('fullscreenBtn');

    fullscreenBtn.addEventListener('click', () => {
        // 请求全屏
        reader.requestFullscreen().catch(err => {
            console.log('全屏展示失败:', err);
        });
    });
</script>

<style>
    #reader {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background: #fff;
    }

    #fullscreenBtn {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 8px 16px;
        border: none;
        background: #f0f0f0;
        cursor: pointer;
        border-radius: 4px;
    }

    #fullscreenBtn:hover {
        background: #e0e0e0;
    }
</style>
```

就这么简单！调用元素的 `requestFullscreen()` 方法就能让它全屏展示了。不过要注意，这是个异步操作，返回的是 Promise，所以最好加上 catch 来处理可能的错误。

### 退出全屏怎么搞？

有进就要有出。退出全屏的方法也很简单，但这里有个小坑：退出全屏的方法是在 `document` 上调用，而不是在元素上：

```javascript
// 错误示范 ❌
reader.exitFullscreen();

// 正确方式 ✅
document.exitFullscreen().catch(err => {
    console.log('退出全屏失败:', err);
});
```

来看个完整的示例，实现全屏切换功能：

```html
<!DOCTYPE html>
<html>
    <head>
        <title>阅读模式切换示例</title>
        <style>
            #reader {
                max-width: 800px;
                margin: 20px auto;
                padding: 30px;
                background: #fff;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }

            #reader.dark-mode {
                background: #1a1a1a;
                color: #fff;
            }

            #toggleBtn {
                display: flex;
                align-items: center;
                gap: 5px;
                padding: 8px 16px;
                border: none;
                background: #f0f0f0;
                cursor: pointer;
                border-radius: 4px;
                margin: 20px 0;
            }

            #toggleBtn:hover {
                background: #e0e0e0;
            }

            /* 全屏时的样式 */
            #reader:fullscreen {
                padding: 50px;
                max-width: none;
                box-shadow: none;
            }

            #reader:fullscreen #toggleBtn {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(240, 240, 240, 0.8);
            }
        </style>
    </head>
    <body>
        <div id="reader">
            <article>
                <h1>深入理解 JavaScript 闭包</h1>
                <p>闭包是 JavaScript 中最强大的特性之一，它允许函数访问其词法作用域之外的变量...</p>
                <p
                    >让我们通过一个简单的例子来理解闭包：当我们创建一个函数时，它不仅包含函数的代码，还包含对其周围作用域中变量的引用...</p
                >
                <p>这种特性使得我们可以创建私有变量、数据封装，以及实现模块化的代码结构...</p>
            </article>

            <button id="toggleBtn">
                <span>切换阅读模式</span>
                <svg viewBox="0 0 24 24" width="16" height="16">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                </svg>
            </button>
        </div>

        <script>
            const reader = document.getElementById('reader');
            const toggleBtn = document.getElementById('toggleBtn');
            const btnText = toggleBtn.querySelector('span');

            toggleBtn.addEventListener('click', () => {
                if (!document.fullscreenElement) {
                    // 当前不是全屏，进入全屏
                    reader
                        .requestFullscreen()
                        .then(() => {
                            btnText.textContent = '退出阅读模式';
                            reader.classList.add('dark-mode');
                        })
                        .catch(err => {
                            console.log('进入全屏失败:', err);
                        });
                } else {
                    // 当前是全屏，退出全屏
                    document
                        .exitFullscreen()
                        .then(() => {
                            btnText.textContent = '切换阅读模式';
                            reader.classList.remove('dark-mode');
                        })
                        .catch(err => {
                            console.log('退出全屏失败:', err);
                        });
                }
            });
        </script>
    </body>
</html>
```

### 全屏状态的监听和样式调整

有时候我们需要知道元素是否处于全屏状态，比如要在全屏时显示不同的 UI。浏览器提供了 `fullscreenchange` 事件来监听全屏状态的变化：

```javascript
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        console.log('进入全屏啦！');
        console.log('全屏的元素是：', document.fullscreenElement);
    } else {
        console.log('退出全屏啦！');
    }
});
```

CSS 中也有专门的选择器 `:fullscreen` 来设置元素在全屏时的样式：

```css
#player {
    background: #f0f0f0;
    padding: 20px;
}

/* 全屏时的样式 */
#player:fullscreen {
    background: #000;
    padding: 50px;
}
```

### 实战示例：图片查看器

来做个实用的例子 —— 点击图片查看大图，再点击退出全屏：

```html
<!DOCTYPE html>
<html>
    <head>
        <title>图片查看器</title>
        <style>
            .image-viewer {
                cursor: pointer;
                /* 使用 flex 布局让提示文字在图片下方 */
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }

            .image-viewer img {
                max-width: 300px;
                transition: transform 0.3s;
            }

            /* 提示文字样式 */
            .image-viewer .hint {
                color: #666;
                font-size: 14px;
                padding: 8px;
                background: #f5f5f5;
                border-radius: 4px;
                display: flex;
                align-items: center;
                gap: 5px;
            }

            /* 添加一个小图标 */
            .hint svg {
                width: 16px;
                height: 16px;
                fill: #666;
            }

            .image-viewer:fullscreen {
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .image-viewer:fullscreen img {
                max-width: 90vw;
                max-height: 90vh;
                object-fit: contain;
            }

            /* 全屏时隐藏提示文字 */
            .image-viewer:fullscreen .hint {
                display: none;
            }
        </style>
    </head>
    <body>
        <div class="image-viewer" id="imageViewer">
            <img src="your-image.jpg" alt="示例图片" />
            <div class="hint">
                <svg viewBox="0 0 24 24">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                </svg>
                <span>点击图片可全屏查看</span>
            </div>
        </div>

        <script>
            const imageViewer = document.getElementById('imageViewer');

            imageViewer.addEventListener('click', e => {
                // 如果点击的是提示文字，不触发全屏
                if (e.target.closest('.hint')) return;

                if (!document.fullscreenElement) {
                    imageViewer.requestFullscreen().catch(err => {
                        console.log('进入全屏失败:', err);
                    });
                } else {
                    document.exitFullscreen().catch(err => {
                        console.log('退出全屏失败:', err);
                    });
                }
            });
        </script>
    </body>
</html>
```

### 浏览器兼容性处理

虽然现代浏览器都支持 Fullscreen API，但有些老浏览器可能需要加前缀。这里提供一个兼容性更好的封装：

```javascript
function requestFullscreen(element) {
    const requestMethod =
        element.requestFullscreen ||
        element.webkitRequestFullscreen || // Chrome, Safari
        element.mozRequestFullScreen || // Firefox
        element.msRequestFullscreen; // IE/Edge

    if (requestMethod) {
        return requestMethod.call(element);
    }

    return Promise.reject('当前浏览器不支持全屏 API');
}

function exitFullscreen() {
    const exitMethod =
        document.exitFullscreen ||
        document.webkitExitFullscreen ||
        document.mozCancelFullScreen ||
        document.msExitFullscreen;

    if (exitMethod) {
        return exitMethod.call(document);
    }

    return Promise.reject('当前浏览器不支持全屏 API');
}

// 判断是否支持全屏
function isFullscreenEnabled() {
    return (
        document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled
    );
}

// 获取当前全屏元素
function getFullscreenElement() {
    return (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    );
}
```

使用封装后的方法：

```javascript
const myElement = document.getElementById('myElement');

// 检查是否支持全屏
if (!isFullscreenEnabled()) {
    console.log('抱歉，您的浏览器不支持全屏功能');
    return;
}

// 进入全屏
requestFullscreen(myElement).catch(err => {
    console.log('进入全屏失败:', err);
});

// 退出全屏
exitFullscreen().catch(err => {
    console.log('退出全屏失败:', err);
});
```

### 一些注意事项

1. **全屏请求必须由用户触发**
   浏览器出于安全考虑，`requestFullscreen()` 必须由用户操作触发（如点击事件），不能在页面加载时自动触发。

2. **iframe 的全屏限制**
   如果要在 iframe 中使用全屏功能，需要给 iframe 添加 `allowfullscreen` 属性：

    ```html
    <iframe src="page.html" allowfullscreen></iframe>
    ```

3. **全屏元素的样式**
   进入全屏后，元素默认会占满整个屏幕。如果想保持原有布局，需要自己设置合适的样式。

4. **键盘事件**
   在全屏模式下，某些键盘快捷键可能会被浏览器接管（如 ESC 退出全屏），要注意这一点。

### 总结

Fullscreen API 虽然看起来简单，但用好了真的很强大。关键点：

-   `element.requestFullscreen()` 进入全屏
-   `document.exitFullscreen()` 退出全屏
-   `fullscreenchange` 事件监听状态变化
-   `:fullscreen` 选择器设置全屏样式
-   注意浏览器兼容性处理

希望这篇文章对你有帮助！如果觉得不错，别忘了点个赞 👍
