import HomePage from "../pages/HomePage";
import OrderPage from "../pages/OrderPage";
import ProductsPage from "../pages/ProductsPage";
import NotFoundPage from "../pages/NotFoundPage";
import TypeProductPage from "../pages/TypeProductPage";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import ProposePage from "../pages/ProposePage";
import ProfilePage from "../pages/ProfilePage";
import AdminPage from "../pages/AdminPage";
import ProductSearchPage from "../pages/ProductSearchPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/order",
    page: OrderPage,
    isShowHeader: true,
  },
  {
    path: "/products",
    page: ProductsPage,
    isShowHeader: true,
  },
  {
    path: "/product/:type",
    page: TypeProductPage,
    isShowHeader: true,
  },
  {
    path: "/sign-in",
    page: SignInPage,
    isShowHeader: true,
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    isShowHeader: true,
  },
  {
    path: "/product-details/:id",
    page: ProductDetailsPage,
    isShowHeader: true,
  },
  {
    path: "/product-search",
    page: ProductSearchPage,
    isShowHeader: true,
  },
  {
    path: "/propose",
    page: ProposePage,
    isShowHeader: true,
  },
  {
    path: "/profile-user",
    page: ProfilePage,
    isShowHeader: true,
  },
  {
    path: "/system/admin",
    page: AdminPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
