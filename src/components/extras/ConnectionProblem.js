import React from 'react';
import { Result, Button } from 'antd';


const connectionProblem = () => {
  return (
    <Result
        status={'error'}
        title="Error in connection"
        subTitle="Please check your connection and refresh page"
        style={{ height: '60vh' }}
        extra={
        <Button onClick={() => window.location.reload()} type="primary" key="console">
            Refresh Page
        </Button>
        }
    />

  )
}

export default connectionProblem