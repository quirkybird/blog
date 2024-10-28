> 嗯，一个相对复杂的问题。

众所周知，js是一个单线程非阻塞的语言，我们需要使用一个两种模式来执行代码，分为同步模式（**Synchronous**）和异步模式（**Asynchronous**)，异步模式中又有任务队列，任务队列分为宏任务和微任务，事件轮询也就是管理和调度异步任务，宏任务一般是Node和浏览器发起，微任务来自JS本身。  

![代码执行机制](https://img-squad-prod.humandetail.com/inner/20220601rQeMejlR.png)  
来看看宏任务和微任务都有哪些？

| 宏任务(Macrotask) | 微任务(Microtask) |
| --- | --- |
| setTimeout | requestAnimationFrame（有争议） |
| setInterval | MutationObserver(浏览器环境) |
| MessageChannel | Promise.[then/catch/finally] |
| I/O, 事件队列 | process.nextTick(node环境) |
| setImmediate(node环境) | queueMicrotask |
| script（整个执行文件） |  |

简而言之，就是当JS代码执行时，每次都会去领取一个宏任务开始，同步任务最先执行完，接着就是本次宏任务下创建的微任务全部执行完，如果是微任务里面又创建了微任务，也会添加到，在下次宏任务开始时，没有任何任务。

直接上题： （以下题目来自于：[【前端体系】从一道面试题谈谈对EventLoop的理解](https://juejin.cn/post/6868849475008331783)）

```javascript
console.log('script start');

setTimeout(() => {
	console.log('北歌');
}, 1 * 2000);

Promise.resolve()
	.then(function() {
		console.log('promise1');
	}).then(function() {
		console.log('promise2');
	});


async function foo() {
	await bar()
	console.log('async1 end')
}
foo()

async function errorFunc () {
	try {
		await Promise.reject('error!!!')
	} catch(e) {
		console.log(e)
	}
	console.log('async1');
	return Promise.resolve('async1 success')
}
errorFunc().then(res => console.log(res))

function bar() {
	console.log('async2 end') 
}

console.log('script end');

```
输出结果：script start、asyn2 end、promise1、async1 end、error!!!、async1、promise2、async1 success、北歌
```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => {
    console.log('3');
  })
  new Promise((resolve) => {
    console.log('4');
    resolve();
  }).then(() => {
    console.log('5')
  })
})

Promise.reject().then(() => {
  console.log('13');
}, () => {
  console.log('12');
})

new Promise((resolve) => {
  console.log('7');
  resolve();
}).then(() => {
  console.log('8')
})

setTimeout(() => {
  console.log('9');
  Promise.resolve().then(() => {
    console.log('10');
  })
  new Promise((resolve) => {
    console.log('11');
    resolve();
  }).then(() => {
    console.log('12')
  })
})

```
输出结果：1、7、12、8、2、4、3、5、9、11、10、12
```javascript
new Promise((resolve, reject) => {
  console.log(1)
  resolve()
})
.then(() => { 
  console.log(2)
  new Promise((resolve, reject) => {
      console.log(3)
      setTimeout(() => { 
        reject();
      }, 3 * 1000);
      resolve()
  })
    .then(() => { 
      console.log(4)
      new Promise((resolve, reject) => {
          console.log(5)
          resolve();
      })
        .then(() => { 
          console.log(7)
        })
        .then(() => { 
          console.log(9)
        })
    })
    .then(() => { 
      console.log(8)
    })
})
.then(() => { 
  console.log(6)
})

```
输出结果：1、2、3、4、5、6、7、8、9

中间还有两道题，先不做了，直接上最复杂的
```javascript
async function async1() {
  console.log('async1 start');
  new Promise((resolve, reject) => {
    try {
      throw new Error('error1')
    } catch(e) {
      console.log(e);
    }
    setTimeout(() => { // 宏3
      resolve('promise4')
    }, 3 * 1000);
  })
    .then((res) => { // 微3-1
      console.log(res);
    }, err => {
      console.log(err);
    })
    .finally(res => { // 微3-2 // TODO注3
      console.log(res);
    })
  console.log(await async2()); // 微4-1  TODO-注1
  console.log('async1 end'); // 微4-2 // TODO-注2
}

function async2() {
  console.log('async2');
  return new Promise((resolve) => {
    setTimeout(() => { // 宏4
      resolve(2)
    }, 1 * 3000);
  })
}

console.log('script start');

setTimeout(() => { // 宏2
  console.log('setTimeout');
}, 0)

async1();

new Promise((resolve) => {
  console.log('promise1');
  resolve();
})
  .then(() => { // 微1-2
    console.log('promise2');
    return new Promise((resolve) => {
      resolve()
    })
      .then(() => { // 微1-3
        console.log('then 1-1')
      })
  })
  .then(() => { // 微1-4
    console.log('promise3');
  })


console.log('script end');

```
输出结果：script start、async1 start、error1、async2、promise1、script end、peomise2、then 1-1、promise3、settimeout、promise4、undefined、2、async1 end

结合这几个题的练习，对JS的事件轮询就差不多了，来挑战挑战
