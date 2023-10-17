import React, {useEffect, useState} from "react";
import {useOutletContext, useParams} from 'react-router-dom'
import {getOrderById} from "../utils/ClientApi";
import {getCookie, getShoppingGoods} from "../utils/apiCalls";
import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
} from '@mui/material';
import TableHead from "@mui/material/TableHead";
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import axios from "axios";




const MyOrdersItem = () => {
    const params = useParams()
    const [orderByIdItems, setOrderByIdItems] = useState([]);
    const [orderById, setOrderById] = useState("");
    const [deleteSuccess, setDeleteSuccess] = useState(null);

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



    let x = getCookie('Authorization')
    const headers = {'Access-Control-Allow-Credentials': true, 'Authorization': x, 'Content-type': 'application/json; charset=UTF-8'}


    useEffect(() => {
            getOrderById(params.id)
                .then((data) => {
                    setOrderById(data);
                    setOrderByIdItems(data?.items);
                })
                .catch((err_data) => {
                    console.log("no data", err_data);
                })
    }, []);


    console.log('data', orderById, orderByIdItems)

    const deleteOrderById =(orderById) => {
        const data = JSON.stringify(orderById)
        axios.post('https://giterbackend.azurewebsites.net/api/order/cancel/' + `${params.id}` + '/', data, {headers:headers})
            .then(res=>{
                if(res){
                    setOrderByIdItems([])
                    setDeleteSuccess('Заказ удален !')
                }else{
                    console.log('order error');
                }
            })
        setOrderByIdItems([]);
    }

    const status = `${orderById.status}`

    return(
        <Page>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    {/*<Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>*/}
                    {/*  New User*/}
                    {/*</Button>*/}
                </Stack>
                <div> Заказ Nr. - {orderById._id}</div>
              <br/>
                <Card>
                    <Scrollbar>
                        <TableContainer sx={{minWidth: 800}}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Название</TableCell>
                                        <TableCell align="right">Объем</TableCell>
                                        <TableCell align="right">Баллы</TableCell>
                                        <TableCell align="right">Цена/{country}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderByIdItems.map((item) => (
                                            <TableRow
                                                key={item.item_c_code}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            >
                                                <TableCell align="right">{item.name.split(',')[0]}</TableCell>
                                                <TableCell align="right">{item.name.split(',')[1]}</TableCell>
                                                <TableCell align="right">{item.point}</TableCell>
                                                <TableCell align="right">{item.price}</TableCell>
                                                {/*<TableCell align="right">{item.update_date.split('T')[0]}</TableCell>*/}
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                </Card>
                <br/>
                {orderByIdItems.length >=1 &&
                    <>
                <div>Всего баллов : {orderById.orders_total_point} </div>
                    <div style={{fontWeight: "bolder"}}>Общая стоимость : {orderById.orders_total}&nbsp;{country} </div>
                        <br/>
                        <div> Дата создания - {orderById.created_date.split('T')[0]}</div>
                        <div> Дата обновления - {orderById.update_date !== null && orderById.update_date.split('T')[0]}</div>

                        <div>Оплата онлайн - {orderById.paid_online}</div>
                        <div>Cкидка - {orderById.discount}</div>
                        <div>Номер склада - {orderById.warehouse_id}</div>
                        <div>Тотал склада - {orderById.warehouse_total}</div>
                        <div>Ссылка для оплаты - {orderById.payment_link}</div>
                        <br/>
                        <div style={{fontWeight: "bold"}}>Статус - {orderById.status}</div>
                        <br/>

                        {status === "new" && <button
                            type='button'
                            className={'add_to_cart_btn'}
                            onClick={() => deleteOrderById(orderById)}
                        >Удалить</button>}
                    </>
                }

                {/*{status === "cancel" && <div style={{color: "red"}}>Удален</div> }*/}
                <div>{deleteSuccess}</div>
                <br/>
            </Container>
</Page>
    )}
export default MyOrdersItem;