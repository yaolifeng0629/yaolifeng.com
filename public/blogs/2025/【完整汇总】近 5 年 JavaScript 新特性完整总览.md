-   Hey, 我是 沉浸式趣谈
-   本文首发于 【沉浸式趣谈】，我的个人博客 https://yaolifeng.com 也同步更新。
-   转载请在文章开头注明出处和版权信息。
-   如果本文对您有所帮助，请点赞、评论、转发，支持一下，谢谢！

## ES2024：不断增强的实用性 API

-   **`Promise.withResolvers()`**：一次性创建 Promise 及其控制函数

    ```javascript
    const { promise, resolve, reject } = Promise.withResolvers();
    promise.then(value => console.log(value));
    resolve('搞定！'); // 输出：搞定！
    ```

-   **正则表达式`v`标志**：支持命名捕获组的变量使用

    ```javascript
    const regex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/v;
    const result = regex.exec('2024-05-20');
    console.log(result.groups.year); // 2024
    ```

-   **`Atomics.waitAsync()`**：SharedArrayBuffer 的异步等待

    ```javascript
    const buffer = new SharedArrayBuffer(4);
    const view = new Int32Array(buffer);
    Atomics.waitAsync(view, 0, 0).then(() => {
        console.log('值已更改！');
    });
    ```

-   **`Object.groupBy()`和`Map.groupBy()`**：按条件分组数据

    ```javascript
    const inventory = [
        { name: '苹果', type: '水果' },
        { name: '白菜', type: '蔬菜' },
        { name: '香蕉', type: '水果' },
    ];
    const result = Object.groupBy(inventory, item => item.type);
    console.log(result);
    // 输出: { "水果": [{name:"苹果",...}, {name:"香蕉",...}], "蔬菜": [{name:"白菜",...}] }
    ```

-   **类型数组新增`TypedArray.prototype.with()`**：创建特定位置值替换的新数组
    ```javascript
    const array = new Uint8Array([1, 2, 3, 4]);
    const newArray = array.with(2, 42);
    console.log(newArray); // Uint8Array [1, 2, 42, 4]
    ```

## ES2023：数组操作的非破坏性革命

-   **`Array.prototype.findLast()`**：从后向前查找数组元素

    ```javascript
    const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
    const lastEven = numbers.findLast(n => n % 2 === 0);
    console.log(lastEven); // 2
    ```

-   **`Array.prototype.toReversed()`**：返回新的反转数组而不修改原数组

    ```javascript
    const numbers = [1, 2, 3, 4, 5];
    const reversed = numbers.toReversed();
    console.log(numbers); // [1, 2, 3, 4, 5] - 原数组不变
    console.log(reversed); // [5, 4, 3, 2, 1] - 新数组
    ```

-   **`Array.prototype.toSorted()`**：返回新的排序数组而不修改原数组

    ```javascript
    const fruits = ['香蕉', '苹果', '橙子'];
    const sorted = fruits.toSorted();
    console.log(fruits); // ["香蕉", "苹果", "橙子"] - 原数组不变
    console.log(sorted); // ["橙子", "苹果", "香蕉"] - 新数组
    ```

-   **`Array.prototype.toSpliced()`**：返回新的修改后数组而不修改原数组

    ```javascript
    const colors = ['红', '绿', '蓝'];
    const newColors = colors.toSpliced(1, 1, '黄', '紫');
    console.log(colors); // ["红", "绿", "蓝"] - 原数组不变
    console.log(newColors); // ["红", "黄", "紫", "蓝"] - 新数组
    ```

-   **`Array.prototype.with()`**：返回新的指定索引替换后的数组
    ```javascript
    const numbers = [1, 2, 3, 4, 5];
    const newNumbers = numbers.with(2, 99);
    console.log(numbers); // [1, 2, 3, 4, 5] - 原数组不变
    console.log(newNumbers); // [1, 2, 99, 4, 5] - 新数组
    ```

## ES2022：类字段与顶层异步的突破

-   **类私有字段与私有方法**：`#privateField`终于标准化

    ```javascript
    class Counter {
        #count = 0; // 私有字段，外部无法直接访问

        increment() {
            return ++this.#count;
        }

        get value() {
            return this.#count;
        }
    }

    const counter = new Counter();
    console.log(counter.increment()); // 1
    console.log(counter.value); // 1
    // console.log(counter.#count); // 错误：私有字段不可访问
    ```

-   **模块顶层`await`**：无需包装在异步函数中

    ```javascript
    // 以前必须包装在async函数内
    // 现在可以直接在模块顶层使用
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    export { data };
    ```

-   **`.at()`方法**：数组和字符串支持负索引

    ```javascript
    const fruits = ['苹果', '香蕉', '橙子', '葡萄'];
    console.log(fruits.at(-1)); // "葡萄" - 最后一项
    console.log(fruits.at(-2)); // "橙子" - 倒数第二项

    const str = 'Hello';
    console.log(str.at(-1)); // "o"
    ```

-   **`Object.hasOwn()`**：替代繁琐的`Object.prototype.hasOwnProperty.call()`
    ```javascript
    const obj = { name: '张三' };
    // 以前的写法
    console.log(Object.prototype.hasOwnProperty.call(obj, 'name')); // true
    // 现在的写法
    console.log(Object.hasOwn(obj, 'name')); // true
    ```

## ES2021：字符串处理与逻辑操作的增强

-   **`String.prototype.replaceAll()`**：一次性替换所有匹配

    ```javascript
    const message = 'JavaScript真棒，JavaScript万岁！';
    // 以前需要用正则：message.replace(/JavaScript/g, "JS");
    const newMessage = message.replaceAll('JavaScript', 'JS');
    console.log(newMessage); // "JS真棒，JS万岁！"
    ```

-   **`Promise.any()`**：任意一个 Promise 成功则成功

    ```javascript
    const promises = [
        fetch('https://api.example.com/endpoint-1').then(r => r.json()),
        fetch('https://api.example.com/endpoint-2').then(r => r.json()),
        fetch('https://api.example.com/endpoint-3').then(r => r.json()),
    ];

    // 只要有一个成功就返回
    Promise.any(promises)
        .then(result => console.log('最快的成功结果:', result))
        .catch(errors => console.log('全部失败:', errors));
    ```

-   **逻辑赋值运算符**：`??=`、`&&=`、`||=`简化条件赋值操作

    ```javascript
    // ||= 示例
    let config = {};
    config.debug ||= true; // 等同于 config.debug = config.debug || true;

    // &&= 示例
    let user = { name: '张三', logout: () => console.log('已登出') };
    user.logout &&= user.logout(); // 如果logout存在则执行

    // ??= 示例
    let settings = { theme: null };
    settings.theme ??= '默认'; // 如果theme为null或undefined则赋值
    console.log(settings.theme); // "默认"
    ```

-   **数字分隔符**：`1_000_000`提高大数值可读性
    ```javascript
    const billion = 1_000_000_000; // 十亿
    const binary = 0b1010_0001_1000_0101;
    const hex = 0xff_ec_de_5e;
    console.log(billion); // 1000000000
    ```

## ES2020：空值处理与大整数的创新

-   **可选链操作符**：`?.`安全访问可能为 null 的属性

    ```javascript
    const user = {
        name: '张三',
        address: {
            city: '北京',
        },
    };

    // 以前的写法
    const zipCode = user && user.address && user.address.zipCode ? user.address.zipCode : '未知';

    // 现在的写法
    const zipCode = user?.address?.zipCode ?? '未知';
    console.log(zipCode); // "未知"
    ```

-   **空值合并操作符**：`??`处理 null 或 undefined 时的默认值

    ```javascript
    const foo = null;
    const bar = foo ?? '默认值';
    console.log(bar); // "默认值"

    // 与 || 不同，0和空字符串不会触发默认值
    console.log(0 ?? '默认值'); // 0
    console.log('' ?? '默认值'); // ""
    console.log(0 || '默认值'); // "默认值"
    ```

-   **`BigInt`**：处理超大整数

    ```javascript
    const max = Number.MAX_SAFE_INTEGER; // 9007199254740991
    console.log(max + 1 === max + 2); // true，精度丢失

    const bigInt = 9007199254740991n;
    console.log(bigInt + 1n === bigInt + 2n); // false，精确计算
    console.log(bigInt + 1n); // 9007199254740992n
    ```

-   **`Promise.allSettled()`**：等待所有 Promise 完成而不管成功失败

    ```javascript
    const promises = [fetch('/api/user').then(r => r.json()), fetch('/api/broken-endpoint').then(r => r.json())];

    Promise.allSettled(promises).then(results => {
        results.forEach(result => {
            if (result.status === 'fulfilled') {
                console.log('成功:', result.value);
            } else {
                console.log('失败:', result.reason);
            }
        });
    });
    ```

## ES2019：数组扁平化与字符串修剪的实用功能

-   **`Array.prototype.flat()`**：简化嵌套数组处理

    ```javascript
    const nestedArray = [1, 2, [3, 4, [5, 6]]];
    console.log(nestedArray.flat()); // [1, 2, 3, 4, [5, 6]]
    console.log(nestedArray.flat(2)); // [1, 2, 3, 4, 5, 6]
    ```

-   **`Array.prototype.flatMap()`**：映射并扁平化结果

    ```javascript
    const sentences = ['Hello world', 'JavaScript is awesome'];
    const words = sentences.flatMap(s => s.split(' '));
    console.log(words); // ["Hello", "world", "JavaScript", "is", "awesome"]
    ```

-   **`Object.fromEntries()`**：键值对数组转对象

    ```javascript
    const entries = [
        ['name', '张三'],
        ['age', 30],
    ];
    const person = Object.fromEntries(entries);
    console.log(person); // {name: "张三", age: 30}

    // 与 Object.entries() 配合使用
    const obj = { a: 1, b: 2, c: 3 };
    const filtered = Object.fromEntries(Object.entries(obj).filter(([key, value]) => value > 1));
    console.log(filtered); // {b: 2, c: 3}
    ```

-   **字符串修剪方法**：`trimStart()`与`trimEnd()`

    ```javascript
    const text = '   Hello World   ';
    console.log(text.trimStart()); // "Hello World   "
    console.log(text.trimEnd()); // "   Hello World"
    console.log(text.trim()); // "Hello World"
    ```

-   **可选的 catch 参数**：允许忽略异常对象

    ```javascript
    // 以前必须指定参数
    try {
        // 可能出错的代码
    } catch (error) {
        // 即使不使用error也必须声明
    }

    // 现在可以省略参数
    try {
        // 可能出错的代码
    } catch {
        // 不关心具体错误
    }
    ```

## 五年 JavaScript 进化总结

我们可以清晰地看到 ECMAScript 规范的几个明显趋势：

1. **实用性 API 增强**：从各种数组新方法、字符串处理函数到对象操作工具，都在解决实际开发痛点
2. **非破坏性操作**：新的数组方法如`toSorted()`、`toReversed()`体现出对函数式编程理念的支持
3. **语法糖优化**：可选链`?.`、空值合并`??`、逻辑赋值运算符大幅减少样板代码
4. **异步编程改进**：从`Promise.alSettled()`到顶层 await，异步处理越来越优雅
5. **类与面向对象增强**：私有字段的l正式支持填补了 JavaScript OOP 的重要空白
