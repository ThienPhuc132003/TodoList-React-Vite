import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import BaseLayout from "../components/layout/Baselayout";
import "../assets/css/itemList.style.css";
import ItemList from "../components/ItemList";
function HandleTable() {
  const navigate = useNavigate();
  const handleLogout = useCallback(() => {
    Cookies.remove("token");
    navigate("/login");
  }, [navigate]);
  const handleCart = useCallback(() => {
    navigate("/cart");
  }, [navigate]);
  const handleFurniturePage = useCallback(
    () => navigate("/furniture"),
    [navigate]
  );
  const handleItemClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };
  const endpoint = "https://667943a618a459f6394ee5b4.mockapi.io/Product";
  return (
    <>
      <BaseLayout
        showLogin
        handleLogout={handleLogout}
        handleCart={handleCart}
        handleFurniturePage={handleFurniturePage}
      >
        <ItemList
          furnitureName={"Table"}
          onClick={handleItemClick}
          endpoint={endpoint}
        />
      </BaseLayout>
    </>
  );
}

const TableList = React.memo(HandleTable);
export default TableList;
