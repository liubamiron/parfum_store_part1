import React, {useEffect, useState} from "react";
import {getNetworkById} from "../utils/apiCalls";
import {
    Card,
    Stack,
    Container,
    Grid, Typography, TableCell,
} from '@mui/material';
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {Link, useParams} from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";




const MyNetworksItem = () => {
    const params = useParams()
    const [networkByIdItems, setNetworkByIdItems] = useState([]);
    const [networkById, setNetworkById] = useState("");
    // const [fdata, setFData] = useState([])

    useEffect(() => {
        getNetworkById(params.id)
            .then((data) => {
                setNetworkById(data);
                setNetworkByIdItems(data?.network);
            })
            .catch((err_data) => {
                console.log("no data", err_data);
            })
    }, []);


    return(
        <Page>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    {/*<Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>*/}
                    {/*  New User*/}
                    {/*</Button>*/}
                    <Typography variant="h6" gutterBottom>
                        <Link to='/network' style={{textDecoration: 'none'}}>
                            <div className={'col'} style={{textAlign: "left", paddingTop: '10px', color: '#2065d1'}}>
                            <span className={"material-symbols-outlined icon_arrow-back"}>arrow_back</span>
                            &nbsp; Моя сеть
                        </div></Link>
                    </Typography>
                </Stack>
                <br/>
                <Card>
                    <Grid container style={{textAlign: 'center'}}>
                        <Grid item sm={2} xs={12} >
                            <Grid container>
                                <Grid item xs={6} sm={12}>
                                    <div className={"grid_network_item"}>ЛРН</div>
                                </Grid>
                                <Grid item xs={6} sm={12}>
                                    <div className={"grid_network_item_parameter"}>{networkById._id}</div>
                                </Grid>
                            </Grid>
                        </Grid>
                            <Grid item sm={2} xs={12} >
                                <Grid container>
                            <Grid item xs={6} sm={12}>
                                <div className={"grid_network_item"}>ФИО</div>
                            </Grid>
                            <Grid item xs={6} sm={12}>
                                <div className={"grid_network_item_parameter"}>{networkById.name}</div>
                            </Grid>
                                </Grid>
                            </Grid>
                        <Grid item sm={2} xs={12}>
                            <Grid container>
                                <Grid item xs={6} sm={12}>
                                    <div className={"grid_network_item"}>ЛО</div>
                                </Grid>
                                <Grid item xs={6} sm={12}>
                                    <div className={"grid_network_item_parameter"}>{networkById.lo}</div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sm={2} xs={12}>
                            <Grid container>
                                <Grid item xs={6} sm={12}>
                                    <div className={"grid_network_item"}>ГО</div>
                                </Grid>
                                <Grid item xs={6} sm={12}>
                                    <div className={"grid_network_item_parameter"}>{networkById.go}</div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sm={2} xs={12}>
                            <Grid container>
                                <Grid item xs={6} sm={12}>
                                    <div className={"grid_network_item"}>НГО</div>
                                </Grid>
                                <Grid item xs={6} sm={12}>
                                    <div className={"grid_network_item_parameter"}>{networkById.ngo}</div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sm={2} xs={12}>
                            <Grid container>
                                <Grid item xs={6} sm={12}>
                                    <div className={"grid_network_item"}>ОЛГ</div>
                                </Grid>
                                <Grid item xs={6} sm={12}>
                                    <div className={"grid_network_item_parameter"}>{networkById.olg}</div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
                <br/>
                <br/>
                Сеть - {networkByIdItems.length}
                <br/>
                {networkByIdItems.length > 0 &&
                <Card>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">ЛРН</TableCell>
                                        <TableCell align="right">ФИО</TableCell>
                                        <TableCell align="right">Ранг</TableCell>
                                        <TableCell align="right">Дата создания</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {networkByIdItems
                                        .map((item) => (
                                            <TableRow
                                                hover
                                                key={item._id}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            >
                                                <TableCell align="right">{item._id}</TableCell>
                                                <TableCell align="right">{item.name}</TableCell>
                                                <TableCell align="right">{item.rank}</TableCell>
                                                <TableCell align="right"> {item.signed !== null && item.signed.split('T')[0]}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                </Card>}
            </Container>
        </Page>
    )}
export default MyNetworksItem;