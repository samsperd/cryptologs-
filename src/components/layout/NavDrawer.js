import React, { useState } from 'react';
import { Drawer, Button, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { MenuFoldOutlined } from '@ant-design/icons';

const NavDrawer = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const links = [
    {
        link: '/',
        name: 'Home'
    },
    {
        link: '/cryptocurrencies',
        name: 'Cryptocurrencies'
    },
    {
        link: '/exchanges',
        name: 'Exchanges'
    },
    {
        link: '/news',
        name: 'News'
    }
];


  return (
    <>
      <Button type="link" onClick={showDrawer}>
        <MenuFoldOutlined style={{ color: 'black', fontSize: '16px' }} />
      </Button>
      <Drawer placement="left" onClose={onClose} visible={visible}>
      <Menu mode="vertical">
                { links.map((link, index) => (
                    <Menu.Item key={index + 1}>
                        <Link to={link.link}>
                        <span>{link.name}</span>
                        </Link>
                    </Menu.Item>
                )) }
                </Menu>

      </Drawer>
    </>
  );
};

export default NavDrawer;