import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import { Toaster } from "react-hot-toast";
import Warranty from "./components/Warranty";
import Footer from "./shared/Footer";
import WishList from "./components/WishList";
import Product from "./components/Product";
import Signup from "./shared/Signup";
import Login from "./shared/Login";
import StoreLocatorPage from "./components/StoreLocatorPage";

import AdminSidebar from "./adminUi/AdminSidebar";
import AddProducts from "./adminUi/AddProducts";
import AddStore from "./adminUi/AddStore";
import StoreTable2 from "./components/Store table/StoreTable";
import Protected from "./shared/Protected";
import NavBar2 from "./shared/NavBar2";
import ProductSinglePage from "./ProductSinglePage";
import FilterComponents from "./components/FilterSearchQueryPages/FilterComponents";
import CollectionFiltersLogic from "./components/CollectionFiltersHome/CollectionFiltersLogic";
import NotFound from "./shared/NotFound";

function App() {
  const location = useLocation();

  const hideHeaderFooterPaths = [
    "/",
    "/login",
    "/signup",
    "/admin",
    "/adminsignup",
    "/home",
    "/productsAdd",
    "/AddProduct",
    "/admin",
    "/addstore",
  ];
  const shouldHideHeaderFooter = hideHeaderFooterPaths.includes(
    location.pathname
  );


  return (
    <div>
      {!shouldHideHeaderFooter && <NavBar2 />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/warranty" element={<Warranty />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductSinglePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/store" element={<StoreLocatorPage />} />
        <Route path="/storeTable" element={<StoreTable2 />} />
        {/* <Route path="/:slug" element={<FIlterPage />} /> */}
        <Route path="/filter/:slug" element={<FilterComponents />} />
        <Route path="/collections/:id" element={<CollectionFiltersLogic />} />

        {/*  admin ui */}

        <Route
          path="/admin"
          element={<Protected Components={AdminSidebar} />}
        />
        <Route
          path="/AddProduct"
          element={<Protected Components={AddProducts} />}
        />
        <Route path="/addstore" element={<Protected Components={AddStore} />} />

        {/* 👇 catch all route must be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
