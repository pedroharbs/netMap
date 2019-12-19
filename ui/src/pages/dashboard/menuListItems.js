import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BusinessIcon from "@material-ui/icons/Business";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import WifiIcon from "@material-ui/icons/Wifi";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import SettingsRemoteIcon from '@material-ui/icons/SettingsRemote';

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

    <Link to="/dashboard/campuses">
      <ListItem button>
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Campi" />
      </ListItem>
    </Link>

    <Link to="/dashboard/users">
      <ListItem button>
        <ListItemIcon>
          <SupervisorAccountIcon />
        </ListItemIcon>
        <ListItemText primary="Usuários" />
      </ListItem>
    </Link>

    <Link to="/dashboard/providers">
      <ListItem button>
        <ListItemIcon>
          <WifiIcon />
        </ListItemIcon>
        <ListItemText primary="Provedores de internet" />
      </ListItem>
    </Link>

    <Link to="/dashboard/vlans">
      <ListItem button>
        <ListItemIcon>
          <TrackChangesIcon />
        </ListItemIcon>
        <ListItemText primary="Vlans" />
      </ListItem>
    </Link>

    <Link to="/dashboard/equipaments">
      <ListItem button>
        <ListItemIcon>
          <SettingsRemoteIcon />
        </ListItemIcon>
        <ListItemText primary="Equipamentos" />
      </ListItem>
    </Link>
  </div>
);

export default menuListItems;
