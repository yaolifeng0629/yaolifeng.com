## 前言
>   系列首发于公众号[『沉浸式趣谈』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) ，若不想错过更多精彩内容，请“星标”一下，敬请关注公众号最新消息。

今天咱们来聊聊 VS Code 里的**自定义代码片段**。

这玩意儿简直是**提升编码效率的神器**, 用好了能让你敲代码更方便!

不管你是刚入行的菜鸟还是身经百战的老兵,这篇攻略都能让你在代码片段的世界里玩得飞起。

**系好安全带,我们开始起飞啦!**

## 代码片段是啥玩意儿?

简单说, **代码片段就是一些预先定义好的代码模板。你只需要敲几个字母,噌的一下,一大段代码就蹦出来了。**

比如说, 你可以把一个常用的函数结构设置成代码片段,下次需要的时候,只要输入一个简短的**触发词**,瞬间就能生成整个函数框架。

## 为啥要用这玩意儿?

1. **省时间**: 再也不用重复敲那些烦人的样板代码了。
2. **少出错**: 预先定义好的代码片段能避免一些低级错误。
3. **保持一致**: 团队可以共用一套代码片段,保证代码风格统一。
4. **提高效率**: 快速生成复杂的代码结构,让你专注于真正的逻辑实现。

## 怎么整一个自己的代码片段?

来, 跟我一步步来:

1. 打开 VS Code,按下 **`Ctrl+Shift+P`**(Mac 上是 **`Cmd+Shift+P`**)。
2. 输入 **"`snippets`"**,选择 **Preferences: Configure User Snippets**。
3. 选你要创建片段的语言,比如 **`JavaScript`** 。
4. VS Code 会打开一个 **`JSON`** 文件,这就是你的代码片段配置文件。

来看个例子:

```json
{
    "Console log": {
        "prefix": "clog",
        "body": ["console.log('$1');", "$2"],
        "description": "打印日志到控制台"
    }
}
```

这里的 **`"Console log"`** 是这个片段的名字,**`"prefix"`** 是触发词,**`"body"`** 是实际的代码内容,**`"description"`** 是描述。

## 进阶技巧

好了, **基础的东西我们搞定了**。

现在来点更进阶的吧!

### 1. 占位符和制表位

**占位符**是代码片段中最基本也是最强大的功能之一。它们不仅可以让你在插入片段后**快速跳转到特定位置**, 还能实现更多花样。

基本占位符:

-   **`$1`**, **`$2`**, **`$3`** 等:这些是最简单的占位符。插入片段后,光标会先停在 **`$1`** 的位置,按 **`Tab`** 键后跳到 **`$2`**,以此类推。
-   **`$0`**:这是最后一个制表位。无论你定义了多少个占位符,**`$0`** 永远是终点站。

来个例子:

```json
"Basic Function": {
  "prefix": "func",
  "body": [
    "function ${1:functionName}(${2:params}) {",
    "\t$0",
    "}"
  ],
  "description": "创建一个基本函数"
}
```

占位符中的默认值:
你可以在占位符中提供默认值,格式是 **`${1:defaultValue}`** 。

```json
"Console Log": {
  "prefix": "clog",
  "body": "console.log('${1:你好,世界!}');",
  "description": "打印日志,带默认值"
}
```

占位符中的选择项:
你还可以在占位符中提供多个选项,让用户选择。格式是 **`${1|option1,option2,option3|}`** 。

```json
"Variable Declaration": {
  "prefix": "vard",
  "body": "${1|const,let,var|} ${2:变量名} = ${3:值};",
  "description": "声明变量,可选择const/let/var"
}
```

### 2. 变量

**`VS Code`** 提供了不少内置变量,可以在代码片段中使用。这些变量会在插入片段时被实际值替换。

常用内置变量:

-   **`$TM_FILENAME`**: 当前文件的文件名
-   **`$TM_FILENAME_BASE`**: 当前文件的文件名(不含扩展名)
-   **`$TM_DIRECTORY`**: 当前文件所在的目录
-   **`$TM_FILEPATH`**: 当前文件的完整文件路径
-   **`$CLIPBOARD`**: 当前剪贴板中的内容
-   **`$WORKSPACE_NAME`**: 打开的工作区的名称

日期和时间变量:

-   **`$CURRENT_YEAR`**: 当前年份
-   **`$CURRENT_MONTH`**: 当前月份(两位数格式)
-   **`$CURRENT_DATE`**: 当前日期(两位数格式)
-   **`$CURRENT_HOUR`**: 当前小时(24 小时制)
-   **`$CURRENT_MINUTE`**: 当前分钟
-   **`$CURRENT_SECOND`**: 当前秒数

来个实用的例子:

```json
"File Header": {
  "prefix": "header",
  "body": [
    "/**",
    " * 文件名: $TM_FILENAME",
    " * 创建时间: $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE $CURRENT_HOUR:$CURRENT_MINUTE:$CURRENT_SECOND",
    " * 作者: ${1:$TM_USERNAME}",
    " * 描述: ${2:这里写文件描述}",
    " */"
  ],
  "description": "插入文件头注释"
}
```

-   使用结果：

```js
/**
 * 文件名: app.js
 * 创建时间: 2023-08-29 15:30:00
 * 作者: YourUsername
 * 描述: 这里写文件描述
 */
```

### 3. 转换

你还可以对变量和占位符的值进行各种花式操作。这些转换可以改变文本的大小写、格式等。

案例转换:

-   **`${VAR/(.*)/${1:/upcase}}`**:转换为大写
-   **`${VAR/(.*)/${1:/downcase}}`**:转换为小写
-   **`${VAR/(.*)/${1:/pascalcase}}`**:转换为帕斯卡命名法(`PascalCase`)
-   **`${VAR/(.*)/${1:/camelcase}}`**:转换为驼峰命名法(`camelCase`)

来个实用的例子:

```json
"React Component": {
  "prefix": "rcomp",
  "body": [
    "import React from 'react';",
    "",
    "const ${TM_FILENAME_BASE/(.*)/${1:/pascalcase}/} = () => {",
    "\treturn (",
    "\t\t<div>",
    "\t\t\t$0",
    "\t\t</div>",
    "\t);",
    "};",
    "",
    "export default ${TM_FILENAME_BASE/(.*)/${1:/pascalcase}/};"
  ],
  "description": "创建 React 组件,自动使用文件名作为组件名"
}
```

-   使用结果：

```js
import React from 'react';

const App = () => {
    return <div>$0</div>;
};

export default App;
```

这个例子会自动把文件名转换为 `PascalCase`,完美符合 `React` 组件命名规范。

### 4. 嵌套占位符

你可以在一个占位符内部再塞一个占位符,这就是嵌套占位符。这招能让你创建更复杂的交互式代码片段。

来个例子:

```json
"Conditional Statement": {
  "prefix": "ifelse",
  "body": [
    "if (${1:条件}) {",
    "\t${2:// 条件成立时的代码}",
    "} else {",
    "\t${2/^(.*)$/$1/}",
    "}"
  ],
  "description": "创建 if-else 语句,自动复制 if 块的注释到 else 块"
}
```

-   使用结果：

```js
if (条件) {
    // 条件成立时的代码
} else {
    // 条件成立时的代码
}
```

这个例子中,无论你在第二个占位符中输入什么,都会被自动复制到 else 块中。挺智能的,是吧?

## 实用的代码片段例子

**光说不练假把式**，来看看实际应用吧!


1. **`React Hooks`** 组件:

```json
"React Hooks Component": {
  "prefix": "rhc",
  "body": [
    "import React, { useState, useEffect } from 'react';",
    "",
    "const ${1:ComponentName} = () => {",
    "\tconst [${2:state}, set${2/(.*)/${1:/capitalize}/}] = useState(${3:initialState});",
    "",
    "\tuseEffect(() => {",
    "\t\t$0",
    "\t}, []);",
    "",
    "\treturn (",
    "\t\t<div>",
    "\t\t\t{${2:state}}",
    "\t\t</div>",
    "\t);",
    "};",
    "",
    "export default ${1:ComponentName};"
  ],
  "description": "创建一个带有 useState 和 useEffect 的 React 组件"
}
```

-   使用结果

```jsx
import React, { useState, useEffect } from 'react';

const ComponentName = () => {
    const [state, setState] = useState(initialState);

    useEffect(() => {}, []);

    return <div>{state}</div>;
};

export default ComponentName;
```

2. `异步函数`:

```json
"Async Function": {
  "prefix": "afn",
  "body": [
    "async function ${1:functionName}(${2:params}) {",
    "\ttry {",
    "\t\tconst result = await ${3:asyncOperation};",
    "\t\treturn result;",
    "\t} catch (error) {",
    "\t\tconsole.error('Error in ${1:functionName}:', error);",
    "\t\tthrow error;",
    "\t}",
    "}"
  ],
  "description": "创建一个带有错误处理的异步函数"
}
```

## 小贴士

1. **起个好名字**: 给你的代码片段起个好记的名字和前缀。比如我喜欢用 "rcomp" 表示 React 组件。

2. **经常更新**: 你的编码习惯在变,记得更新你的代码片段。定期 review 一下自己代码片段库。

3. **别贪多**: 代码片段是好东西,但也别啥都做成片段。只为那些真正重复的、复杂的代码创建片段。

4. 向大佬学习: **`GitHub`** 上有不少大佬分享他们的代码片段,可以去偷师学艺。有时候你会发现一些超赞的创意!

5. **版本控制**: 把你的代码片段文件加入版本控制。我就把我的片段放在一个 Git 仓库里,这样换电脑时也不怕丢失。

6. **定期清理**: 时不时清理一下你的代码片段。删掉那些你不再用的,更新那些需要改进的。保持你的片段库整洁有序。

## 总结

记住, 代码片段的强大之处在于它能让你的编码**更快、更准、更一致。**

但是,就像**所有的工具一样,关键在于怎么用**。

**别怕尝试和实验,找到最适合你的方式**。

随着你越来越熟悉代码片段,你会发现自己的生产力显著提高。

**你会有更多的时间和精力专注于解决真正的问题,而不是被繁琐的细节所困扰。**

**别忘了分享是进步的阶梯**。

如果你创建了一些超赞的代码片段,不妨和你的同事或者更大的开发者社区分享。

好了, **vscode** 代码片段武林秘籍已经传授完毕,现在就看你自己的了。

记住, **实践出真知。**

祝你 **`Coding`** 愉快, 生产力飞起!✨🚀

感谢阅读，我们下次再见！

![](https://qncdn.mopic.mozigu.net/f/o0enm5lqh2rbsqbopel/126660174a84/Snipaste_2023-09-08_10-32-47.png)

