import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import UnderConstructionPage from "./pages/UnderConstructionPage";
import ScrollToTop from "./components/utils/ScrollToTop";
import CategoryProducts from "./pages/CategoryProducts";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Payment from "./pages/Payment";

import SignInPage from "./pages/SignInPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/all" element={<AllProducts />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/products/:categoryName" element={<CategoryProducts />} />
        <Route
          path="/products/:categoryName/product/:id"
          element={<ProductDetailsPage />}
        />
        <Route path="/sign-in" element={<SignInPage />} />


        {/* Protected Routes */}
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        <Route path="/cart" element={<Cart />} />
        <Route path="/under-construction" element={<UnderConstructionPage />} />
        <Route
          path="/under-construction/contact"
          element={<UnderConstructionPage />}
        />
        <Route
          path="/under-construction/blog"
          element={<UnderConstructionPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
