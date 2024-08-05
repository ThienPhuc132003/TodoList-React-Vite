import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BaseLayout from "../components/layout/Baselayout";
import Cookies from "js-cookie";
import "../assets/css/Cart.style.css";
import Button from "../components/Button";
import {
  removeItem,
  incrementItem,
  decrementItem,
  clearCart,
} from "../redux/CartSlice";

function HandleCartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleFurniturePage = useCallback(() => {
    navigate("/furniture");
  }, [navigate]);

  const handleLogout = useCallback(() => {
    Cookies.remove("token");
    navigate("/login");
  }, [navigate]);

  const handleRemoveItem = (id) => {
    dispatch(removeItem({ id }));
  };

  const handleIncrementItem = (id) => {
    dispatch(incrementItem({ id }));
  };

  const handleDecrementItem = (id) => {
    dispatch(decrementItem({ id }));
  };

  const handleClearCart = (id) => {
    dispatch(clearCart({ id }));
  };
  return (
    <>
      <BaseLayout
        showLogin
        handleLogout={handleLogout}
        handleFurniturePage={handleFurniturePage}
      >
        <div>
          <h1>Cart</h1>
          <ul className="cart-item-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img className="image" src={item.image} alt={item.name}></img>
                <div className="item-name">{item.name}</div>
                <div className="item-price">${item.price * item.quantity}</div>
                <div className="item-value">
                  <Button
                    className="plus-btn"
                    onClick={() => handleIncrementItem(item.id)}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </Button>
                  <div className="item-quantity">{item.quantity}</div>
                  <Button
                    className="minus-btn"
                    onClick={() => handleDecrementItem(item.id)}
                    style={{
                      filter: item.quantity === 1 ? "color: #cccccc" : "none",
                    }}
                    disabled={item.quantity === 1}
                  >
                    <i className="fa-solid fa-minus"></i>
                  </Button>
                </div>
                <div className="btn-box">
                  <i
                    className="fa-solid fa-trash "
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRemoveItem(item.id)}
                  ></i>
                </div>
              </li>
            ))}
            <Button onClick={() => handleClearCart(cartItems.id)}>Clear</Button>
          </ul>
        </div>
      </BaseLayout>
    </>
  );
}

const Cart = React.memo(HandleCartPage);
export default Cart;
