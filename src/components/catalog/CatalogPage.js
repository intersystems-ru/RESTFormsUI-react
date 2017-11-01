import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Table, Button, notification, Modal } from 'antd';
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
        className: 'text-right',
        onCellClick: (record, event) => {
          if (
            (event.target.matches('#view') ||
            (event.target.firstElementChild && event.target.firstElementChild.matches('#view'))) ||
            (event.target.matches('#edit') ||
            (event.target.firstElementChild && event.target.firstElementChild.matches('#edit')))
          ) {
            this.open(record);
          }
          else if (
            event.target.matches('#delete') ||
            (event.target.firstElementChild && event.target.firstElementChild.matches('#delete'))
          ) {
            this.remove(record);
          }
        },
        render: (text, record) => (
          <span>
            {this.state.catalog.objpermissions.includes('U') &&
              <Button type="primary" id="edit" icon="edit" style={{margin: "0 5px"}}/>
            }

            {!this.state.catalog.objpermissions.includes('U') &&
              this.state.catalog.objpermissions.includes('R') &&
              <Button type="primary" id="view" icon="search" style={{margin: "0 5px"}}/>
            }

            {this.state.catalog.objpermissions.includes('D') &&
              <Button type="danger" icon="delete" style={{margin: "0 5px"}}/>
            }
          </span>
        )
      }
    ];

    this.state = {
      catalog: {
        name: '',
        objpermissions: ''
      },
      extent: []
    };
  }

  componentDidMount() {
    const name = this.props.match.params.name;

    CatalogApi.getCatalogInfo(name)
    .then((response) => {
      this.setState((state) => ({catalog: response.data}));

      // Load catalog data only if we have permission for that
      if (response.data.objpermissions.includes('R')) {
        return this.loadCatalogExtent(name);
      }
    })
    .catch((error) => {
      const summary = (error && error.response && error.response.data && error.response.data.summary);

      notification.error({
        message: 'An error has occurred: ' + summary
      });
    });
  }

  loadCatalogExtent = (name) => {
    return CatalogApi.getCatalogExtent(name)
      .then((response) => {
        this.setState({extent: response.data.children});
      })
      .catch((error) => {
        const summary = (error && error.response && error.response.data && error.response.data.summary);

        notification.error({
          message: 'An error has occurred: ' + summary
        });
      });

  };

  add = () => {
    const path = this.props.location.pathname;
    this.props.history.push(`${path}/object`);
  };

  open = (record) => {
    const path = this.props.location.pathname;
    this.props.history.push(`${path}/object/${record._id}`);
  };

  remove = (record) => {
    Modal.confirm({
      title: 'Do you really want to remove this object?',
      onOk: () => {
        CatalogApi.deleteObject(this.state.catalog.class, record._id)
          .then(() => {
            this.loadCatalogExtent(this.props.match.params.name);
            notification.success({
              message: 'Object removed successfully'
            });

          })

          .catch((error) => {
            notification.error({
              message: 'An error has occurred: ' + error.summary
            });
          });
      },
      style: {top: '40vh'}
    });
  };

  render() {
    return (
      <div>
        {getBreadcrumbs(this.state.catalog.name)}

        <div style={{background: '#fff', padding: 24, minHeight: 280}}>

          <div className="clearfix" style={{width: "100%", marginBottom: '20px'}}>
            <h2 style={{display: "inline"}}>
              {this.state.catalog.name || '...'}
            </h2>

            {(this.state.catalog.objpermissions.includes('C')) &&
                <Button type="primary"
                        style={{float: 'right', marginBottom: 8}}
                        size="small"
                        onClick={this.add}
                        className="clearfix"
                >
                  Add
                </Button>
            }

          </div>

          {this.state.catalog.objpermissions.includes('R') &&
            <Table
              rowKey="_id"
              dataSource={this.state.extent}
              columns={this.columns}
              showHeader={false}
              size="middle"
              pagination={{showSizeChanger: true}}
            />
          }

          {this.state.catalog.name && !this.state.catalog.objpermissions.includes('R') &&
            <div style={{textAlign: 'center', padding: '20px'}}>
              <h3>You have no permissions to view this catalog.</h3>
            </div>
          }
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
