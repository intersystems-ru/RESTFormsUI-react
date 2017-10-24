import React from 'react';
import PropTypes from 'prop-types';
import {Breadcrumb, Table, Button} from 'antd';
import { NavLink } from 'react-router-dom';
import CatalogApi from '../../api/catalogApi';


function getBreadcrumbs(catalog = 'Catalog') {
  return (
    <Breadcrumb style={{margin: '12px 0'}}>
      <Breadcrumb.Item><NavLink to="/">Catalogs</NavLink></Breadcrumb.Item>
      <Breadcrumb.Item>{catalog}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

class CatalogPage extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        dataIndex: 'displayName',
        key: '_id'
      },
      {
        key: 'action',
        width: "100px",
        onCellClick: (record, event) => {
          if (
            event.target.matches('.anticon-edit') ||
            (event.target.firstElementChild &&
             event.target.firstElementChild.matches('.anticon-edit'))
          ) {
            this.edit(record);

          } else if (
            event.target.matches('.anticon-delete') ||
            (event.target.firstElementChild &&
             event.target.firstElementChild.matches('.anticon-delete'))
          ) {
            this.remove(record);
          }
        },
        render: (text, record) => (
          <span>
            <Button type="primary" icon="edit" style={{margin: "0 5px"}}/>
            <Button type="danger" icon="delete" style={{margin: "0 5px"}}/>
          </span>
        )
      }
    ];

    this.state = {
      catalog: {},
      extent: []
    };
  }

  componentDidMount() {
    const name = this.props.match.params.name;

    CatalogApi.getCatalogInfo(name)
      .then((response) => {
        this.setState({catalog: response.data});
        return CatalogApi.getCatalogExtent(name);
      })
      .then((response) => {
        this.setState({extent: response.data.children});
      });
  }

  edit = (record) => {
    const path = this.props.location.pathname;
    this.props.history.replace(`${path}/object/${record._id}`);
  };

  remove = (record) => {
    console.log('Remove item:' + record);
  };

  render() {
    return (
      <div>
        {getBreadcrumbs(this.state.catalog.name)}

        <div style={{background: '#fff', padding: 24, minHeight: 280}}>

          <div className="clearfix" style={{width: "100%"}}>
            <h2 style={{display: "inline"}}>
              {this.state.catalog.name || '...'}
            </h2>
            <Button type="primary"
                    style={{float: 'right', marginBottom: 8}}
                    size="small"
                    onClick={this.handleAdd}
                    className="clearfix"
            >
              Add
            </Button>
          </div>

          <Table
            rowKey="_id"
            dataSource={this.state.extent}
            columns={this.columns}
            showHeader={false}
            bordered
            size="middle"
            pagination={{showSizeChanger: true}}
          />
        </div>
      </div>
    );
  }
}

CatalogPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object
};

export default CatalogPage;
