import React, {useState} from 'react';
// material
import {
  Grid,
  Typography,
  Checkbox,
  Stack,
  ListItemText,
  ListItem,
  ListItemIcon,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputBase, TableCell, Box, TextareaAutosize, InputAdornment,
  IconButton, Badge
} from "@mui/material";
import {Container, TablePagination, Toolbar} from '@mui/material';
// components
import Page from '../components/Page';
import Autocomplete from '@mui/material/Autocomplete';

import {getCatalog, getCookie} from '../utils/apiCalls';

import {useOutletContext} from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {useDispatch, useSelector} from 'react-redux';
import {addNewGood} from '../store/cartSlice'
import Iconify from "../components/Iconify";
import {styled} from "@mui/material/styles";

const RootStyle = styled('div')(({theme}) => ({
  zIndex: 999,
  cursor: 'pointer',
  alignItems: 'center',
  transition: theme.transitions.create('opacity'),
  '&:hover': {opacity: 0.72}
}));


export default function Goods() {
  const [catalog, setCatalog] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [sortType, setSortType] = React.useState('');

  const [openFilter, setOpenFilter] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [productsCategory, setProductsCategory] = useState([]);


  //redux
  const {status} = useSelector(state => state.carts);
  const dispatch = useDispatch();


//------------------

  if (catalog === "") (
      getCatalog()
          .then((data) => {
            console.log("target data", data);
            setCatalog(data);
            setProducts(data);
            setProductsCategory(data);

          })
          .catch((err_data) => {
            console.log("no data", err_data);
          })
  )

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [volumes, setVolumes] = useState('');

  const [goodsNr, setGoodsNr] = useState('')
  const [category, setCategory] = useState([]);
  const [goodsGroup, setGoodsGroup] = useState('');


  let receivedCategoryCodeCollection = [...new Set(productsCategory
      .filter(n => (n.goods_group_id === "02"))
      .map(n => n.goods_name))]

  let receivedCategoryCrema = [...new Set(productsCategory
      .filter(n => (n.goods_group_id === "03"))
      .map(n => n.goods_name))]

  let receivedCategoryMakeUp = [...new Set(productsCategory
      .filter(n => (n.goods_group_id === "04"))
      .map(n => n.goods_name))]


  // const [receivedVolumes, setReceivedVolumes] = useState([...new Set(products.map(n => n.goods_volume))]);


  const [inputVolume, setInputVolume] = useState(0);

  const onVolumesChange = e => setVolumes(e.target.value);

// .sort((a,b) => {return a.goods_volume < b.goods_volume ? -1 : 1;})

  const onGoodsNrChange = e => setGoodsNr(e.target.value);

  const onGoodsGroup = e => {
    let goodsGroupName = e.target.value;
    let goodsName = [...new Set(products
        .filter(n => n.goods_group_name === goodsGroupName)
        .map(n => n.goods_name))];

    setGoodsGroup(goodsGroupName);
    setCategory(goodsName);
  }

  // const onSortTypeChange = e => setSortType(e.target.value);
  const onSortTypeChange = e => setSortType(e.target.value);

  const filteredCategoryValues = ({target: {checked, value}}) => {
    setCategory((!category.includes(value) && checked)
        ? [...category, value]
        : category.filter(n => n !== value)
    );
  };

  let filteredGoods = products.filter(n => (
      (!volumes || n.goods_volume === volumes) &&
      (!goodsNr || n.goods_number === goodsNr) &&
      (!goodsGroup || n.goods_group_name === goodsGroup) &&
      (!category.length || category.includes(n.goods_name))
  ))
      .sort((a, b) => {
        if (sortType === 'asc') {
          return a.prices[0].price < b.prices[0].price ? -1 : 1;
        }
        if (sortType === 'desc') {
          return a.prices[0].price < b.prices[0].price ? 1 : -1;
        }
        if (sortType === 'ascPoints') {
          return a.goods_point < b.goods_point ? -1 : 1;
        }
        if (sortType === 'descPoints') {
          return a.goods_point < b.goods_point ? 1 : -1;
        }
        // else {
        //   return a.prices[0].price < b.prices[0].price ? 1 : -1;
        // }
      })
  let receivedFilteredVolumes = [...new Set(filteredGoods.map(n => n.goods_volume))];


  const array2 = receivedFilteredVolumes.filter(element => element !== '');
  console.log('aaray2', array2);
  const array3 = receivedFilteredVolumes.filter(element => element !== '')
      .sort(function(a, b) { return a - b; })



  // console.log('receivedFilteredVolumes', receivedFilteredVolumes, array3)

        // console.log(receivedFilteredVolumes.sort((a, b) => {
        //     return a.goods_volume < b.goods_volume ? -1 : 1;
        //   }))
  // let receivedFilteredVolumes = [...new Set(filteredGoods.sort((a,b) => {}).map(n => n.goods_volume))];

  let receivedGoodsFilteredNr = [...new Set(filteredGoods.map(n => n.goods_number))];

  //array for nr sort
  const arrayNrFiltered = receivedGoodsFilteredNr.filter(element => element !== '')
      .sort(function(a, b) { return a - b; })


  let receivedGoodsGroup = [...new Set(productsCategory.map(n => n.goods_group_name))]

  //Search list of objects from all array
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const searchList = Array.from(catalog).filter((catalogItem) => {
      return catalogItem.goods_name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // setSp(searchList);
    setProducts(searchList);
  }

  //search volume from all array
  // const [searchVolume, setSearchVolume] = useState();
  // const handleSearchVolume = (event) => {
  //   const query = event.target.value;
  //   setSearchVolume(query);
  //
  //   const searchListVolume = Array.from(catalog).filter((catalogItem) => {
  //     return catalogItem.goods_volume;
  //   });
  //   setProducts(searchListVolume);
  // }

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

  // let w =moment(this.state.dateselected, "MM-YYYY")
  // const [month, year] = `${partner.closed_data[0].closed_month}`.split("-");



  // const formData = new FormData();
  //
  // formData.append('username', 'username');
  // formData.append('password', 'password');
  //
  // console.log('formData', formData)

  return (
      <Page title="Товары">
        <div style={{ position: "relative"}}>
        <div className="sticky">
          <Grid container spacing={5}>
            <Grid item sm={3} xs={6}>
              <FormControl fullWidth variant="standard">
                <InputLabel id="demo-simple-select-standard-label">Сортировать по:</InputLabel>
                <Select
                    size={'medium'}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Цена"
                    onChange={onSortTypeChange}
                    value={sortType}
                >
                  <MenuItem value={'asc'}>Цена - по возрастанию</MenuItem>
                  <MenuItem value={'desc'}>Цена - по убыванию</MenuItem>
                  <MenuItem value={'ascPoints'}>Баллы - по возрастанию</MenuItem>
                  <MenuItem value={'descPoints'}>Баллы - по убыванию</MenuItem>

                </Select>
              </FormControl>
            </Grid>
            {/*<Grid item sm={1} xs={6}>*/}
            {/*  <FormControl fullWidth variant="standard">*/}
            {/*    <InputLabel id="demo-simple-select-standard-label">Объем</InputLabel>*/}
            {/*    <Select*/}
            {/*        size={'small'}*/}
            {/*        labelId="demo-simple-select-standard-label"*/}
            {/*        id="demo-simple-select-standard"*/}
            {/*        label="Объем"*/}
            {/*        onChange={onVolumesChange}*/}
            {/*        value={volumes == null ? '' : volumes}*/}
            {/*    >*/}
            {/*      <MenuItem value={""}>Сбросить</MenuItem>*/}
            {/*      {receivedFilteredVolumes.map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}*/}
            {/*    </Select>*/}
            {/*  </FormControl>*/}
            {/*</Grid>*/}
            <Grid item sm={2} xs={6}>
              <Autocomplete
                  size={'small'}
                  id="combo-box-demo"
                  options={array3}
                  onChange={(event, newVolume)=> {
                    setVolumes(newVolume)}}
                  renderInput={(params) =>
                      <TextField {...params} label="Объем" variant="standard" />}
              />
            </Grid>
            {/*<Grid item  sm={1} xs={6}>*/}
            {/*  <FormControl fullWidth variant="standard">*/}
            {/*    <InputLabel id="demo-simple-select-standard-label">Номер</InputLabel>*/}
            {/*    <Select*/}
            {/*        size={'small'}*/}
            {/*        labelId="demo-simple-select-standard-label"*/}
            {/*        id="demo-simple-select-standard"*/}
            {/*        label="Номер"*/}
            {/*        onChange={onGoodsNrChange}*/}
            {/*        value={goodsNr}*/}
            {/*    >*/}
            {/*      <MenuItem value={""}>Сбросить</MenuItem>*/}
            {/*      {receivedGoodsFilteredNr.map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}*/}
            {/*    </Select>*/}
            {/*  </FormControl>*/}
            {/*</Grid>*/}
            <Grid item  sm={2} xs={6}>
            <Autocomplete
                size={'small'}
                id="combo-box-demo"
                options={arrayNrFiltered}
                onChange={(event, newNr)=> {
                  setGoodsNr(newNr)}}
                renderInput={(params) =>
                    <TextField {...params} label="Номер" variant="standard" />}
            />
          </Grid>
            <Grid item sm={2} xs={6} className={'goods_no_desktop'}>
              <FormControl fullWidth variant="standard">
                <InputLabel id="demo-simple-select-standard-label">Категория</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label=" Категория"
                    onChange={onGoodsGroup}
                    value={goodsGroup}
                >
                  <MenuItem value={""}>Сбросить</MenuItem>
                  {receivedGoodsGroup.map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item  sm={2} xs={12}>
              <TextField
                  fullWidth
                  variant="standard"
                  className={"backgroundSearch"}
                  id="filled-search"
                  label="Название"
                  type="search"
                  value={searchQuery}
                  onChange={handleSearch}/>
              {/*<CssTextField label="Custom CSS" id="custom-css-outlined-input" />*/}
            </Grid>
          </Grid>

        </div>
        <br/>
        <Grid item sm={3} className="goods_no_mob" style={{
          padding: '10px',
          position: 'fixed',
          width: '350px',
          top:'120px',
          left: "20px",
          marginLeft: "270px",
          height: "80vh",
          overflow: "scroll",
        }}>
          <div style={{borderRight: '1px dashed rgba(145, 158, 171, 0.24)'}}>
            <ul style={{listStyle: 'none'}}>
              <li>
                <h4 style={{padding: '0 0 3px 0'}}>Парфюмерия</h4>
                <ul style={{listStyle: 'none'}}>
                  {receivedCategoryCodeCollection.map(n => (
                      <li key={n} style={{padding: '3px 0 7px 10px'}}>
                        <label className='size'>
                          <input
                              type='checkbox'
                              value={n}
                              checked={category.includes(n)}
                              onChange={filteredCategoryValues}
                          />
                          &nbsp;&nbsp;{n}
                        </label>
                      </li>
                  ))}
                </ul>
                <br/>
                <h4 style={{padding: '0 0 3px 0'}}>Макияж</h4>
                <ul style={{listStyle: 'none'}}>
                  {receivedCategoryMakeUp.map(n => (
                      <li key={n} style={{padding: '3px 0 7px 10px'}}>
                        <label className='size'>
                          <input
                              type='checkbox'
                              value={n}
                              checked={category.includes(n)}
                              onChange={filteredCategoryValues}
                          />
                          &nbsp;&nbsp;{n}
                        </label>
                      </li>
                  ))}
                </ul>
                <br/>
                <h4 style={{padding: '0 0 3px 0'}}>Уход за лицом</h4>
                <ul style={{listStyle: 'none'}}>
                  {receivedCategoryCrema.map(n => (
                      <li key={n} style={{padding: '3px 0 7px 10px'}}>
                        <label className='size'>
                          <input
                              type='checkbox'
                              value={n}
                              checked={category.includes(n)}
                              onChange={filteredCategoryValues}
                          />
                          &nbsp;&nbsp;{n}
                        </label>
                      </li>
                  ))}
                </ul>
                <br/>
              </li>
            </ul>
          </div>
        </Grid>

        <Grid container spacing={3}>

          {/*<Grid item sm={3} className="goods_no_mob">*/}
          {/*  <div style={{borderRight: '1px dashed rgba(145, 158, 171, 0.24)'}}>*/}
          {/*    <ul style={{listStyle: 'none'}}>*/}
          {/*      <li>*/}
          {/*        <h4 style={{padding: '0 0 3px 0'}}>Парфюмерия</h4>*/}
          {/*        <ul style={{listStyle: 'none'}}>*/}
          {/*          {receivedCategoryCodeCollection.map(n => (*/}
          {/*              <li key={n} style={{padding: '3px 0 7px 10px'}}>*/}
          {/*                <label className='size'>*/}
          {/*                  <input*/}
          {/*                      type='checkbox'*/}
          {/*                      value={n}*/}
          {/*                      checked={category.includes(n)}*/}
          {/*                      onChange={filteredCategoryValues}*/}
          {/*                  />*/}
          {/*                  &nbsp;&nbsp;{n}*/}
          {/*                </label>*/}
          {/*              </li>*/}
          {/*          ))}*/}
          {/*        </ul>*/}
          {/*        <br/>*/}
          {/*        <h4 style={{padding: '0 0 3px 0'}}>Макияж</h4>*/}
          {/*        <ul style={{listStyle: 'none'}}>*/}
          {/*          {receivedCategoryMakeUp.map(n => (*/}
          {/*              <li key={n} style={{padding: '3px 0 7px 10px'}}>*/}
          {/*                <label className='size'>*/}
          {/*                  <input*/}
          {/*                      type='checkbox'*/}
          {/*                      value={n}*/}
          {/*                      checked={category.includes(n)}*/}
          {/*                      onChange={filteredCategoryValues}*/}
          {/*                  />*/}
          {/*                  &nbsp;&nbsp;{n}*/}
          {/*                </label>*/}
          {/*              </li>*/}
          {/*          ))}*/}
          {/*        </ul>*/}
          {/*        <br/>*/}
          {/*        <h4 style={{padding: '0 0 3px 0'}}>Уход за лицом</h4>*/}
          {/*        <ul style={{listStyle: 'none'}}>*/}
          {/*          {receivedCategoryCrema.map(n => (*/}
          {/*              <li key={n} style={{padding: '3px 0 7px 10px'}}>*/}
          {/*                <label className='size'>*/}
          {/*                  <input*/}
          {/*                      type='checkbox'*/}
          {/*                      value={n}*/}
          {/*                      checked={category.includes(n)}*/}
          {/*                      onChange={filteredCategoryValues}*/}
          {/*                  />*/}
          {/*                  &nbsp;&nbsp;{n}*/}
          {/*                </label>*/}
          {/*              </li>*/}
          {/*          ))}*/}
          {/*        </ul>*/}
          {/*        <br/>*/}
          {/*      </li>*/}
          {/*    </ul>*/}
          {/*  </div>*/}
          {/*</Grid>*/}
          <Grid item className="goods_mob_category" sm={9} xs={12} style={{marginLeft: "350px"}}>
          {/*<Grid item className="goods_mob_category" sm={9} xs={12}>*/}
            <TableContainer>
              <Table sx={{minWidth: 550}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Название</TableCell>
                    <TableCell align="right">Номер</TableCell>
                    <TableCell align="right">Объем</TableCell>
                    <TableCell align="right">Баллы</TableCell>
                    <TableCell align="right">Цена<br/>{country}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredGoods
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((product) => (
                          <TableRow
                              key={product._id}
                              sx={{'&:last-child td, &:last-child th': {border: 0}}}
                          >
                            <TableCell component="th" scope="row">
                              {product.goods_name}
                            </TableCell>
                            <TableCell align="right">{product.goods_number}</TableCell>
                            <TableCell align="right">{product.goods_volume}</TableCell>
                            <TableCell align="right">{product.goods_point}</TableCell>
                            <TableCell align="right">{product.prices[0].price}</TableCell>
                            <TableCell align="right">
                              {/*<button type='button'*/}
                              {/*        className={'add_to_cart_btn'}*/}
                              {/*        onClick={() => dispatch(addNewGood({product}))}*/}
                              {/*        // onClick={() => dispatch(addNewGood2({product}))}*/}
                              {/*>*/}
                                {/*<Iconify icon="eva:shopping-cart-fill" width={24} height={24} color="#637381"/>*/}
                              {/*</button>*/}
                                <IconButton
                                    onClick={() => dispatch(addNewGood({product}))}
                                    sx={{width: 40, height: 40}}>
                                <RootStyle>
                                    <Iconify icon="eva:shopping-cart-fill" width={24} height={24} color="#637381"/>
                                </RootStyle>
                                </IconButton>
                              {/*  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"*/}
                              {/*     aria-hidden="true" role="img"*/}
                              {/*     className="MuiBox-root css-1kj4kj3 iconify iconify--eva" sx="[object Object]"*/}
                              {/*     width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">*/}
                              {/*  <g id="iconifyReact87">*/}
                              {/*    <g id="iconifyReact88">*/}
                              {/*      <g id="iconifyReact89" fill="currentColor">*/}
                              {/*        <path*/}
                              {/*            d="M21.08 7a2 2 0 0 0-1.7-1H6.58L6 3.74A1 1 0 0 0 5 3H3a1 1 0 0 0 0 2h1.24L7 15.26A1 1 0 0 0 8 16h9a1 1 0 0 0 .89-.55l3.28-6.56A2 2 0 0 0 21.08 7Z"></path>*/}
                              {/*        <circle cx="7.5" cy="19.5" r="1.5"></circle>*/}
                              {/*        <circle cx="17.5" cy="19.5" r="1.5"></circle>*/}
                              {/*      </g>*/}
                              {/*    </g>*/}
                              {/*  </g>*/}
                              {/*</svg>*/}
                              {/* <g id = 'iconifyReact131'></g>*/}
                              {/*</button>*/}
                            </TableCell>
                          </TableRow>
                      ))}
                </TableBody>
              </Table>
              <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50, 100]}
                  component="div"
                  count={filteredGoods.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
            {status === 'loading' && <h2>Loading ...</h2>}
            <br/>
          </Grid>
        </Grid>
        </div>
      </Page>
  );
}

