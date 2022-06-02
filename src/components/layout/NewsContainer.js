import React from 'react'
import { Row } from "antd";

function NewsContainer({ children, simplified }) {

  return (
        simplified ? (<div className="mb-24 mashed justify-content-space-between pb-7 overflow-x-scroll">{ children }</div>) : (<Row gutter={[24, 0]}>{children}</Row>)
  );
}

export default NewsContainer;
