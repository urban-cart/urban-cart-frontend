import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { useState, useEffect } from "react";
import { getCategories } from "../utils/api";
import {useDispatch} from 'react-redux'
import {setCategory} from '../store/product.slice'
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

const drawerWidth = 200;

export default function SideBar(props) {
  const dispatch = useDispatch()
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  useEffect(() => {
    // Calculate the offset based on the current page and number of products per page

    getCategories().then((data) => {
      setCategories(data);
      console.log(data);
    });
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />

      <Tabs
          orientation="vertical"
          variant="scrollable"
          aria-label="Vertical tabs example"
          z-index="0"
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            overflowY: 'hidden' // Add this line to hide the vertical scrollbar
          }}
      >
      {/* <Tab label="All" onClick={() => dispatch(setCategory(null))}/>
      {categories.map((category) => (
          <Tab label={category.name} onClick={() => dispatch(setCategory(category.id))}/>
      ))} */}
      <List>
        {categories.map((category) => (
          <ListItem key={category.id} disablePadding>
            <ListItemButton  onClick={() => dispatch(setCategory(category.id))}>
              <ListItemText primary={category.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      </Tabs>
    </div>
  );


    const navbarStyle = {
      position: "fixed",
      top: 80,
      right: 0,
      height:50,
      zIndex: 1, 
      backgroundColor: "#19194d",
      justifyContent: "flex-start"
    };

  return (
    <Box >
      <AppBar style={navbarStyle}>
        <Toolbar  bg-color="gray">
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            size="small"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
            bg-color="gray"
          >
            <MenuIcon />
          </IconButton>
          <Button color="inherit">Top Deals</Button>
          <Button color="inherit">Offers</Button>
          </Toolbar>
      </AppBar>
      <Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {drawer}
        </Drawer>
      </Box>
      <Box>
        <Toolbar />
      </Box> 
    </Box> 
 );};
