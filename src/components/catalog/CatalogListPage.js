import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Table, notification } from 'antd';
import CatalogApi from '../../api/catalogApi';

class CatalogListPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      catalogs: []
    };

    this.columns = [
      {
        title: 'Catalog',
        dataIndex: 'name',
        key: 'class',
        sorter: sortByName,
        className: 'clickable-cell',
        onCellClick: (record) => {
          this.props.history.push(`/catalog/${record.class}`);
        }
      }
    ];
  }

  componentDidMount() {
    CatalogApi.getAllCatalogs()
      .then((catalogs) => {
        this.setState({catalogs: catalogs.data.sort(sortByName)});
      })
      .catch((err) => {
        notification.error({
          message: 'Unable to load Catalog list',
          description: err.summary || '',
        });
      });
  }


  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>Catalogs</Breadcrumb.Item>
        </Breadcrumb>

        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <Table
            dataSource={this.state.catalogs}
            columns={this.columns}
            rowKey="class"
            bordered
            size="middle"
            pagination={{showSizeChanger: true}}
          />
        </div>
      </div>
    );
  }
}

function sortByName(a, b) {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
}

CatalogListPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object
};

export default CatalogListPage;
