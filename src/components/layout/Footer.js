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
        <Link to="https://www.linkedin.com/in/obinna-iloeje-15183a202" target={'_blank'}  rel="noopener noreferrer">{<DribbbleOutlined />}</Link>
      </Menu.Item>
      <Menu.Item key={2}>
        <Link to="https://twitter.com/samsperd" target={'_blank'}  rel="noopener noreferrer">{<TwitterOutlined />}</Link>
      </Menu.Item>
      <Menu.Item key={3}>
        <Link to="https://www.instagram.com/djinpod" target={'_blank'}  rel="noopener noreferrer">
          {<InstagramOutlined />}
        </Link>
      </Menu.Item>
      <Menu.Item key={4}>
        <Link target={'_blank'}  rel="noopener noreferrer" to="https://www.linkedin.com/in/obinna-iloeje-15183a202">{<LinkedinOutlined />}</Link>
      </Menu.Item>
      <Menu.Item key={5}>
        <Link to="https://github.com/samsperd" target={'_blank'}  rel="noopener noreferrer">{<GithubOutlined />}</Link>
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
