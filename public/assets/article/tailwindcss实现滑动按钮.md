> tailwindcss 强大的功能让我们无需 JS 实现滑动按钮效果

直接上代码,其中中间圆形按钮是通过伪元素`::before`实现，重点的地方就是利用`peer-checked`,根据兄弟类的状态来调整样式

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <script src="https://cdn.tailwindcss.com"></script>
    <title>tailwindcss实现滑动按钮</title>
  </head>

  <script src="https://cdn.tailwindcss.com"></script>
  <body class="p-20">
    <div className="">tailwindcss实现滑动按钮</div>
    <div class="mt-5">
      <label class="relative inline-block w-16 h-9 rounded-full">
        <input type="checkbox" class="peer opacity-0 w-0 h-0" />
        <span
          class="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full
 duration-300 before:content-[''] before:absolute before:w-7 before:h-7 before:bottom-1 before:left-1
 before:rounded-full before:bg-white before:duration-300 peer-checked:before:translate-x-7 peer-checked:bg-blue-500"
        ></span>
      </label>
    </div>
  </body>
</html>
```

看看效果，大概就是这样

<iframe height="403.2000427246094" style="width: 100%;" scrolling="no" title="tailwindcss实现滑动按钮" src="https://codepen.io/ye-qin/embed/VwgoxEJ?default-tab=result&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ye-qin/pen/VwgoxEJ">
  tailwindcss实现滑动按钮</a> by ye qin (<a href="https://codepen.io/ye-qin">@ye-qin</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
