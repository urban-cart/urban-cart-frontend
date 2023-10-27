import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import {useDispatch, useSelector} from 'react-redux'


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export const NavBar = () => {
  const navbarStyle = {
    position: "fixed",
    top: 0,
    right: 0,
    height:80,
    zIndex: 1, // You can adjust this value as needed
    justifyContent: "flex-start",
    backgroundColor: "#7979d2"
  };
  const currentUser = localStorage.getItem('user');
  console.log("current user:", currentUser);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  }
  
  return (
    <Slide direction="down" in={true} mountOnEnter unmountOnExit>
      <AppBar style={navbarStyle}>
        <Toolbar>
          {/* <img src="../static/shopping-cart.png" alt="logo" /> */}
          <Typography
            variant="h6"
            component="div"
            style={{ flexGrow: 1,  color: "white", fontWeight: "bold", textAlign: "left" }}
            sx={{ flexGrow: 1 }}
          >
            Urban Cart
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Button color="inherit">
            <Link to="/" style={{ color: "white" }}>Home</Link>
          </Button>
          <Button color="inherit" >
            <Link to="/sell-item" style={{ color: "white" }}>Sell Item</Link>
          </Button>
          <Button color="inherit">Cart</Button>
          {currentUser ? (
              <div>
              {currentUser}
              <Button color="inherit"  onClick={handleLogout}>Logout</Button>
              </div>
            ) : (
              <Button color="inherit">
                <Link to="/login" style={{ color: "white" }}>Login</Link>
              </Button>
            )}
        </Toolbar>
      </AppBar>
    </Slide>
  );
};
