import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function useRouterTracking() {
  const viewNumber = useRef({});
  const location = useLocation();
  let pathname = useRef(null);
  let title = useRef(null);

  useEffect(() => {
    pathname.current = location.pathname;
    title.current = document.title;
    if (pathname.current) {
      if (title.current in viewNumber.current) viewNumber.current[title.current] += 1;
      else viewNumber.current[title.current] = 1;
    }
    console.log(viewNumber.current);
  }, [location]);
}
