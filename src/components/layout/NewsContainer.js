import { Row } from "antd";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function NewsContainer({ children, simplified }) {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");


  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  useEffect(() => {
    if (pathname === "rtl") {
      setPlacement("left");
    } else {
      setPlacement("right");
    }
  }, [pathname]);

  return (
        simplified ? (<div className="mb-24 mashed justify-content-space-between pb-7 overflow-x-scroll">{ children }</div>) : (<Row gutter={[24, 0]}>{children}</Row>)
  );
}

export default NewsContainer;
