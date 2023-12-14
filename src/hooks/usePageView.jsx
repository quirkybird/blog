import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useRouterTracking() {
  const viewNumber = useRef({});
  const location = useLocation();
  const pathname = useRef(null);
  const [title, setTitle] = useState(document.title);

  useEffect(() => {
    console.log(title); // 打印当前的标题
    pathname.current = location.pathname;
    setTitle(document.title); // 更新标题的状态

    if (title in viewNumber.current) viewNumber.current[title] += 1;
    else viewNumber.current[title] = 1;
  }, [location.pathname, title]);
}