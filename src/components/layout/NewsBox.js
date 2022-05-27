import { Col } from "antd";

function NewsBox({ children, simplified }) {

  return (
      simplified ? (<>{ children}</>) : (<Col xs={24} md={12} sm={12} lg={8}><center>{children}</center></Col>)
  );
}

export default NewsBox;
