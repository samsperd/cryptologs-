import { PlusOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, List, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

const TopLosers = () => {
    const mins = [
        <svg
          width="10"
          height="10"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          key={0}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 10C5 9.44772 5.44772 9 6 9L14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11L6 11C5.44772 11 5 10.5523 5 10Z"
            className="fill-danger"
          ></path>
        </svg>,
      ];
    

    const newest = [
        {
          headding: <h6>NEWEST</h6>,
          avatar: mins,
          title: "Netflix",
          description: "27 March 2021, at 12:30 PM",
          amount: "- $2,500",
          textclass: "text-light-danger",
          amountcolor: "text-danger",
        },
        {
          avatar: <PlusOutlined style={{ fontSize: 10 }} />,
          title: "Apple",
          description: "27 March 2021, at 04:30 AM",
          amount: "- $2,000",
          textclass: "text-light-danger",
          amountcolor: "text-danger",
        },
      ];
  return (
    <>
        <Col span={24} md={8} className="mb-24 mt-2">
            {/* <Title level={4}>
                Top Losers
            </Title> */}
          <Card
            bordered={false}
            bodyStyle={{ paddingTop: 0 }}
            className="header-solid h-full bg-transparent ant-list-yes tipper"
            title={
              <Title level={4}>
                  Top Losers
              </Title>
            }
          >
            <List
              className="transactions-list ant-newest"
              itemLayout="horizontal"
              dataSource={newest}
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

export default TopLosers