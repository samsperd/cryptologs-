import { Row } from "antd";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function NewsContainer({ children }) {
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

        <Row className="content-ant">{children}</Row>
  );
}

export default NewsContainer;
