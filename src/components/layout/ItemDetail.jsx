import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../../network/Api";
import { METHOD_TYPE } from "../../network/methodType";
import Cookies from "js-cookie";
import BaseLayout from "./Baselayout";
import "../../assets/css/itemdetail.style.css";
import Button from "../Button";
import { addItem } from "../../redux/CartSlice";
import { useDispatch } from "react-redux";
const ItemDetailCompo = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    Cookies.remove("token");
    navigate("/login");
  }, [navigate]);

  const handleFurniturePage = useCallback(() => {
    navigate("/furniture");
  }, [navigate]);

  const handleCart = useCallback(() => {
    navigate("/cart");
  }, [navigate]);

  useEffect(() => {
    const fetchItem = async () => {
      const response = await Api({
        endpoint: `https://667943a618a459f6394ee5b4.mockapi.io/Product/`,
        query: { id: itemId },
        method: METHOD_TYPE.GET,
      });
      setItem(response[0]);
    };
    fetchItem();
  }, [itemId]);

  const handleAddToCart = (item) => {
    dispatch(addItem(item));
  };
  return (
    <>
      <BaseLayout
        showLogin={true}
        handleFurniturePage={handleFurniturePage}
        handleLogout={handleLogout}
        handleCart={handleCart}
      >
        <div>
          <h1>Item Detail</h1>
          <div className="item-detail-box">
            <div className="box1">
              <img src={item?.image} className="image"></img>
            </div>
            <div className="box2">
              <div className="info">
                <h2>Name: {item?.name}</h2>
                <p>Price: {item?.price}</p>
              </div>
              <div className="btn-box">
                <Button
                  className="add-btn"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

const ItemDetail = React.memo(ItemDetailCompo);
export default ItemDetail;
