import React, { useState } from "react";
import novalogo from "../assets/image/novalogo.png";
import {
  useTheme,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemText,
  IconButton,
  ListItemIcon,
  AppBar,
  Drawer,
} from "@material-ui/core";

import clsx from "clsx";
import { Link } from "react-router-dom";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiFillHome,
  AiFillEdit,
  AiOutlineMenu,
} from "react-icons/ai";

import { BiDish } from "react-icons/bi";
import { ImExit } from "react-icons/im";
import { MdAddTask } from "react-icons/md"

import "../styles/home.scss"
import { useStyles } from "../styles/DefaultStyles";

export default function Header({ title = "", toogleOpen = () => {} }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    toogleOpen(true)
  };

  const handleDrawerClose = () => {
    setOpen(false);
    toogleOpen(false)
  };

  const menus = [
    {
      text: "Home",
      icon: <AiFillHome />,
      link: "/home",
    },
    {
      text: "Editar Dados",
      icon: <AiFillEdit />,
      link: "/edit",
    },
    {
      text: "Cadastro de pratos",
      icon: <BiDish />,
      link: "/add",
    },
    {
      text: "Status de Pedidos",
      icon: <MdAddTask />,
      link: "/status",
    },
    {
      text: "Sair",
      icon: <ImExit />,
      link: "/login",
    },
  ];
  return (
    <>
      <AppBar
        style={{backgroundColor: "#A80715"}}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <AiOutlineMenu />
          </IconButton>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
            <img src={novalogo} className="imageHeader"/>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <AiOutlineDoubleRight />
            ) : (
              <AiOutlineDoubleLeft />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menus.map((item, index) => (
            <Link
              to={item.link}
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem button>
                <ListItemIcon className="icon">{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
    </>
  );
}
