import React, {useState} from "react";
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

import { useNavigate } from 'react-router-dom';

import { getMeById } from '../../utils/apiCalls'

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------


export default function DashboardLayout(props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [partner, setPartner] = useState("");
  
  React.useEffect(() => {
    if (props.partnerId === ''){
      navigate('/login', { replace: true });
    }
  })

  if (partner === "") (
    getMeById()
    .then((data) => {
      console.log("login data", data);
      setPartner(data)

    })
    .catch((err_data) => {
      console.log("no data", err_data);
      // TODO: Make allert!
      navigate('/login', { replace: true });
    })
  )

  console.log(partner);



  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar partner={partner} isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Outlet context={[partner]} />
      </MainStyle>
    </RootStyle>
  );
}
