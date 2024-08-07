import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import React, { useCallback } from "react";
import "../assets/css/furniture.style.css";
import BaseLayout from "../components/layout/Baselayout";
import Button from "../components/Button";
// import Item from "../components/Item";
function HandleFurniturePage() {
  const navigate = useNavigate();
  const handleLogout = useCallback(() => {
    Cookies.remove("token");
    navigate("/login");
  }, [navigate]);
  const handleCart = useCallback(() => {
    navigate("/cart");
  }, [navigate]);
  const handleChairList = useCallback(() => {
    navigate("/chair");
  }, [navigate]);
  const handleTableList = useCallback(() => {
    navigate("/table");
  }, [navigate]);
  return (
    <>
      <BaseLayout showLogin handleLogout={handleLogout} handleCart={handleCart}>
        <div>
          <h1>Furniture</h1>
        </div>
        <div className="furniture-list">
          <Button className="furniture" onClick={handleChairList}>
            Chair
          </Button>
          <Button className="furniture" onClick={handleTableList}>
            Table
          </Button>
        </div>
      </BaseLayout>
    </>
  );
}

const Furniture = React.memo(HandleFurniturePage);
export default Furniture;
