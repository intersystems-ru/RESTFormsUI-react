import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const CatalogFormActions = ({ permissions, onClose, onSave }) => {
  return (
    <div style={{textAlign: 'right'}}>
      <Button style={{background: '#000', color: '#fff', marginRight: '7px'}} onClick={onClose}>Close</Button>
      {permissions.includes('U') && <Button type="primary" onClick={onSave}>Save</Button>}
    </div>
  );
};

CatalogFormActions.propTypes = {
  permissions: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default CatalogFormActions;
