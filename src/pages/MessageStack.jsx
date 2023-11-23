import Matter from "matter-js";
import { useEffect, useRef, useState } from "react";
import getRandomNumber from "../utils/random";
import getStaticImg from "../utils/getStaticImg";
import {Alert} from "antd"
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

  const messages = ["站长恭喜建站成功", "今天天气真不错", "感觉这个留言堆好有意思",
  "你是个垃圾我不再想和平", "我的生活我自己主宰", "我思故我在", "你这个留言堆就像是垃圾堆",
  "那年好像在哪里见过你", "金风雨露一相逢","便胜却人间无数",]

  // 创建气泡留言
  const createBubbleMessage = (element, message) => {
    const tips = "成功添加留言，欢迎经常来玩儿"
    // 为每个刚体添加上文字
    const text = document.createElement("div")
    text.className = "bubble" 
    const randomColor = colors[getRandomNumber(0, 5)]
    text.style.cssText = `background:${randomColor};`
    text.innerHTML = message
    element.appendChild(text)
    // 设置css变量
    text.style.setProperty("--before-color", randomColor)
    // 给出掉落位置随机数
    const randomPosition = getRandomNumber(1, 9)
    const body = Bodies.rectangle(viewWidth * randomPosition * 0.1, 60, 200, 60, {
      angle: Math.PI / 180 * getRandomNumber(-45, 45),
      frictionAir: 0,
      restitution: 0.2,
      mass: 10,
      });       
    return { body, text, tips }
  }

  // 创建图片留言 
  const createImgMessage = async (element, url) => {
    const {img, tips} = await getStaticImg(url, element)
    if(!img.src) return {body: null, img: null, tips: tips}
    return new Promise((resolve) => {
      img.onload = () => {
        // 设置图片消息的css属性
        img.addEventListener('dragstart', function(event) {
          event.preventDefault();
        });
        img.style.position = "absolute"
        // 限制最大图片尺寸
        if(img.width >= 100) {
          img.width = 100
        }
        const randomPosition = getRandomNumber(1, 9)
        const body = Bodies.rectangle(viewWidth * randomPosition * 0.1, 60, img.width, img.height, {
          angle: Math.PI / 180 * getRandomNumber(-45, 45),
          frictionAir: 0,
          restitution: 0.2,
          mass: 10,
          });  
        resolve({body, img, tips})
      }
    })
 }
const Discuss = () => {
  const discussRef = useRef(null);
  // 创建引擎
  const engine = Engine.create();

  // 渲染函数
  const render = (bubbles) => {
    bubbles.forEach((bubble, index) => {
    const element = bubble.text
    const body = bubble.body
    // 将刚体和dom元素关联起来(很重要)
    const {x, y} = body.position
    element.style.left = `${x - element.offsetWidth/2}px`
    element.style.top = `${y - element.offsetHeight/2}px`
    element.style.transform = `rotate(${body.angle}rad)` //rad弧度单位，matter使用弧度角度
  })

  }
  useEffect(() => {
    // 创建刚体元素
    // 矩形参数为x, y, w, h(x, y为元素中心点位置)
     const bubbles = messages.map((message, index) => {
        const {text, body} = createBubbleMessage(discussRef.current, message)
        Composite.add(engine.world, body)
        return {text, body}
          })

    // 创建地面
    const ground = Bodies.rectangle(viewWidth / 2, viewHeight, viewWidth, 30, { 
      isStatic: true }
    );
    // 创建天花板
    const ceiling = Bodies.rectangle(viewWidth / 2, 5, viewWidth, 10, { 
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
    })

  return (
    <main className="min-h-[calc(100vh-80px)] relative">
      <Input discussRef={discussRef} engine={engine} />
      <div ref={discussRef} className="w-full h-[calc(100vh-80px)] relative"></div>
    </main>
  )
}

export const Input = ({discussRef, engine}) => {
  // 是否成功留言
  const [isSuccess, setIsSuccess] = useState(null)
  // 提示信息
  let [messageTips, setMessageTips] = useState("")
  const inputRef = useRef(null);
  const [isShow, setIsShow] = useState("none")
  // message
  const [message, setMessage] = useState("")
    // 处理留言信息
  const handleInput = () => {
    const input = inputRef.current
    setMessage(input.value)
  }

  // 渲染函数
  const render = (body, element) => {
    // 将刚体和dom元素关联起来(很重要)
    const {x, y} = body.position
    element.style.left = `${x - element.offsetWidth / 2}px`
    element.style.top = `${y - element.offsetHeight / 2}px`
    element.style.transform = `rotate(${body.angle}rad)` //rad弧度单位，matter使用弧度角度
  }

  useEffect(() => {
    const input = inputRef.current

    const handleKeyDown = async (e) => {
      let isLeaveMessage = true
      if(e.code === "Enter") {
        // 使用cookie判断是否有权限留言
        const cookiesArray = document.cookie.split(";")
        cookiesArray.forEach((cookie, index) => {
          cookie = cookie.trim().split("=");
          if(cookie[0] === "permission") {
            isLeaveMessage = false
            window.alert("今天不能再留言了哦,一天留言一次")
          }
        })
        if(isLeaveMessage) {
        // 重置一下是否留言成功的值
        setIsSuccess(null)
        //设置一个cookie，用于记录被输入 
        document.cookie = "permission=true; max-age=5"
        let newBody = null
        let newText = null
        let newTips = null
        if(message.includes("https://") || message.includes("http://")) {
          const { body, img, tips } = await createImgMessage(discussRef.current, message)
          newBody = body
          newText = img
          newTips = tips
        }else {
        const {text, body, tips} = createBubbleMessage(discussRef.current, message)
          newBody = body
          newText = text
          newTips = tips
        }
        setMessageTips(newTips)
        if(newBody) {
        //设置为成功添加留言 
        setIsSuccess(true);
        // 清空输入框
        setMessage("");
        Composite.add(engine.world, newBody);
        // 立即执行函数前面的语句必须使用分号（把我坑惨了）
        (function rerender() {
          render(newBody, newText)
          requestAnimationFrame(rerender)
        })()
        } else {
        //添加留言失败
        setIsSuccess(false)
        }
        }
      }
    }

    const handleDoubleQ = (e) => {
      const isShiftPressed = e.shiftKey;
      const isKeyQPressed = e.code === "KeyQ"
      if (isKeyQPressed && isShiftPressed) {
        if(isShow === "block") setIsShow("none")
        else setIsShow("block")
      }
     }

    window.addEventListener("keydown", handleDoubleQ)
    input.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleDoubleQ)
      input.removeEventListener("keydown", handleKeyDown);
    }
  })

  return (
    <div className="absolute z-10 w-1/2 border-slate-400 left-1/2 -translate-x-1/2 top-1/4">
      {isShow === "none" && <span>shift + Q 就可以留言啦(☆▽☆)</span>}
      {isSuccess === true && 
      <Alert
      message={messageTips}
      type="success"
      showIcon
      closable
    />}
      {isSuccess === false && 
      <Alert
      message={messageTips}
      type="error"
      showIcon
      closable
    />}
      <input required style={{display: isShow}} ref={inputRef} value={message} onChange={handleInput} type="text" className="outline-2 outline-dashed outline-[#2d7cee] w-full" placeholder="/输入完按Enter留言" />
    </div>
  )
}

export default Discuss;
