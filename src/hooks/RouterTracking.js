import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RouterTracking() {

  const location = useLocation()

  useEffect(() => {
    console.log(location)
    console.log(document.title)
  }, [location]);

}