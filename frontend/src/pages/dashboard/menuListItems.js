import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BusinessIcon from "@material-ui/icons/Business";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

const menuListItems = (
  <div>
    <Link to="/dashboard">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Painel administrativo" />
      </ListItem>
    </Link>

    <Link to="/campi">
      <ListItem button>
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Campi" />
      </ListItem>
    </Link>

    <Link to="/users">
      <ListItem button>
        <ListItemIcon>
          <SupervisorAccountIcon />
        </ListItemIcon>
        <ListItemText primary="Usuários" />
      </ListItem>
    </Link>
  </div>
);

export default menuListItems;
