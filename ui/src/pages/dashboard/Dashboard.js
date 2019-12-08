import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Switch, Route, Link } from "react-router-dom";
import {
  AppBar,
  Drawer,
  makeStyles,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Grid,
  Tooltip
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import { toast } from "react-toastify";
import menuListItems from "./menuListItems";
import Profile from "../profile/Profile";
import Users from "../users/Users";
import Campuses from "../campuses/Campuses";
import Providers from "../providers/Providers";
import Vlans from "../vlans/Vlans";
import logout from "../../utils/logout";

const drawerWidth = 260;

const Dashboard = props => {
  const classes = useStyles();

  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState("Painel administrativo");

  const handleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    switch (props.history.location.pathname) {
      case `${props.match.url}/profile`:
        setTitle("Seu perfil");
        break;
      case `${props.match.url}/campuses`:
        setTitle("Gestão de campi");
        break;
      case `${props.match.url}/users`:
        setTitle("Gestão de usuários");
        break;
      case `${props.match.url}/providers`:
        setTitle("Gestão de provedores de internet");
        break;
      case `${props.match.url}/vlans`:
        setTitle("Gestão de vlans");
        break;
      default:
        setTitle("Painel administrativo");
    }
  }, [props.history.location.pathname, props.match.url]);

  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {title}
          </Typography>
          <Link to={`${props.match.url}/profile`}>
            <Tooltip title="Meu perfil">
              <IconButton color="inherit">
                <AccountBoxIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <Tooltip title="Sair">
            <IconButton onClick={logout} color="inherit">
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{menuListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Switch>
              <Route path={`${props.match.path}/profile`} component={Profile} />
              <Route path={`${props.match.path}/users`} component={Users} />
              <Route
                path={`${props.match.path}/campuses`}
                component={Campuses}
              />
              <Route
                path={`${props.match.path}/providers`}
                component={Providers}
              />
              <Route path={`${props.match.path}/vlans`} component={Vlans} />
            </Switch>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    width: "100%",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

export default Dashboard;
