![React](https://i.imgur.com/gk2rI9R.png)
> 本文参考React官方文档:[使用 Reducer 和 Context 拓展你的应用](https://react.docschina.org/learn/scaling-up-with-reducer-and-context)，区别于useState，更好的管理复杂的状态

主要就是利用`useContext`可以沿着组件向下传值，且无需考虑层级，和`useReducer`中Reducer用于管理状态
## 第一步：创建Context
```js
import { createContext } from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
```
## 第二步：将state和dispatch函数放入context
```js
import { TasksContext, TasksDispatchContext } from './TasksContext.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  // ...
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        ...
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
```
## 第三步：在组件树中的任何地方使用 context
现在你不需要任何沿着组件树一层层传递状态和修改状态逻辑，只需要使用state和dispatch，一切变得简单起来  

```js
export default function TaskList() {
  const tasks = useContext(TasksContext);
  // ...
```

```js
export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useContext(TasksDispatchContext);
  // ...
  return (
    // ...
    <button onClick={() => {
      setText('');
      dispatch({
        type: 'added',
        id: nextId++,
        text: text,
      });
    }}>Add</button>
    // ...
```
## 第四步：让我们把所有东西放到一个文件（非必须，但我推荐这样做）
此时，我们已经完成了随传随用随改变，不过我们的state仍然在最顶层组件`TaskApp`提供，我们试着将整个状态逻辑抽离出去，单独一个文件管理这些状态，显然这是我们想要的，代码模块更加独立
我们连接所有，让那个文件具有这些功能：  
1. 它将管理 reducer 的状态。  
2. 它将提供现有的 context 给组件树。  
3. 它将 把 children 作为 prop，所以你可以传递 JSX。  

```js
import { createContext } from 'react';
//此处可以导入Reducer，初始状态值

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
//封装组件
export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
```
现在我们一个文件来提供这所有关于状态的一切，使用时不用担心数据混乱，逻辑疯狂抽离让我们代码更好管理维护，让组件的作用更加明确单一，是一个好代码的标准之一，平时写代码要注意它们。

> 文档细节参考(useContext,useReducer)：  
> - [迁移状态逻辑至 Reducer 中](https://react.docschina.org/learn/extracting-state-logic-into-a-reducer)  
> - [使用 Context 深层传递参数](https://react.docschina.org/learn/passing-data-deeply-with-context)