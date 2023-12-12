import Matter from "matter-js"
import { useEffect, useRef } from "react"
const Discuss = () => {
  const discussRef = useRef(null)

  // 物理引擎
  const Engine = Matter.Engine
  // 渲染器
  const Render = Matter.Render
  // 刚体
  const Bodies = Matter.Bodies
  // 复合体
  const Composite = Matter.Composite
  // 时间循环
  const Runner = Matter.Runner

  // 创建引擎
  const engine = Engine.create()
  // 创建渲染器，并将渲染器挂载到画布上
  useEffect(() => {
    const discuss = discussRef.current
    // 创建渲染器
    const render = Render.create({
      element: discuss,
      engine: engine,
      options: {
        width: window.innerWidth,
        wireframes: false
      }
    })
    // 执行渲染操作
    Render.run(render)

    // 创建运行方法
    const runner = Runner.create()

    Runner.run(runner, engine)
  })

  // 创建刚体元素
  // 矩形参数为x, y, w, h(x, y为元素中心点位置)
  const boxA = Bodies.rectangle(window.innerWidth / 2, 200, 80, 80)
  // 圆形参数为x, y, r
  const boxB = Bodies.circle(450, 50, 80)
  
  // 创建地面
  const ground = Bodies.rectangle(window.innerWidth / 2, 610, window.innerWidth, 60, {isStatic: true})

  // 元素形成一个复合体
  Composite.add(engine.world, [boxA, boxB, ground])

  return ( 
    <div ref={discussRef}></div>
   );
}
 
export default Discuss;