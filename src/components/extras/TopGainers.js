import { ExclamationOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, List, Typography } from 'antd';
import React from 'react'

const { Title } = Typography;

const TopGainers = () => {
        const yesterday = [
        {
          avatar: <PlusOutlined style={{ fontSize: 10 }} />,
          title: "Stripe",
          description: "26 March 2021, at 12:30 AM",
          amount: "+ $750",
          textclass: "text-fill",
          amountcolor: "text-success",
        },
        {
          avatar: <PlusOutlined style={{ fontSize: 10 }} />,
          title: "HubSpot",
          description: "26 March 2021, at 11:30 AM",
          amount: "+ $1,050",
          textclass: "text-fill",
          amountcolor: "text-success",
        },
        {
          avatar: <PlusOutlined style={{ fontSize: 10 }} />,
          title: "Creative Tim",
          description: "26 March 2021, at 07:30 AM",
          amount: "+ $2,400",
          textclass: "text-fill",
          amountcolor: "text-success",
        },
        {
          avatar: <ExclamationOutlined style={{ fontSize: 10 }} />,
          title: "Webflow",
          description: "26 March 2021, at 04:00 AM",
          amount: "Pending",
          textclass: "text-warning",
          amountcolor: "text-warning-b",
        },
      ];
 return (
    <>
        <Col span={24} md={8} className="mb-24 mt-2">
            {/* <Title level={4}>
                Top Gainers
            </Title> */}
          <Card
            bordered={false}
            bodyStyle={{ paddingTop: 0 }}
            className="header-solid h-full bg-transparent ant-list-yes tipper"
            title={
              <Title level={4}>
                  Top Gainers
              </Title>
            }
          >

            <List
              className="yestday transactions-list"
              itemLayout="horizontal"
              dataSource={yesterday}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar size="small" className={item.textclass}>
                        {item.avatar}
                      </Avatar>
                    }
                    title={item.title}
                    description={item.description}
                  />
                  <div className="amount">
                    <span className={item.amountcolor}>{item.amount}</span>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
    </>
  )
}

export default TopGainers