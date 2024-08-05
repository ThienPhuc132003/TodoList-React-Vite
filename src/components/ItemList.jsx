// src/components/ItemList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Api from "../network/Api";
import { METHOD_TYPE } from "../network/methodType";
import PropTypes from "prop-types";
import { addItem } from "../redux/CartSlice";
import Button from "./Button";

const ItemListompo = (props) => {
  const { endpoint, onClick = () => {}, onChange = () => {}, ...rest } = props;
  const dispatch = useDispatch();
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await Api({
        endpoint: endpoint,
        method: METHOD_TYPE.GET,
        query: {},
      });
      setItemData(response.map((item) => ({ ...item, itemId: item.id })));
    };
    fetchData();
  }, [endpoint]);

  const handleAddToCart = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div className="item-list-box">
      <div className="item-list">
        {itemData.map((item) => (
          <div className="item" key={item.id} onChange={onChange} {...rest}>
            <img
              src={item.image}
              alt={item.name}
              onClick={() => onClick(item.id)}
            />
            <h2>{item.name}</h2>
            <p>Price: ${item.price}</p>
            <div className="btn-box">
              <Button className="add-btn" onClick={() => handleAddToCart(item)}>
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ItemList = React.memo(ItemListompo);
export default ItemList;

ItemListompo.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  endpoint: PropTypes.string,
};
