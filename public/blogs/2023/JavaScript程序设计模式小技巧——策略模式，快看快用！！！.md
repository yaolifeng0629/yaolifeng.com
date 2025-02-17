<<<<<<< HEAD:WritingPlan/PublishedArticle/面试官：策略模式有使用过吗？我：没有.......md
## 面试官：策略模式有使用过吗？我：没有......
=======
## 前言
>   系列首发于公众号[『沉浸式趣谈』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) ，若不想错过更多精彩内容，请“星标”一下，敬请关注公众号最新消息。
## JavaScript程序设计模式小技巧——策略模式，快看快用！！！
>>>>>>> d01511f06d20186737a35f54508e8dd2e2752882:WritingPlan/PublishedArticle/JavaScript程序设计模式小技巧——策略模式，快看快用！！！.md

### 何为策略模式？
-   比如在业务逻辑或程序设计中比如要实现某个功能，有多种方案可供我们选择。比如要压缩一个文件，我们既可以选择 ZIP 算法，也可以选择 GZIP 算法。
-   这些算法灵活多样，可随意切换，而这种解决方案就是我们所要学习的策略模式。

### 定义或概念
-   `策略模式：定义一系列的算法，将他们一个个封装，并使他们可相互替换。`

### 策略模式的最佳实践
#### 例子1：奖金计算
-   题目：在很多公司的年终奖都是按照员工的工资基数和年底绩效情况来发放的，例如，绩效为 S 的人年终奖有 4 倍工资，A 的人年终奖有 3 倍，B 的人年终奖有 2 倍。要求我们写出一个程序来更快的计算员工的年终奖。(编写一个名为 calcBonus 方法来计算每个员工的奖金数额)
-   可能有些人一上来直接就在一个方法中进行很多 if...else 或 switch...case 判断, 然后通过这个方法进行计算。我们可以来试着写一下：
```js
/**
 *
 * @param {*} level 绩效等级
 * @param {*} salary 工资基数
 * @returns 年终奖金额
 */
var calcBonus = function (level, salary) {
    if (level === "S") {
        return salary * 4;
    } else if (level === "A") {
        return salary * 3;
    } else if (level === "B") {
        return salary * 2;
    }
};

calcBonus('A', 20000); // 60000
calcBonus('B', 8000); // 16000
```
-   我想在我们每个人初学代码时肯定都写出过这样的代码。其实这段代码有显而易见的缺点：
    1.  calcBonus `函数逻辑太多`
    2.  calcBonus 函数`缺乏弹性`，比如如果我们需要增加一个等级 C，那就必须要去修改 calcBonus 函数。这就违反了`开放-封闭原则`。
    3.  `复用性差`。如果后续还要重用这个程序去计算奖金，我们只有去 C,V。
-   此时，可能会想对 calcBonus 函数进行封装，如我们使用组合函数的形式，如下：
```js
var totalS = function (salary) {
    return salary * 4;
};
var totalA = function (salary) {
    return salary * 3;
};
var totalB = function (salary) {
    return salary * 2;
};

var calcBonus = function (level, salary) {
    if (level === "S") {
        return totalS(salary);
    } else if (level === "A") {
        return totalA(salary);
    } else if (level === "B") {
        return totalB(salary);
    }
};

calcBonus('A', 20000); // 60000
calcBonus('B', 8000); // 16000
```
-   这样，我们将程序进行了进一步改善，但改善微乎其微，依旧没有解决最重要的问题，calcBonus 函数还是有可能会很庞大，并且也没有弹性。
-   那我们再将它进行一次改造，使用策略模式：`将其定义为一系列的算法，将他们每一个封装起来，将不变的部分和变化的部分隔开。`
-   在这段程序中，`算法的使用方式是不变的，都是根据某个算法获取最后的奖金金额。而在每个算法的内部实现却是不同的，每一个等级对应着不同的计算规则`。
-   而`在策略模式程序中：最少由两部分组成，一部分是一组策略类，在策略类中封装了具体的算法，并负责具体的计算过程。一部分是环境类 context，接受用户的请求，并将请求委托给某一个策略类。`
-   如下：
```js
var strategies = {
    S: function (salary) {
        return salary * 4;
    },
    A: function (salary) {
        return salary * 3;
    },
    B: function (salary) {
        return salary * 2;
    },
};

var calcBonus = function (level, salary) {
    return strategies[level](salary);
}

calcBonus('A', 20000); // 60000
calcBonus('B', 8000); // 16000
```
-   其实，`策略模式的实现并不复杂，关键是如何从策略模式的实现背后，找到封装变化，委托和多态性这些思想的价值`。

#### 例子2：表单验证
-   题目：在 Web 开发中，表单校验是一个常见的话题，要求使用策略模式来完成表单验证。
-   比如:
    1.  用户名不能为空
    2.  密码长度不能少于 6 位
    3.  手机号码必须符合正确格式
-   让我们来实现一下吧：
```js
function submit() {
    let { username, password, tel } = infoForm;
    if (username === "") {
        Toast("用户名不能为空");
        return false;
    }
    if (password.length < 6) {
        Toast("密码不能少于 6 位");
        return false;
    }
    if (!/(^1[3|5|8][0-9]{9}$)/.test(tel)) {
        Toast("手机号码格式不正确");
        return false;
    }

    // .....
}
```
-   这是我们常见的实现方式，它的缺点跟计算奖金一例类似：
    1.  submit 函数庞大，包含了很多 if...else 语句
    2.  submit 函数缺乏弹性，如果对其新加一些新的校验规则，如果我们把密码长度从 6 改到 8.那我们就必须要改动 submit 函数，否则无法实现该校验。这也是违反开放-封闭原则。
    3.  复用差，如果说我们程序中还有另一个表达需要验证，也是进行类似的校验，那我们可能会进行 C, V 操作。
-   使用策略模式来进行重构
```js
let infoForm = {
    username: "我是某某某",
    password: 'zxcvbnm',
    tel: 16826384655,
};

var strategies = {
    isEmpty: function (val, msg) {
        if (!val) return msg;
    },
    minLength: function (val, length, msg) {
        if (val.length < length) return msg;
    },
    isTel: function (val, msg) {
        if (!/(^1[3|5|8][0-9]{9}$)/.test(val)) return msg;
    },
};

var validFn = function () {
    var validator = new Validator();

    let { username, password, tel } = infoForm;

    validator.add(username, "isEmpty", "用户名不能为空");
    validator.add(password, "minLength:6", "密码不能少于 6 位");
    validator.add(tel, "isTel", "手机号码格式不正确");

    var msg = validator.start();
    return msg;
};

class Validator {
    constructor() {
        this.cache = [];
    }
    add(attr, rule, msg) {
        var ruleArr = rule.split(":");
        this.cache.push(function () {
            var strategy = ruleArr.shift();
            ruleArr.unshift(attr);
            ruleArr.push(msg);
            return strategies[strategy].apply(attr, ruleArr);
        });
    }

    start() {
        for (let i = 0; i < this.cache.length; i++) {
            var msg = this.cache[i]();
            if (msg) return msg;
        }
    }
}

function submit() {
    let msg = validFn();
    if (msg) {
        Toast(msg);
        return false;
    }
    console.log('verify success');

    // .....
}

submit();
```
-   使用策略模式重构后，我们后续仅需配置的方式来完成。
-   扩展题目：那如果想给用户名还想再添加一个规则，那如何完成呢？
-   添加规则方式如下：
```js
validator.add(username, [
    {
        strategy: "isEmpty",
        msg: "用户名不能为空"
    },
    {
        strategy: 'minLength:6',
        msg: '密码不能少于 6 位'
    }
]);
```
-   实现:
```js
let infoForm = {
    username: "阿斯顿发生的",
    password: "ss1sdf",
    tel: 15829485647,
};

var strategies = {
    isEmpty: function (val, msg) {
        if (!val) return msg;
    },
    minLength: function (val, length, msg) {
        if (val.length < length) return msg;
    },
    isTel: function (val, msg) {
        if (!/(^1[3|5|8][0-9]{9}$)/.test(val)) return msg;
    },
};

var validFn = function () {
    var validator = new Validator();

    let { username, password, tel } = infoForm;

    validator.add(username, [
        {
            strategy: "isEmpty",
            msg: "用户名不能为空",
        },
        {
            strategy: "minLength:6",
            msg: "密码不能少于 6 位",
        },
    ]);
    validator.add(password, [
        {
            strategy: "minLength:6",
            msg: "密码不能少于 6 位",
        },
    ]);
    validator.add(tel, [
        {
            strategy: "isTel",
            msg: "手机号码格式不正确",
        },
    ]);

    var msg = validator.start();
    return msg;
};

class Validator {
    constructor() {
        this.cache = [];
    }
    add(attr, rules) {
        for (let i = 0; i < rules.length; i++) {
            var rule = rules[i];
            var ruleArr = rule.strategy.split(":");
            var msg = rule.msg;
            var cacheItem = this.createCacheItem(ruleArr, attr, msg);
            this.cache.push(cacheItem);
        }
    }

    start() {
        for (let i = 0; i < this.cache.length; i++) {
            var msg = this.cache[i]();
            if (msg) return msg;
        }
    }

    createCacheItem(ruleArr, attr, msg) {
        return function () {
            var strategy = ruleArr.shift();
            ruleArr.unshift(attr);
            ruleArr.push(msg);
            return strategies[strategy].apply(attr, ruleArr);
        };
    }
}

function submit() {
    let msg = validFn();
    if (msg) {
        Toast(msg);
        return false;
    }
    console.log("verify success");

    // .....
}

submit();
```

### 策略模式的优缺点
-   优点：
    1.  利用组合，委托，多态等技术有效避免了多重条件语句
    2.  提供了对开封-封闭原则的完美支持
    3.  复用性较强，避免许多重复的 C,V 工作
-   缺点：
    1.  客户端要先了解所有的策略类，才能选择合适的策略类。

### 策略模式的角色
1.  `Context(环境类)`：持有一个 Strategy 类的引用，用一个 ConcreteStrategy 对象来配置
2.  `Strategy(环境策略类)`：定义了所有支持的算法的公共接口，通常是以一个接口或抽象来实现。Context 使用这个接口来调用其 ConcreteStrategy 定义的算法。
3.  `ConcreteStrategy(具体策略类)`：以 Strategy 接口实现某种算法
-   比如以上的例子算法：
![Strategy_Pattern.png](https://s1.locimg.com/2023/07/16/e9a698551f352.png)

### 策略模式的应用场景
1.  想使用对象中各种不同算法变体来在运行时切换算法时
2.  拥有很多在执行某些行为时有着不同的规则时

<<<<<<< HEAD:WritingPlan/PublishedArticle/面试官：策略模式有使用过吗？我：没有.......md
#### Tip: 文章部分内容参考于`曾探`大佬的《JavaScript 设计模式与开发实践》。文章仅做个人学习总结
=======
#### Tip: 文章部分内容参考于`曾探`大佬的《JavaScript 设计模式与开发实践》。文章仅做个人学习总结和知识汇总

## 特殊字符描述：
1. 问题标注 `Q:(question)`
2. 答案标注 `R:(result)`
3. 注意事项标准：`A:(attention matters)`
4. 详情描述标注：`D:(detail info)`
5. 总结标注：`S:(summary)`
6. 分析标注：`Ana:(analysis)`
7. 提示标注：`T:(tips)`
## 往期推荐：
-   [this 之谜揭底：从浅入深理解 JavaScript 中的 this 关键字（一）](https://mp.weixin.qq.com/s/MWWd5xVNCccgVoBtSnbDzA)
-   [this 之谜揭底：从浅入深理解 JavaScript 中的 this 关键字（二）](https://mp.weixin.qq.com/s/7uGjOgaZVG3CgdF_ql9j8g)
-   [理论+实践：从原型链到继承模式，掌握 Object 的精髓(一)](https://mp.weixin.qq.com/s/bIRQLHOFJnhF10RCG-eSKg)
-   [理论+实践：从原型链到继承模式，掌握 Object 的精髓(二)](https://mp.weixin.qq.com/s/ZTfybLBAswv8xcYtDRIwzQ)
-   [JavaScript 实践+理论(总结篇)：作用域、闭包、this、对象原型](https://mp.weixin.qq.com/s/rrwqk5wDGMEi4Uae8uDdqg)
-   [箭头函数与普通函数的区别？](https://mp.weixin.qq.com/s/o-6DpwxL-k7dQsf5J8dA9w)
-   [这是你理解的CSS选择器权重吗？](https://mp.weixin.qq.com/s/6W3dcwcsBURGxYD9AeBeWA)
-   [JS 中 call, apply, bind 概念、用法、区别及实现？](https://mp.weixin.qq.com/s/v9eYEpwpzXazXm7pLTkDhw)
-   [常用位运算方法？](https://mp.weixin.qq.com/s/gn4sBeM6luE_b6jaAZOgyQ)
-   [Vue数据监听Object.definedProperty()方法的实现](https://mp.weixin.qq.com/s/1inW5dSZv26eJTC39REMdg)
-   [为什么 0.1+ 0.2 != 0.3，如何让其相等？](https://mp.weixin.qq.com/s/wsXtNGpNl6NrickR6_7ePw)
-   [聊聊对 this 的理解？](https://mp.weixin.qq.com/s/w_RV1AUwXsW2fSHCfxXD2A)
-   [JavaScript 为什么要进行变量提升，它导致了什么问题？](https://mp.weixin.qq.com/s/mBBUVF7mrPt4ik1f4dBPrQ)
## 最后：
-   欢迎关注 [『沉浸式趣谈』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) 公众号 ，一起探索学习前端技术......
-   公众号回复 [加群](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) 或 [扫码](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd), 即可加入前端交流学习群，一起快乐摸鱼和学习......
-   公众号回复 [加好友](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd)，即可添加为好友
![](https://soo.run/13bdt)
>>>>>>> d01511f06d20186737a35f54508e8dd2e2752882:WritingPlan/PublishedArticle/JavaScript程序设计模式小技巧——策略模式，快看快用！！！.md
