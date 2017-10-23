import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from './common/Container';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header style={{background: "#fff"}}>
          <Container>
            <span>Пользователь: <b>Tester</b></span>
            <Menu
              mode="horizontal"
              selectable={false}
              style={{ lineHeight: '63px', display: 'inline'}}
            >
              <Menu.Item style={{float: "right"}}>Выйти <Icon type="logout"/></Menu.Item>
            </Menu>
          </Container>
        </Header>
        <Container>
          <Content style={{ minHeight: "calc(100vh - 130px)" }}>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Sergey Sarkisyan ©2017 Built with React and Ant Design
          </Footer>
        </Container>
      </Layout>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

export default App;
