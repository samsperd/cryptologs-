import React from "react";
import { DribbbleOutlined, GithubOutlined, LinkedinOutlined, InstagramOutlined, TwitterOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const { Footer: AntFooter } = Layout;


function Footer() {
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
    <AntFooter>
                <Menu mode="horizontal" >
                { links.map((link, index) => (
                    <Menu.Item key={index + 1}>
                        <Link to={link.link}>
                        <span>{link.name}</span>
                        </Link>
                    </Menu.Item>
                )) }
                </Menu>

    <Menu mode="horizontal" className="menu-nav-social" defaultSelectedKeys={["1"]}>
      <Menu.Item key={1}>
        <a href="https://www.linkedin.com/in/obinna-iloeje-15183a202" target={'_blank'}  rel="noopener noreferrer">{<DribbbleOutlined />}</a>
      </Menu.Item>
      <Menu.Item key={2}>
        <a href="https://twitter.com/samsperd" target={'_blank'}  rel="noopener noreferrer">{<TwitterOutlined />}</a>
      </Menu.Item>
      <Menu.Item key={3}>
        <a href="https://www.instagram.com/djinpod" target='_blank'  rel="noopener noreferrer">
          {<InstagramOutlined />}
        </a>
      </Menu.Item>
      <Menu.Item key={4}>
        <a target={'_blank'}  rel="noopener noreferrer" href="https://www.linkedin.com/in/obinna-iloeje-15183a202">{<LinkedinOutlined />}</a>
      </Menu.Item>
      <Menu.Item key={5}>
        <a href="https://github.com/samsperd" target={'_blank'}  rel="noopener noreferrer">{<GithubOutlined />}</a>
      </Menu.Item>
    </Menu>
    <p className="copyright">
      {" "}
      Copyright © 2021 Made by <a href="#pablo"> SlickStubborn </a>.{" "}
    </p>
  </AntFooter>
);
}

export default Footer;
