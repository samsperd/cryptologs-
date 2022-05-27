import { StarOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import NavDrawer from './NavDrawer';

const { Header } = Layout;

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(false);
    const [screenSize, setScreenSize] = useState(null);

    useEffect(() => {
      const handleResize = () => setScreenSize(window.innerWidth);
    
      window.addEventListener('resize', handleResize);

      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
      if (screenSize < 768) {
          setActiveMenu(true);
      } else {
          setActiveMenu(false);
      }
    
    
    }, [screenSize]);

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
        <Header>
            <Link to={'/'} className="header-col header-brand">
                <h3>Cryptologs</h3>
            </Link>
            <div className="header-col header-nav">
                <Menu mode="horizontal">
                { links.map((link, index) => (
                    <Menu.Item key={index + 1}>
                        <Link to={link.link}>
                        <span>{link.name}</span>
                        </Link>
                    </Menu.Item>
                )) }
                </Menu>
            </div>
            <div className="header-col header-btn">
                <Button type='link'>
                    <StarOutlined style={{ color: 'black', fontSize: '16px' }}></StarOutlined>
                </Button>
            </div>
            <div className="header-col header-btn">
            {
                activeMenu && (
                    <NavDrawer></NavDrawer>
                )
            }
            </div>
        </Header>
    </>
  )
}

export default Navbar
