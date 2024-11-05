import React, { useState, useEffect, useCallback, Fragment } from "react";
import { Checkbox, Popover, Button, Row, Col } from "antd";
import { FilterFilled, CheckOutlined } from "@ant-design/icons";

const CheckboxMenu = ({ options, value, onChange }) => {
  const [selectedItems, setSelectedItems] = useState(value || []);
  const [iconStyle, setIconStyle] = useState({});

  useEffect(() => {
    if (value && value.length) {
      setSelectedItems([...value]);
      checkIconFilled([...value]);
    }
  }, [value]);

  const onChangeHandler = (selection) => {
    setSelectedItems([...selection]);
    checkIconFilled([...selection]);
    onChange(selection);
  };

  const checkIconFilled = (items) => {
    if (items.length) {
      setIconStyle({ color: "#1890ff" });
    } else {
      setIconStyle({});
    }
  };

  const checkboxRender = useCallback(() => {
    return (
      <Checkbox.Group onChange={onChangeHandler} value={selectedItems}>
        <Col>
          {options.map((label, key) => (
            <Fragment key={key}>
              <Checkbox value={label}>{label}</Checkbox>
              <br />
              <br />
            </Fragment>
          ))}
        </Col>
      </Checkbox.Group>
    );
  }, [options, selectedItems]);

  return (
    <Popover
      overlayStyle={{ width: "fit-content" }}
      content={checkboxRender}
      trigger="click"
      placement="bottomLeft"
    >
      <img
        src="../../photos/icons_menu_bar/iconoir--filter-solid.svg"
        alt="filter"
        style={iconStyle}
      />
    </Popover>
  );
};

export default React.memo(CheckboxMenu);
