import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Route, NavLink } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, LocaleProvider } from 'antd';

const { Header, Content, Footer } = Layout;

import enUS from 'antd/lib/locale-provider/en_US';

import Container from './common/Container';
import CatalogPage from './catalog/CatalogPage';
import CatalogListPage from "./catalog/CatalogListPage";
import ManageCatalogPage from "./catalog/ManageCatalogPage";

class App extends Component {
  render() {
    return (
      <LocaleProvider locale={enUS}>
        <Layout className="layout">
          <Header style={{background: "#fff"}}>
            <Container>
              <span>User: <b>{window.userName}</b></span>
              <Menu
                mode="horizontal"
                selectable={false}
                style={{ lineHeight: '63px', display: 'inline'}}
              >
                <Menu.Item style={{float: "right"}}><a href="?CacheLogout=1">Log out <Icon type="logout"/></a></Menu.Item>
              </Menu>
            </Container>
          </Header>
          <Container>
            <Content style={{ minHeight: "calc(100vh - 130px)", padding: "20px" }}>

              <Route exact path={"/"} component={CatalogListPage}/>
              <Route exact path={"/catalog/:name"} component={CatalogPage}/>
              <Route exact path={"/catalog/:name/object/:id"} component={ManageCatalogPage}/>
              <Route exact path={"/catalog/:name/object"} component={ManageCatalogPage}/>

            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Built with React and Ant Design
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
