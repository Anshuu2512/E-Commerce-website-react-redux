import './App.css';
import { Provider } from 'react-redux';
import store from './Component/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';
import Home from './Component/Home';
import Cart from './Component/Cart';
import WishList from './Component/WishList';
// import Login from './sigInPage';
import SingleProduct from './Component/SingleProduct';
import ConfirmPage from './Component/confirmpage';
import Address from './Component/Address';
import Payment from './Component/Payment';

export default function App() {
  // const { isAuthenticated, isLoading } = useAuth0();

  // if (isLoading) return <div>Loading...</div>;

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          {/* Protect these routes */}
          <Route path="/" element={ <Home /> } />
          <Route path="/cart" element={ <Cart /> } />
          <Route path="/wishlist" element={ <WishList /> } />
          <Route path="/product/:id" element={ <SingleProduct />} />
          <Route path="/confirmpage" element={<ConfirmPage />} />
          <Route path="/addressPage" element={<Address /> } />
          <Route path="/paymentPage" element={ <Payment /> } />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
