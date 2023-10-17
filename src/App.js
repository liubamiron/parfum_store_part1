import React, {useEffect, useState} from "react";
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import {fetchCarts} from "./store/cartSlice";
import {useDispatch, useSelector} from "react-redux";

// ----------------------------------------------------------------------

export default function App() {

    const [partnerId, setPartnerId] = useState('');
    // const {status, error} = useSelector(state => state.carts);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCarts());
    }, [dispatch]);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router partnerId={partnerId} setPartnerId={setPartnerId} />
    </ThemeProvider>
  );
}
