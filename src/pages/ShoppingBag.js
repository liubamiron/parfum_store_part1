import {useEffect, useState} from 'react';
// material
import {
  Container,
  TableCell,
  Typography
} from '@mui/material';
// components
import Page from '../components/Page';
import {getCookie} from "../utils/apiCalls";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {useOutletContext} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {decrementGoods, deleteGoods, fetchCarts, incrementGoods} from "../store/cartSlice";
import React from "react";
// ----------------------------------------------------------------------

export default function ShoppingBag() {

  const [shoppingGoods, setShoppingGoods] = useState([]);
  const [productsCart, setProductsCart] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [isActive, setIsActive] = useState(true);

  const [partner] = useOutletContext();

  let country = `${partner.country}`.toString().slice(1);
  if (country === '01') {country = 'MDL'}if (country === '02') {country = 'UAH'}if (country === '03') {country = 'RUB'}if (country === '04') {country = 'BYN'}
  if (country === '05') {country = 'KZT'} if (country === '06') {country = 'UZS'}if (country === '07') {country = 'TJS'}
  if (country === '08') {country = 'RON'}if (country === '09') {country = 'EUR'}if (country === '10') {country = 'EUR'}
  if (country === '11') {country = 'SIT'}if (country === '12') {country = 'TRY'}if (country === '13') {country = 'AUD'}if (country === '14') {country = 'EUR'}
  if (country === '15') {country = 'GBP'}if (country === '16') {country = 'KGS'}if (country === '17') {country = 'GEL'}if (country === '18') {country = 'NIS'}
  if (country === '19') {country = 'EUR'}if (country === '20') {country = 'EUR'}if (country === '21') {country = 'EUR'}if (country === '22') {country = 'GBP'}
  if (country === '23') {country = 'EUR'}if (country === '24') {country = 'EUR'}if (country === '25') {country = 'CZK'}if (country === '26') {country = 'EUR'}
  if (country === '27') {country = 'PLZ'}if (country === '28') {country = 'CHF'}


  const dispatch = useDispatch()

  let x = getCookie('Authorization')
  const headers = {'Access-Control-Allow-Credentials': true, 'Authorization': x, 'Content-type': 'application/json; charset=UTF-8'}

  useEffect(() => {
    dispatch(fetchCarts());
  }, [dispatch]);

  const carts = useSelector(state => state.carts.carts);
  const cartsItems = carts.items

  console.log("cartsItems", cartsItems)

  // create order from cart
  const createFromCart =(productsCart) => {
    const data = JSON.stringify(productsCart)
    axios.post('https://giterbackend.azurewebsites.net/api/order/create-from-cart/', data, {headers:headers})
        .then(res=>{
          if(res){
            setShoppingGoods([])
            setOrderSuccess('Заказ выполнен !')
            setIsActive(current => !current);
            // setShoppingGoods([...shoppingGoods].splice(0,shoppingGoods.length))
          }else{
            console.log('order error');
          }
        })
    setShoppingGoods([]);
  }

  const [total, setTotal] = useState(0);
  const [totalPoint, setTotalPoint] = useState('');

  useEffect(() => {
    let sum = cartsItems.reduce(
        (total, { count }) => count + total,
        0
    );
    setTotal(sum);
  }, [cartsItems]);

  useEffect(() => {
    const cartItemsCopy = [...cartsItems]
    let allPoints = cartItemsCopy.reduce(
        // (total, { count, total_point }) => count * total_point + total, 0
        (total, { total_point }) => (total_point * 10 + total*10)/10, 0
    );
    setTotalPoint(allPoints);
  }, [cartsItems]);

  return (
    <Page title="Корзина">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Корзина
        </Typography>
        <>
          <TableContainer>
            <Table sx={{minWidth: 550}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Название</TableCell>
                  <TableCell align="right">Объем</TableCell>
                  <TableCell align="right">
                      Баллы
                  </TableCell>
                  <TableCell align="right">
                      Цена / {country}
                  </TableCell>
                  <TableCell align="right">Количество</TableCell>
                  <TableCell align="right">&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartsItems?.map((product) => (
                        <TableRow
                            key={product.item_c_code}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                          <TableCell component="th" scope="row">
                            {product.name.split(',')[0]}
                          </TableCell>
                          <TableCell align="right">{product.name.split(',')[1]}</TableCell>
                          {/*<TableCell align="right">{(parseInt((product.total_point * product.count)*100))/100}</TableCell>*/}
                          <TableCell align="right">{product.total_point}</TableCell>
                          <TableCell align="right">{product.total}</TableCell>
                          <TableCell align="right">
                            <button
                                type='button'
                                className={'shoppingcart_btn'}
                                onClick={() => dispatch(incrementGoods(product))}
                            >+
                            </button><span style={{padding:'5px'}}>{product.count}</span>
                            <button
                                type='button'
                                disabled={product.count === 1}
                                className={(product?.count === 1) ? 'disable_shoppingcart_btn' : 'shoppingcart_btn'}
                                onClick={() => dispatch(decrementGoods(product))}
                            >-
                            </button>
                          </TableCell>
                          <TableCell align="right">
                            <button
                                type='button'
                                className={'add_to_cart_btn'}
                                onClick={() => dispatch(deleteGoods(product))}
                            >Удалить
                            </button>
                          </TableCell>
                        </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/*<div>Всего товаров : {carts.count} </div>*/}
          <div>Всего баллов : {totalPoint} </div>
          <div>Общая стоимость : {carts.total} </div>
          <br/>
          {cartsItems.length >=1 && <button
              type='button'
              className={isActive ? 'add_to_cart_btn' : 'disable_btn'}
              onClick={() => createFromCart(productsCart)}
          >Оплатить</button> }
          <div>{orderSuccess}</div>
        </>
      </Container>
    </Page>
  );
}

