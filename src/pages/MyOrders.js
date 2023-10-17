

import React, {useEffect, useState} from 'react';

// material
import {
    Card,
    Table,
    Stack,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
    TableSortLabel,
} from '@mui/material';

// components
import Page from '../components/Page';

import Scrollbar from '../components/Scrollbar';


import {getAllMyOrders} from "../utils/ClientApi";

import TableHead from "@mui/material/TableHead";
import {useNavigate} from 'react-router-dom';




export default function User() {
    const [page, setPage] = useState(0);

    const [active, setActive] = useState("");

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [orders, setOrders] = useState([]);

    const [orderDirection, setOrderDirection] = useState("asc");

    const navigate = useNavigate();

    // if (orders == "") (
    useEffect(() => {
        getAllMyOrders()
            .then((data) => {
                setOrders(data?.orders)
            })
            .catch((err_data) => {
                console.log("no data", err_data);
            })
    }, []);

    const handleSortRequestPriceTotal = (event) => {
        setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
        setOrders(sortArrayTotal(orderDirection));
        setActive(event.target.id);
    }

    const sortArrayTotal = (orderDirection) => {
        if (orderDirection === "desc") {
            return [...orders].sort((a, b) =>
                a.total < b.total ? 1 : b.total < a.total ? -1 : 0
            );
        } else {
            return [...orders].sort((a, b) =>
                a.total > b.total ? 1 : b.total > a.total ? -1 : 0
            );
        }
    };

    const handleSortRequestData = (event) => {
        setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
        setOrders(sortArrayDataUpdate(orderDirection));
        setActive(event.target.id)
    }

    const sortArrayDataUpdate = (orderDirection) => {
        if (orderDirection === "desc") {
            return [...orders].sort((a, b) =>
                a.created_date < b.created_date ? 1 : b.created_date < a.created_date ? -1 : 0
            );
        } else {
            return [...orders].sort((a, b) =>
                a.created_date > b.created_date ? 1 : b.created_date > a.created_date ? -1 : 0
            );
        }
    };

    const handleSortRequestStatus = (event) => {
        setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
        setOrders(sortArrayStatus(orderDirection));
        setActive(event.target.id)
    }

    const sortArrayStatus = (orderDirection) => {
        if (orderDirection === "desc") {
            return [...orders].sort((a, b) =>
                a.status < b.status ? 1 : b.status < a.status ? -1 : 0
            );
        } else {
            return [...orders].sort((a, b) =>
                a.status > b.status ? 1 : b.status > a.status ? -1 : 0
            );
        }
    };

    const handleSortRequestCount = (event) => {
        setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
        setOrders(sortArrayCount(orderDirection));
        setActive(event.target.id)
    }

    const sortArrayCount = (orderDirection) => {
        if (orderDirection === "desc") {
            return [...orders].sort((a, b) =>
                a.item_count < b.item_count ? 1 : b.item_count < a.item_count ? -1 : 0
            );
        } else {
            return [...orders].sort((a, b) =>
                a.item_count > b.item_count ? 1 : b.item_count > a.item_count ? -1 : 0
            );
        }
    };

    const handleSortRequestUpdateDate = (event) => {
        setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
        setOrders(sortArrayUpdate(orderDirection));
        setActive(event.target.id)
    }

    const sortArrayUpdate = (orderDirection) => {
        switch (orderDirection) {
            case "asc":
            default:
                return [...orders].sort((a, b) =>
                    a.update_date > b.update_date ? 1 : b.update_date > a.update_date ? -1 : 0
                );
            case "desc":
                return [...orders].sort((a, b) =>
                    a.update_date < b.update_date ? 1 : b.update_date < a.update_date ? -1 : 0
                );
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Page title="Мои заказы">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Мои заказы
                    </Typography>
                </Stack>

                <Card>
                    <Scrollbar>
                        <TableContainer sx={{minWidth: 800}}>
                            <Table aria-label="simple table" className={"my_orders_table"}>
                                <TableHead>
                                    <TableRow>

                                        <TableCell
                                            key={1}
                                            id={'1'}
                                            onClick={handleSortRequestData}
                                            align="right">
                                            <TableSortLabel
                                                key={1}
                                                id={'1'}
                                                active={active === "1"}
                                                direction={orderDirection}>
                                                Дата создания
                                            </TableSortLabel>
                                            <span className="material-symbols-outlined" style={{top: "4px", position: "relative", fontSize: "1em"}}>unfold_more</span>
                                        </TableCell>
                                        <TableCell
                                            key={2}
                                            id={'2'}
                                            onClick={handleSortRequestCount}
                                            align="right">
                                            <TableSortLabel
                                                key={2}
                                                id={'2'}
                                                active={active === "2"}
                                                direction={orderDirection}>
                                                Количество товаров</TableSortLabel>
                                            <span className="material-symbols-outlined" style={{top: "4px", position: "relative", fontSize: "1em"}}>unfold_more</span>
                                        </TableCell>
                                        <TableCell
                                            key={3}
                                            id={'3'}
                                            onClick={handleSortRequestPriceTotal}
                                            align="right">
                                            <TableSortLabel
                                                key={3}
                                                id={'3'}
                                                active={active === "3"}
                                                direction={orderDirection}>
                                                Сумма</TableSortLabel>
                                            <span className="material-symbols-outlined" style={{top: "4px", position: "relative", fontSize: "1em"}}>unfold_more</span>
                                        </TableCell>
                                        <TableCell
                                            key={4}
                                            id={'4'}
                                            onClick={handleSortRequestStatus}
                                            align="right">
                                            <TableSortLabel
                                                key={4}
                                                id={'4'}
                                                active={active === "4"}
                                                direction={orderDirection}>
                                                Статус</TableSortLabel>
                                            <span className="material-symbols-outlined" style={{top: "4px", position: "relative", fontSize: "1em"}}>unfold_more</span>
                                        </TableCell>
                                        <TableCell
                                            key={5}
                                            id={'5'}
                                            onClick={handleSortRequestUpdateDate}
                                            align="right">
                                            <TableSortLabel
                                                key={5}
                                                id={'5'}
                                                active={active === "5" ? true : false}
                                                direction={orderDirection}>
                                                Дата обновления</TableSortLabel>
                                            <span className="material-symbols-outlined" style={{top: "4px", position: "relative", fontSize: "1em"}}>unfold_more</span>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((item) => (
                                            <TableRow
                                                hover
                                                key={item.id}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                onClick={() => navigate(`${item.id}`)}
                                            >
                                                <TableCell align="right">{item.created_date.split('T')[0]}</TableCell>
                                                <TableCell align="right">{item.item_count}</TableCell>
                                                <TableCell align="right">{item.total}</TableCell>
                                                <TableCell align="right">{item.status}</TableCell>
                                                <TableCell
                                                    align="right"> {item.update_date !== null && item.update_date.split('T')[0]}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={orders.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </Scrollbar>
                </Card>
            </Container>
        </Page>
    );
}
