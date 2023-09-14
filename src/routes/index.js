import HomePage from '../pages/HomePage';
import OrderPage from '../pages/OrderPage';
import ProductsPage from '../pages/ProductsPage';
import NotFoundPage from '../pages/NotFoundPage';
import TypeProductPage from '../pages/TypeProductPage';
import SignUpPage from '../pages/SignUpPage';
import SignInPage from '../pages/SignInPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import WebcamPage from '../pages/WebcamPage';

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true,
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true, 
    },
    {
        path: '/type',
        page: TypeProductPage,
        isShowHeader: true,
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: true,
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: true,
    },
    {
        path: '/product-details',
        page: ProductDetailsPage,
        isShowHeader: true,
    },
    {
        path: '/webcam',
        page: WebcamPage,
        isShowHeader: true,
    },
    {
        path: '*',
        page: NotFoundPage
    },
]