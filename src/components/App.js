import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from './common/Container';
import CatalogPage from './catalog/CatalogPage';
import { Route, NavLink } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import CatalogListPage from "./catalog/CatalogListPage";
const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <LocaleProvider locale={enUS}>
        <Layout className="layout">
          <Header style={{background: "#fff"}}>
            <Container>
              <span>User: <b>Tester</b></span>
              <Menu
                mode="horizontal"
                selectable={false}
                style={{ lineHeight: '63px', display: 'inline'}}
              >
                <Menu.Item style={{float: "right"}}>Log out <Icon type="logout"/></Menu.Item>
              </Menu>
            </Container>
          </Header>
          <Container>
            <Content style={{ minHeight: "calc(100vh - 130px)", padding: "20px" }}>
              <Route exact path={"/"} component={CatalogListPage}/>
              <Route exact path={"/catalog/:name"} component={CatalogPage}/>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Sergey Sarkisyan ©2017 Built with React and Ant Design
            </Footer>
          </Container>
        </Layout>
      </LocaleProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

export default App;
