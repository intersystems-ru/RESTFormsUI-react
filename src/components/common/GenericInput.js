import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputNumber, Input, DatePicker, Select, Checkbox } from 'antd';
import moment from 'moment';


const GenericInput = ({ category, collection = [], collectionType,
                        type, name, label, onChange, placeholder,
                        value, error }) => {

  function onChangeDate(name) {
    return function(date, dateString) {
      onChange(name, dateString);
    };
  }

  function onChangeTimestamp(name) {
    return function(date) {
      let dateString = '';
      if (date) { dateString = date.format(); }
      onChange(name, dateString);
    };
  }

  function onChangeString(name) {
    return function(event) {
      onChange(name, event.target.value);
    };
  }

  function onChangeNumber(name) {
    return function(value) {
      onChange(name, value);
    };
  }

  function onChangeSelect(name) {
    return function(value) {
      onChange(name, { _id: value, _class: type });
    };
  }

  function onChangeBoolean(name) {
    return function(event) {
      onChange(name, event.target.checked);
    };
  }

  function getMomentValue(value, dateFormat) {
    if (value) {
      return moment(value, dateFormat);
    }

    return null;
  }

  function filterSelect(input, option) {
    return (option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0);
  }

  let input = null;
  const dateFormat = 'YYYY-MM-DD';
  const datetimeFormat = 'YYYY-MM-DD HH:mm:ss';

  switch (type) {
    case '%Library.String':
      input = <Input value={value} onChange={onChangeString(name)} name={name}/>;
      break;
    case '%Library.Boolean':
      input = <Checkbox checked={value} onChange={onChangeBoolean(name)} name={name}>{label}</Checkbox>;
      break;
    case '%Library.Date':
      input = (<DatePicker format={dateFormat} value={getMomentValue(value, dateFormat)}
                          name={name} onChange={onChangeDate(name)}/>);
      break;
    case '%Library.TimeStamp':
      input = (<DatePicker format={datetimeFormat} value={getMomentValue(value, moment.ISO_8601)}
                           showTime name={name} onChange={onChangeTimestamp(name)}/>);
      break;
    case '%Library.Integer':
    case '%Library.Numeric':
      input = <InputNumber name={name} value={value} onChange={onChangeNumber(name)}/>;
      break;
    default:
      if (category === 'form') {

        if (!collectionType) {
            let options = collection.map(item => {
              return <Select.Option key={item._id} value={item._id}>{item.displayName}</Select.Option>;
            });

            if (value) {
              // extract the id and cast it to string (<Select> accepts only string type for 'value' due PropType)
              value = value._id.toString();
            }

            input = (
              <Select showSearch style={{ width: 200 }}
                      value={value}
                      name={name}
                      optionFilterProp="children"
                      filterOption={filterSelect}
                      onChange={onChangeSelect(name)}>
                {options}
              </Select>
            );
        }

      }
      break;
  }

  if (input) {
    if (type !== '%Library.Boolean') {
      return (
        <Form.Item label={label}>
          {input}
        </Form.Item>
      );
    } else {
      return input;
    }

  } else {
    return <div/>;
  }
};

GenericInput.propTypes = {
  type: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  collectionType: PropTypes.string.isRequired,
  collection: PropTypes.array,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.string
};

export default GenericInput;
