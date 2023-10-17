
import {useState, useRef, useEffect} from 'react';
// @mui
import {
    Box,
    Badge,
    Button,
    Divider,
    IconButton,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';

import React from 'react';
import {Link} from 'react-router-dom';
import {styled} from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import {useSelector} from "react-redux";

// const productPrice = productPrice.reduce(getSum, 0);
// function getSum(total, num) {
//     return total+ num;
// }

const RootStyle = styled('div')(({theme}) => ({
    zIndex: 999,
    cursor: 'pointer',
    alignItems: 'center',
    transition: theme.transitions.create('opacity'),
    '&:hover': {opacity: 0.72}
}));


export default function CartPopover() {

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);

    const carts = useSelector(state => state.carts.carts);
    const cartsItems = carts.items

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }
    const [total, setTotal] = useState(0);
    const [totalPoint, setTotalPoint] = useState(0);

//number of items in cart
    useEffect(() => {
        let summ = [...cartsItems].reduce(
            (total, { count }) => count + total,
            0
        );
        setTotal(summ);
    }, [cartsItems]);

// sum of items points
    useEffect(() => {
        const cartItemsCopy = [...cartsItems]
        let sumPoints = cartItemsCopy.reduce(
            (total, { total_point }) => (total_point * 10 + total*10)/10, 0
        );
        setTotalPoint(sumPoints);
    }, [cartsItems]);

    return (
        <>
            <IconButton
                ref={anchorRef}
                color={open ? 'primary' : 'default'}
                onClick={handleOpen}
                sx={{width: 40, height: 40}}
            >
                <RootStyle>
                    <Badge badgeContent={total}  color="error">
                        <Iconify icon="eva:shopping-cart-fill" width={24} height={24} color="#637381"/>
                    </Badge>
                </RootStyle>
            </IconButton>
            <MenuPopover
                open={open}
                onClose={handleClose}
                anchorEl={anchorRef.current}
                sx={{width: 380, p: 0, mt: 1.5, ml: 0.75, backgroundColor: 'white'}}
            >
                <TableContainer component={Paper}>
                    <Scrollbar sx={{height: {xs: 340, sm: 360}}}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right">Кол.</TableCell>
                                    <TableCell align="right">Цена</TableCell>
                                    <TableCell align="right">Баллы</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartsItems?.map((item) => (
                                    <TableRow
                                        key={item.item_c_code}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell align="left">
                                            <span style={{fontWeight: 'inherit'}}>{item.name.split(',')[0]}<br/>
                                            Объем: {item.name.split(',')[1]}</span>
                                        </TableCell>
                                        <TableCell align="left">{item.count}</TableCell>
                                        {/*<TableCell align="left">{item.price * item.count}</TableCell>*/}
                                        <TableCell align="left">{item.total}</TableCell>
                                        {/*<TableCell align="left">{(parseInt((item.point * item.count)*100))/100}</TableCell>*/}
                                        <TableCell align="left">{item.total_point}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Scrollbar>
                </TableContainer>
                <Divider sx={{borderStyle: 'dashed'}}/>
                <Box sx={{p: 1}}>
                    <p className={'col'} style={{textAlign: 'left'}}>
                        <span
                            style={{fontWeight: 'bolder', fontSize: '14px'}}>Общая стоимость : {carts.total}</span>
                    </p>
                    <p className={'col'} style={{textAlign: 'left'}}>
                        <span
                            style={{fontWeight: 'bolder', fontSize: '14px'}}>Сумма баллов : {totalPoint}</span>
                    </p>
                    <p className={'col'} style={{textAlign: 'left'}}>
                        <span style={{fontWeight: 'bolder', fontSize: '14px'}}>Всего товаров : {total} </span>
                    </p>
                    <Button sx={{ mx: 'auto', width: '100%' }} variant="contained" style={{backgroundColor: '#2065d114'}}>
                        <Link to="/shopping-bag" style={{textAlign: 'center'}}>Перейти в корзину</Link>
                    </Button>
                </Box>
            </MenuPopover>
        </>
    );
}
