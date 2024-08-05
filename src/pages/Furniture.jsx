import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import React, { useCallback } from "react";
import "../assets/css/furniture.style.css";
import BaseLayout from "../components/layout/Baselayout";
import ItemList from "../components/ItemList";
// import Item from "../components/Item";
function HandleFurniturePage() {
  const navigate = useNavigate();
  const endpoint = "https://667943a618a459f6394ee5b4.mockapi.io/Product";
  const handleLogout = useCallback(() => {
    Cookies.remove("token");
    navigate("/login");
  }, [navigate]);
  const handleCart = useCallback(() => {
    navigate("/cart");
  }, [navigate]);
  const handleItemClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  return (
    <>
      <BaseLayout showLogin handleLogout={handleLogout} handleCart={handleCart}>
        <div>
          <h1>Furniture</h1>
        </div>
        <ItemList onClick={handleItemClick} endpoint={endpoint} />
      </BaseLayout>
    </>
  );
}

const Furniture = React.memo(HandleFurniturePage);
export default Furniture;
