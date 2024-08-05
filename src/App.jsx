import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoutes from "./route/PrivateRoutes";

// const TodoList = lazy(() => import("./pages/TodoList"));
const Login = lazy(() => import("./pages/Login"));
const Furniture = lazy(() => import("./pages/Furniture"));
const ItemDetail = lazy(() => import("./components/layout/ItemDetail"));
const Cart = lazy(() => import("./pages/Cart"));
function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoutes />}>
            <Route index element={<Navigate to="/furniture" />} />
            <Route path="furniture" element={<Furniture />} />
            <Route path="item/:itemId" element={<ItemDetail />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
export default App;
