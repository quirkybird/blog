import Matter from "matter-js";
import { useEffect, useRef, useState } from "react";
import getRandomNumber from "../utils/random";

  // 全局变量
  // 物理引擎
  const Engine = Matter.Engine;
  // 渲染器
  // 自己实现渲染
  // 刚体
  const Bodies = Matter.Bodies;
  // 复合体
  const Composite = Matter.Composite;
  // 时间循环
  // const Runner = Matter.Runner; 使用requestAnimationFrame替代

  const messages = ["站长恭喜建站成功", "今天天气真不错", "感觉这个留言堆好有意思",
  "你是个垃圾我不再想和平", "我的生活我自己主宰", "我思故我在", "中华人民共和国万岁",
  "毛泽东万岁", "金风雨露一相逢","便胜却人间无数",]

const Discuss = () => {
  const discussRef = useRef(null);
  // 创建引擎
  const engine = Engine.create();
  // 不包含滚动条的视口宽度
  const viewWidth = window.innerWidth - 5
  // 视口高度（减去顶框）
  const viewHeight = window.innerHeight - 80
  // 气泡颜色
  const red = "#ea8777"
  const blue = "#97cce8"
  const pink = "#f4b9c2"
  const green = "#a6ec99"
  const purple = "#D4A3D9"
  const yellow = "#fcf0a4"
  const colors = [red, blue, pink, green, purple, yellow]

  // 渲染函数
  const render = (bubbles) => {
    bubbles.forEach((bubble, index) => {
    const element = bubble.text
    const body = bubble.body
    // 将刚体和dom元素关联起来(很重要)
    const {x, y} = body.position
    element.style.left = `${x - 100}px`
    element.style.top = `${y - 30}px`
    element.style.transform = `rotate(${body.angle}rad)` //rad弧度单位，matter使用弧度角度
  })

  }
  useEffect(() => {
    // 创建刚体元素
    // 矩形参数为x, y, w, h(x, y为元素中心点位置)
     const bubbles = messages.map((message, index) => {
        // 为每个刚体添加上文字
        const text = document.createElement("div")
        text.className = "bubble" 
        text.style.cssText = `background:${colors[getRandomNumber(0, 5)]};`
        text.innerHTML = message
        discussRef.current.appendChild(text)
        // 给出掉落位置随机数
        const randomPosition = getRandomNumber(1, 9)
        const body = Bodies.rectangle(viewWidth * randomPosition * 0.1, 60, 200, 60, {
          angle: Math.PI / 180 * getRandomNumber(-45, 45),
          // frictionAir: 0,
          // restitution: 0.5,
          // mass: 5,
          });          
          Composite.add(engine.world, body)
         return {text, body}
          })

    // // 圆形参数为x, y, r
    // const boxB = Bodies.circle(viewWidth / 2 - 50, 80, 80, {
    //   frictionAir:  0,
    //   restitution: 1,
    //   mass: 10
    // });


    // 创建一个堆
    // const stack = Matter.Composites.stack(viewWidth /2 - 30, 0, 5, 5, 2, 6, (x, y) => {
    //     return Matter.Bodies.rectangle(x, y, 100, 50, {
    //       angle: Math.PI / 180 * 30,
    //       restitution: 0.5,
    //       mass: 5,
          // chamfer: { radius: 10 },
          // render: {
          //   fillStyle: randomColor
          // }
    //     })
    // })

    // 创建地面
    const ground = Bodies.rectangle(viewWidth / 2, viewHeight, viewWidth, 30, { 
      isStatic: true }
    );
    // 创建天花板
    const ceiling = Bodies.rectangle(viewWidth / 2, 15, viewWidth, 30, { 
      isStatic: true }
    );
    // 创建左墙
    const leftWall = Bodies.rectangle(1, viewHeight / 2, 2, viewHeight, {
        isStatic: true,
        render: {
          fillStyle: "#FCFCFC"
        }
      }
    )
    // 创建右墙
    const rightWall = Bodies.rectangle(viewWidth - 1, viewHeight / 2, 2, viewHeight, {
      isStatic: true,
      render: {
        fillStyle: "#FCFCFC"
      }
    }
  )

    // 创建渲染器，并将渲染器挂载到画布上
    // const discuss = discussRef.current;
    // 创建渲染器
    // const render = Render.create({
    //   element: discuss,
    //   engine: engine,
    //   options: {
    //     width: viewWidth,
    //     height: viewHeight,
    //     wireframes: false, //关闭线框
    //     background: "#FCFCFC"
    //   },
    // });
    // 创建一个鼠标约束
    const mouseConstraint = Matter.MouseConstraint.create(engine,{
      element: discussRef.current,
      constraint: {
        stiffness: 0.2,
      }
    });

    // 元素形成一个复合体
    Composite.add(engine.world, [ceiling, ground, leftWall, rightWall, mouseConstraint]);

    // 使用新的渲染方法
    (function rerender() {
      render(bubbles)
      Matter.Engine.update(engine);
      requestAnimationFrame(rerender);
    })();
    // 执行渲染操作
    // Render.run(render);

    // 创建运行方法
    // const runner = Runner.create();

    // Runner.run(runner, engine);
    })

  return (
    <main className="min-h-[calc(100vh-80px)] relative">
      <Input discussRef={discussRef} engine={engine}/>
      <div ref={discussRef} className="w-full h-[calc(100vh-80px)] relative"></div>
    </main>
  )
}

export const Input = ({discussRef, engine}) => {
  const inputRef = useRef(null);
  // message
  const [message, setMessage] = useState("")
    // 处理留言信息
  const handleInput = () => {
    const input = inputRef.current
    setMessage(input.value)
  }
  useEffect(() => {
    const input = inputRef.current

    // 渲染函数
    const render = (body, element) => {
      // 将刚体和dom元素关联起来(很重要)
      const {x, y} = body.position
      element.style.left = `${x - 100}px`
      element.style.top = `${y - 30}px`
      element.style.transform = `rotate(${body.angle}rad)` //rad弧度单位，matter使用弧度角度
    }

    let newBody = null
    let newText = null
    const handleKeyDown = (e) => {
      if(e.code === "Enter") {
        newText = document.createElement("div")
        newText.innerHTML = message
        newText.className = "bubble" 
        newText.style.cssText = `background: #a8a29e;`
        discussRef.current.appendChild(newText)
        newBody = Bodies.rectangle(window.innerWidth / 2, 60, 200, 60, {
        angle: Math.PI / 180 * getRandomNumber(-45, 45)
       })
       Composite.add(engine.world, newBody)
       if(newBody) {
        (function rerender() {
          render(newBody, newText)
          requestAnimationFrame(rerender)
        })()
       }
      }
    }

    input.addEventListener("keydown", handleKeyDown)
    return () => {
      input.removeEventListener("keydown", handleKeyDown);
    }
  })

  return (
    <div className="border-2 border-dashed border-slate-400 mx-40">
      <input ref={inputRef} value={message} onChange={handleInput} type="text" className="outline-0 w-full" placeholder="/输入完按Enter留言" />
    </div>
  )
}

export default Discuss;
