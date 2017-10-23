import React from 'react';
import { Breadcrumb, Table } from 'antd';

class CatalogListPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.columns = [
      {
        title: 'Catalog',
        dataIndex: 'name',
        key: 'class',
        sorter: sortByName,
        className: 'clickable-cell',
        onCellClick: (record) => {
          history.replace(`/catalog/${record.class}`);
        }
      }
    ];
  }

  componentDidMount() {
    this.setState({catalog: []});
  }


  render() {
    const { catalogs } = this.props;

    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>Catalogs</Breadcrumb.Item>
        </Breadcrumb>

        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <Table
            dataSource={catalogs}
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

export default CatalogListPage;
