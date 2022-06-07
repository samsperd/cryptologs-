import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { Layout } from "antd";
import { Footer, Navbar, TopNav } from "./components";
import './assets/styles/custom.css';
import Cryptocurrencies from "./pages/Cryptocurrencies";
import Exchanges from "./pages/Exchanges";
import News from "./pages/News";
import CryptoDetails from "./pages/CryptoDetails";
import ScrollToTop from "./components/extras/ScrollToTop";

const { Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout className="layout-default layout-light">
        <TopNav></TopNav>
        <Navbar></Navbar>
        <Content className="container">
          <ScrollToTop>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/cryptocurrencies" component={Cryptocurrencies} />
              <Route exact path="/crypto/:id" component={CryptoDetails} />
              <Route exact path="/exchanges" component={Exchanges} />
              <Route exact path="/news" component={News} />
            </Switch>
          </ScrollToTop>
        </Content>
        <Footer></Footer>
      </Layout>
    </div>
  );
}

export default App;
