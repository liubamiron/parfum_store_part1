import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import React, { useState } from 'react';
import {Link as RouterLink} from 'react-router-dom';
// material
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
  TablePagination, TableSortLabel,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

import { getNetwork } from '../utils/apiCalls'
import TableHead from "@mui/material/TableHead";
import {useNavigate} from 'react-router-dom';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID/ЛРН', alignRight: false },
  { id: 'name', label: 'Name/ФИО', alignRight: false },
  { id: 'Rank', label: 'Rank/Ранг', alignRight: false },
  { id: 'Signed', label: 'Signed/Дата подписания', alignRight: false },
  // { id: 'status', label: 'Status', alignRight: false },
  // { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// function applySortFilter(array, comparator, query) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   if (query) {
//     return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//   }
//   return stabilizedThis.map((el) => el[0]);
// }



// worked filter only bu name
function applySortFilter(network, comparator) {

  const stabilizedThis = Array.from(network).map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0)
      return order;
  });
  return stabilizedThis.map((el) => el[0]);
}



export default function MyNetwork() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [network, setNetwork] = useState("");

  const [networkForSort, setNetworkForSort] = useState([]);

  const navigate = useNavigate();
  
  if (network === "") (
    getNetwork()
    .then((data) => {
      console.log("network data", data);
      setNetwork(data)
      setNetworkForSort(data)
    })
    .catch((err_data) => {
      console.log("no data", err_data);
      // TODO: Make allert!
    })
  )


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERLIST.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = Array.from(network).map((n) => n.name);
      setSelected(newSelecteds);

      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
    console.log("newSelecteds",selected )
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - network.length) : 0;

  // const filteredUsers = applySortFilter(network, getComparator(order, orderBy));

  ///my version/// networkForSort []/
  const [orderDirection, setOrderDirection] = useState("asc");

  const [active, setActive] = useState("");

  //



  ///
  const handleSortRequestRank = (event) => {
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    setNetworkForSort(sortArrayRank(orderDirection));
    setActive(event.target.id);
  }

  const sortArrayRank = (orderDirection) => {
    if (orderDirection === "desc") {
      return [...networkForSort].sort((a, b) =>
          a.rank < b.rank ? 1 : b.rank < a.rank ? -1 : 0
      );
    } else {
      return [...networkForSort].sort((a, b) =>
          a.rank > b.rank ? 1 : b.rank > a.rank ? -1 : 0
      );
    }
  };

  const handleSortRequestName = (event) => {
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    setNetworkForSort(sortArrayName(orderDirection));
    setActive(event.target.id);
  }

  const sortArrayName = (orderDirection) => {
    if (orderDirection === "desc") {
      return [...networkForSort].sort((a, b) =>
          a.name < b.name ? 1 : b.name < a.name ? -1 : 0
      );
    } else {
      return [...networkForSort].sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
    }
  };

  const handleSortRequestId = (event) => {
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    setNetworkForSort(sortArrayId(orderDirection));
    setActive(event.target.id);
  }

  const sortArrayId = (orderDirection) => {
    if (orderDirection === "desc") {
      return [...networkForSort].sort((a, b) =>
          a._id < b._id ? 1 : b._id < a._id ? -1 : 0
      );
    } else {
      return [...networkForSort].sort((a, b) =>
          a._id > b._id ? 1 : b._id > a._id ? -1 : 0
      );
    }
  };

  const handleSortRequestDataSigned = (event) => {
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    setNetworkForSort(sortArrayDataSigned(orderDirection));
    setActive(event.target.id);
  }

  const sortArrayDataSigned = (orderDirection) => {
    if (orderDirection === "desc") {
      return [...networkForSort].sort((a, b) =>
          a.signed < b.signed ? 1 : b.signed < a.signed ? -1 : 0
      );
    } else {
      return [...networkForSort].sort((a, b) =>
          a.signed > b.signed ? 1 : b.signed > a.signed ? -1 : 0
      );
    }
  };


  //end version2////

  const isUserNotFound = networkForSort.length === 0;

  if (!networkForSort){
    return(
      <></>
    )
  }
  else {
    return (
      <Page title="Моя сеть">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              МОЯ СЕТЬ
              <div style={{fontWeight: 'bolder', fontSize: "14px"}}>данные текущего месяца</div>
            </Typography>
            {/*<Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>*/}
            {/*  New User*/}
            {/*</Button>*/}
          </Stack>

          {/*<Card>*/}
          {/*   /!*<UserListToolbar numSelected={selected.length} filterName={name} onFilterName={handleFilterByName} />*!/*/}
          {/*  <Scrollbar>*/}
          {/*    <TableContainer sx={{ minWidth: 800 }}>*/}
          {/*      <Table>*/}
          {/*        <UserListHead*/}
          {/*          order={order}*/}
          {/*          orderBy={orderBy}*/}
          {/*          headLabel={TABLE_HEAD}*/}
          {/*          rowCount={network.length}*/}
          {/*          numSelected={selected.length}*/}
          {/*          onRequestSort={handleRequestSort}*/}
          {/*          onSelectAllClick={handleSelectAllClick}*/}
          {/*        />*/}
          {/*        <TableBody>*/}
          {/*          {Array.from(network).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {*/}
          {/*          /!*{filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {*!/*/}
          {/*            const { _id, name, rank, signed } = row;*/}
          {/*            const isItemSelected = selected.indexOf(name) !== -1;*/}

          {/*            return (*/}
          {/*              <TableRow*/}
          {/*                hover*/}
          {/*                key={_id}*/}
          {/*                tabIndex={-1}*/}
          {/*                role="checkbox"*/}
          {/*                selected={isItemSelected}*/}
          {/*                aria-checked={isItemSelected}*/}
          {/*              >*/}
          {/*                <TableCell padding="checkbox">*/}
          {/*                  <Checkbox*/}
          {/*                      checked={isItemSelected}*/}
          {/*                      onChange={(event) => handleClick(event, name)} />*/}
          {/*                </TableCell>*/}
          {/*                <TableCell align="left">{_id}</TableCell>*/}
          {/*                /!*<TableCell component="th" scope="row" padding="none">*!/*/}
          {/*                  /!*<Stack direction="row" alignItems="center" spacing={2}>*!/*/}
          {/*                    /!* <Avatar alt={name} src={avatarUrl} /> *!/*/}
          {/*                    /!*<Typography variant="subtitle2" noWrap>*!/*/}
          {/*                    /!*  {name}*!/*/}
          {/*                    /!*</Typography>*!/*/}
          {/*                  /!*</Stack>*!/*/}
          {/*                /!*</TableCell>*!/*/}
          {/*                <TableCell align="left">{name}</TableCell>*/}
          {/*                <TableCell align="left">{rank}</TableCell>*/}
          {/*                <TableCell align="left">{signed.split('T')[0]}</TableCell>*/}
          {/*                 /!*<TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>*!/*/}
          {/*                /!*<TableCell align="left">*!/*/}
          {/*                  /!*<Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>*!/*/}
          {/*                  /!*  {sentenceCase(status)}*!/*/}
          {/*                  /!*</Label>*!/*/}
          {/*                /!*</TableCell>*!/*/}

          {/*                <TableCell align="right">*/}
          {/*                  <UserMoreMenu />*/}
          {/*                </TableCell>*/}
          {/*              </TableRow>*/}
          {/*            );*/}
          {/*          })}*/}
          {/*          {emptyRows > 0 && (*/}
          {/*            <TableRow style={{ height: 53 * emptyRows }}>*/}
          {/*              <TableCell colSpan={6} />*/}
          {/*            </TableRow>*/}
          {/*          )}*/}
          {/*        </TableBody>*/}

          {/*        {isUserNotFound && (*/}
          {/*          <TableBody>*/}
          {/*            <TableRow>*/}
          {/*              <TableCell align="center" colSpan={6} sx={{ py: 3 }}>*/}
          {/*                <SearchNotFound searchQuery={filterName} />*/}
          {/*              </TableCell>*/}
          {/*            </TableRow>*/}
          {/*          </TableBody>*/}
          {/*        )}*/}
          {/*      </Table>*/}
          {/*    </TableContainer>*/}
          {/*  </Scrollbar>*/}

          {/*  <TablePagination*/}
          {/*    rowsPerPageOptions={[5, 10, 25, 50, 100]}*/}
          {/*    component="div"*/}
          {/*    count={network.length}*/}
          {/*    rowsPerPage={rowsPerPage}*/}
          {/*    page={page}*/}
          {/*    onPageChange={handleChangePage}*/}
          {/*    onRowsPerPageChange={handleChangeRowsPerPage}*/}
          {/*  />*/}
          {/*</Card>*/}
        {/*</Container>*/}
        {/*<Container>*/}
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                        key={1}
                        id={'1'}
                        onClick={handleSortRequestId}
                        align="right">
                      <TableSortLabel
                          key={1}
                          id={'1'}
                          active={active === "1"}
                          direction={orderDirection}>
                        ЛРН
                      </TableSortLabel>
                      <span className="material-symbols-outlined" style={{top: "4px", position: "relative", fontSize: "1em"}}>unfold_more</span>
                    </TableCell>
                    <TableCell
                        key={2}
                        id={'2'}
                        onClick={handleSortRequestName}
                        align="right">
                      <TableSortLabel
                          key={2}
                          id={'2'}
                          active={active === "2"}
                          direction={orderDirection}>
                        ФИО</TableSortLabel>
                      <span className="material-symbols-outlined" style={{top: "4px", position: "relative", fontSize: "1em"}}>unfold_more</span>
                    </TableCell>
                    <TableCell
                        key={3}
                        id={'3'}
                        // onClick={() => handleSortRequestRank}
                        onClick={handleSortRequestRank}
                        align="right">
                      <TableSortLabel
                          key={3}
                          id={'3'}
                          active={active === "3"}
                          direction={orderDirection}>
                        Ранг</TableSortLabel>
                      <span className="material-symbols-outlined" style={{top: "4px", position: "relative", fontSize: "1em"}}>unfold_more</span>
                    </TableCell>
                    <TableCell
                        key={4}
                        id={'4'}
                        onClick={handleSortRequestDataSigned}
                        align="right">
                      <TableSortLabel
                          key={4}
                          id={'4'}
                          active={active === "4"}
                          direction={orderDirection}>
                        Дата создания</TableSortLabel>
                      <span className="material-symbols-outlined" style={{top: "4px", position: "relative", fontSize: "1em"}}>unfold_more</span>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {networkForSort.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((item) => (
                          <TableRow
                              hover
                              key={item._id}
                              sx={{'&:last-child td, &:last-child th': {border: 0}}}
                              onClick={() => navigate(`${item._id}`)}
                          >
                            <TableCell align="right">{item._id}</TableCell>
                            <TableCell align="right">{item.name}</TableCell>
                            <TableCell align="right">{item.rank}</TableCell>
                            <TableCell
                                align="right"> {item.signed !== null && item.signed.split('T')[0]}</TableCell>
                            {/*<TableCell align="right">*/}
                            {/*  <UserMoreMenu />*/}
                            {/*</TableCell>*/}
                          </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={networkForSort.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        </Container>
      </Page>
    );
  }
}
