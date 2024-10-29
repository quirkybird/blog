从[Mark Erikson（Redux维护者）](https://blog.isquaredsoftware.com/about/)一篇讨论npm包如何兼容CommonJS和ESM构建问题——[Blogged Answers: My Experience Modernizing Packages to ESM](https://blog.isquaredsoftware.com/2023/08/esm-modernization-lessons/)，发现在为了兼容ESM过程中他遇到了很多问题，ESM毕竟是新一代的模块化标准，包括JS本身在ES 2015（ES6）得到了支持，社区开源工具在支持两种流行模块化方式上必须下点功。包括文中提到过[CommonJS is hurting JavaScript](https://deno.com/blog/commonjs-is-hurting-javascript)和[CommonJS is not going away](https://bun.sh/blog/commonjs-is-not-going-away)，js两种运行时Deno和Bun在各自的Blog提出了对CommonJS的不同观点，比较有趣的是，发表时间均为「June 30, 2023」，不知道是商量好的还是即时的diss back，这些让开发技术工作变得不那么无趣，甚至还可以有争论。<br />那么，究竟他们有什么不同呢？<br />作为新的一代模块化标准规范，ES Modules必然解决了CommonJS无法解决的问题，或者性能更好，当然这是猜测。<br />回到最开始，我们是如何使用到JS文件的，使用`script`标签，将其导入到整个文档中，小demo或者单js文件似乎不会出现什么问题，一旦项目变大，不可能将几万行代码都写到一个js文件里面吧，所以会出现下面这些问题：

- js文件作用域都是顶层，这会造成变量污染
- js文件多，变得不好维护
- js文件依赖问题，稍微不注意顺序引入错，代码全报错

促使了模块化诞生的必然性，毕竟js不再是配角，甚至现在有node这样服务端的运行时，js成为了真正的主角，各种框架百花齐放，前端也不再是「鸡在键盘上啄几下都能搞定的岗位了」。<br />模块化解决了什么问题：

- **代码组织** 允许将代码分割成小的、可重用的组件，每个模块负责一个特定的功能。这有助于提高代码的可读性和维护性。
- **依赖管理** 使得依赖关系更加明确。每个模块可以声明它需要的依赖项，并且这些依赖项可以被自动管理和加载，避免了全局变量的污染和依赖混乱。
- **命名冲突** 通过作用域隔离减少了命名冲突的问题。每个模块的变量和函数都被封装在其自己的作用域中，避免了与其他模块中的同名变量或函数发生冲突。
- **代码重用** 促进了代码的重用。通过将通用功能封装成模块，可以在多个项目中复用这些模块，从而减少重复代码和开发时间。
- **测试** 使得测试变得更加容易。每个模块可以被独立地测试和验证，这有助于确保每个部分的功能正常，而不会影响到其他模块。
- **懒加载** 通过模块化，应用可以实现按需加载（lazy loading）模块，从而减少初始加载时间和提高应用的性能。模块只有在真正需要时才会被加载和执行。

接下来，CommonJS登场。<br />它的出现是JS服务端需要一种模块化标准，来让不同模块存在于不同的命名空间——[What Server Side JavaScript needs](https://www.blueskyonmars.com/2009/01/29/what-server-side-javascript-needs/)，CommonJS小组成立，开发Node，这个时候还没有什么前端框架，一切都刚刚开始。
同时，当时CommonJS是存在一些核心问题的：
> - 模块化加载是同步的
> - 难以进行tree-shaking
> - 不是浏览器原生的 意味着需要进行更多的构建步骤

2013年，CommonJS小组解散，同年，FaceBook发布正式版React[[视频资料](https://www.youtube.com/watch?v=GW0rj4sNH2w)]（我只是想说明框架时代来了）

期间也出现了不同的模块化实现标准<br />**AMD (Asynchronous Module Definition)**: AMD 是一种异步加载模块的标准，主要用于浏览器环境。RequireJS 是其常见的实现。
```tsx
// 定义模块
define(['dependency'], function(dependency) {
  return function() {
    // ...
  };
});

// 加载模块
require(['myModule'], function(myModule) {
  // 使用模块
});

```
**UMD (Universal Module Definition)**: UMD 旨在兼容 CommonJS、AMD 和浏览器全局变量，以便在不同的环境中使用。
```tsx
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.myModule = factory();
  }
}(this, function() {
  // 模块内容
  return function() {
    // ...
  };
}));

```
在我看起来他们太晦涩了，而且有点冗余，作为2020年后才学习web开发的学习者，我甚至没见到过他们的身影，所以也不想过多讨论它们，其实也有npm相关模块化方式的统计：<br /><blockquote class="twitter-tweet"><p lang="en" dir="ltr">The latest about ESM on npm: ESM is now at 9%, dual at 3.8, faux ESM at 13.7%, and CJS at 73.6%.<br><br>This data includes only the most popular npm packages (1m+ downloads per week and/or 500+ others depend on it), excluding the TypeScript `types/*` packages. <a href="https://t.co/kdZg5tM9N6">pic.twitter.com/kdZg5tM9N6</a></p>&mdash; Titus 🇵🇸 (@wooorm) <a href="https://twitter.com/wooorm/status/1588905279206621184?ref_src=twsrc%5Etfw">November 5, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

回到正题，讨论下相对古老的CommonJS和新兴实力派ES Modules，顺便提一句，以后像是直接都支持ES Modules直接运行，无需打包构建就太好了（嗯……，Vite开发模式不就是如此吗？）
### Common JS
模块导出和导入：

1. 导出：使用 `module.exports` 或 `exports` 来导出模块。
```javascript
// 导出模块
module.exports = function() {
  // ...
};
```

2. 导入：使用 `exports` 语句来导入模块。
```javascript
// 导入模块
const myModule = require('./myModule');
```

### ES Modules

1. 命名导出 (Named Exports)

命名导出允许你导出多个变量、函数或类。你可以在声明时使用 `export` 关键字，或者在文件末尾集中导出。
```javascript
// 在声明时导出
export const name = 'Alice';
export function greet() {
  console.log('Hello, ' + name);
}

// 在文件末尾集中导出
const age = 30;
function sayAge() {
  console.log(`Age: ${age}`);
}
export { age, sayAge };
```

2. 默认导出 (Default Export)

默认导出允许你导出一个默认的模块内容。每个模块只能有一个默认导出。
```javascript
// 默认导出一个函数
export default function() {
  console.log('This is the default export.');
}

// 或者导出一个对象
export default {
  name: 'Alice',
  age: 30
};
```
#### **导入 (Import)**
ES Modules 提供了灵活的导入语法，允许你根据需要选择性地导入模块内容。

1. 导入命名导出 (Import Named Exports)

你可以使用大括号 `{}` 来导入命名导出。
```javascript
import { name, greet } from './myModule.js';

console.log(name); // 输出: Alice
greet(); // 输出: Hello, Alice
```

2. 导入默认导出 (Import Default Export)

默认导出不需要大括号，可以直接导入。
```
import myDefault from './myModule.js';

myDefault(); // 如果默认导出是一个函数
```

3. 同时导入命名导出和默认导出

你可以同时导入命名导出和默认导出。
```javascript
import myDefault, { name, greet } from './myModule.js';

myDefault(); // 默认导出
console.log(name); // 命名导出
greet(); // 命名导出
```

4. 导入所有导出 (Import All Exports)

使用星号 `*` 来导入模块中的所有导出，并将它们绑定到一个对象上。
```javascript
import * as myModule from './myModule.js';

console.log(myModule.name); // 输出: Alice
myModule.greet(); // 输出: Hello, Alice
```

上面是他们的语法差异，其实它们更大的差异在于

| 特性 | Common JS | ES Modules |
| --- | --- | --- |
| **加载方式** | 同步加载 | 异步加载 |
| **静态分析** | 不支持静态分析 | 支持静态分析 |
| **导入方式** | 拷贝导入 | 引用导入 |

特别说明：ES2020已支持通过[import()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)动态执行代码，他和import静态导入不是一回事，即使不在type="module"对浏览器环境中仍然可以使用。
### ES Modules构建过程
ES Modules的工作方式图解—— [ES modules: A cartoon deep-dive](https://hacks1.wpenginepowered.com/2018/03/es-modules-a-cartoon-deep-dive/)，转译文章[链接](https://everfind.github.io/posts/2021/08/05/deep-dive-into-es-module.html#es-%E6%A8%A1%E5%9D%97%E8%A7%A3%E5%86%B3%E4%BA%86%E4%BB%80%E4%B9%88%E9%97%AE%E9%A2%98)
#### 1. 模块解析（Module Resolution）
在这个阶段，JavaScript 引擎会根据导入语句解析模块的路径。路径解析可能涉及以下几步：

- **相对路径**：如果模块使用相对路径导入，例如 `import './module.js'`，引擎会从当前模块的目录开始查找目标模块。
- **绝对路径**：如果模块使用绝对路径导入，例如 `import '/module.js'`，引擎会从根目录开始查找目标模块。
- **包管理**：对于不带路径前缀的导入，例如 `import 'module'`，引擎会根据环境（如 Node.js 或浏览器）查找包管理器提供的模块。
#### 2. 依赖图构建（Dependency Graph Construction）
在解析模块路径后，引擎会构建一个模块依赖图。这是一个有向图，其中每个节点代表一个模块，边表示模块之间的依赖关系。引擎会递归地解析所有依赖，确保所有模块都被正确解析。
```javascript
// 例如，主模块导入两个子模块，子模块各自有自己的依赖
import { foo } from './moduleA.js';
import { bar } from './moduleB.js';
```
#### 3. 模块加载（Module Loading）
模块解析后，JavaScript 引擎会加载模块内容。这通常涉及从文件系统或网络请求中读取模块代码。
#### 4. 模块解析和验证（Parsing and Validation）
加载的模块代码会被解析为抽象语法树（AST），同时进行语法检查和验证。如果模块代码包含语法错误或不符合模块规范，会在此阶段抛出错误。
```javascript
// 解析模块代码为 AST
const ast = parseModuleCode(moduleCode);
```
#### 5. 模块实例化（Module Instantiation）
在模块实例化阶段，引擎会为每个模块创建一个模块记录（Module Record）。模块记录包含模块的元数据，包括导入和导出内容、模块状态等。此阶段不会实际执行模块代码，但会解析导入和导出声明。
```javascript
// 创建模块记录
const moduleRecord = {
  exports: {},
  state: 'instantiated',
  // 其他元数据
};
```
#### 6. 模块链接（Module Linking）
模块实例化后，引擎会进行模块链接。链接阶段会解析和连接所有模块的导入和导出内容，确保每个模块的依赖关系都能正确解析。此阶段会处理模块的循环依赖。
```javascript
// 链接模块
linkModules(moduleGraph);
```
#### 7. 模块执行（Module Execution）
最后一个阶段是模块执行。在此阶段，模块代码会被实际执行，并将导出的内容赋值到模块记录中。由于 ES Modules 的执行是惰性的，只有在模块第一次被访问时才会执行其代码。
```javascript
// 执行模块代码
executeModuleCode(moduleRecord);
```
#### 8. 缓存（Caching）
为提高性能，已经加载和执行的模块会被缓存。下次请求相同模块时，会直接从缓存中读取，而不是重新加载和执行。
```javascript
// 从缓存中读取模块
const cachedModule = getCachedModule(modulePath);
```

### 静态分析带来了什么?
#### 更好的工具支持和优化
静态分析允许工具（如构建工具、代码编辑器、IDE）在编译时准确地了解模块的依赖关系和结构，从而进行更有效的优化和代码检查。

- **树摇 (Tree Shaking)**：编译器可以在构建过程中自动移除未使用的代码。这减少了最终打包文件的大小，从而提升应用的性能。
```javascript
// 假设只使用了 foo 而没有使用 bar
export function foo() { /* ... */ }
export function bar() { /* ... */ }

// Tree Shaking 会移除未使用的 bar 函数
```

- **代码拆分 (Code Splitting)**：构建工具可以根据静态分析结果将代码拆分成多个较小的块，以便按需加载，减少初始加载时间，提高应用性能。
```javascript
// 根据路由或特定条件异步加载模块
import('./someModule').then(module => {
  module.someFunction();
});
```
#### 静态类型检查
静态分析提供的模块结构和依赖关系信息可以帮助工具进行更准确的类型检查和代码验证，提升代码质量和可靠性。

- **静态类型检查**：工具可以在编写代码时立即检测出模块导入/导出的类型错误，避免运行时错误。
```javascript
// 假设 someFunction 接受一个字符串参数
import { someFunction } from './module';
someFunction(123); // 编译时会报错，因为参数类型不匹配
```
#### 更快的编译和打包
由于 ES Modules 的静态结构，构建工具可以更高效地解析和处理模块依赖关系，减少编译和打包的时间。

- **快速解析依赖关系**：构建工具可以在不执行代码的情况下快速解析所有模块的依赖关系，从而更快地完成打包任务。
```javascript
import { foo } from './moduleA';
import { bar } from './moduleB';
// 构建工具可以立即解析这些依赖关系，而无需执行模块代码
```
#### 增强的代码可读性和维护性
静态分析使代码依赖关系更加明确，增强了代码的可读性和可维护性。

- **明确的依赖关系**：开发者可以通过 `import` 和 `export` 语句清晰地了解模块的依赖关系和导出内容，便于理解和维护代码。
```javascript
// 导入特定的函数
import { foo } from './utils';

// 导出模块的公共 API
export { foo, bar } from './utils';
```

写完这篇后，我发现一个很系统全面写javascript模块化历史的文章[《编程时间简史系列》JavaScript 模块化的历史进程](https://segmentfault.com/a/1190000023017398)<br />PS. 文章部分内容由AI生成

> [https://segmentfault.com/q/1010000044201309](https://segmentfault.com/q/1010000044201309).  
> [https://bun.sh/blog/commonjs-is-not-going-away](https://bun.sh/blog/commonjs-is-not-going-away).   
> [https://deno.com/blog/commonjs-is-hurting-javascript](https://deno.com/blog/commonjs-is-hurting-javascript).   


