<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  makeStyles,
  Container
} from "@material-ui/core";
import { toast } from "react-toastify";
=======
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import { green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
>>>>>>> master

import Logo from "../../assets/logo.png";
import Api from "../../services/Api";

<<<<<<< HEAD
import cookies from "../../utils/cookies";
=======
const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'success']).isRequired,
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://brt.ifsp.edu.br/">
        netMap
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
    background: "#ffa949",
    "&:hover": {
      background: "#ff9949"
    }
  }
}));

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));
>>>>>>> master

export default function LostPassword({ history }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [messageSnack, setmessageSnack] = useState("")
  const classes = useStyles();

  function handleClick() {
    setOpen(true);
  }

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

<<<<<<< HEAD
    if (cookies.get("authCookie")) history.push("/dashboard");
  }, [history]);
=======
    setOpen(false);
  }
>>>>>>> master

  async function handleLostPassword(e) {
    e.preventDefault();

    const urlAtual = window.location.pathname
    
    const response = await Api.post(urlAtual, {
      email,
      password
    });

    console.log(response.data.message);

    if(response.data.message == 'Password changed successfully.'){
      setmessageSnack({ message: 'Senha alterada com sucesso!', variant: 'success'})
    } else if(response.data.message == 'User not found.'){
      setmessageSnack({ message: 'Usuário não existe.', variant: 'error'})
    } else if(response.data.message == 'Token invalid.'){
      setmessageSnack({ message: 'Token inválido.', variant: 'error'})
    } else if(response.data.message == 'Token expired, generate a new one.'){
      setmessageSnack({ message: 'Token expirado.', variant: 'error'})
    } else if(response.data.message == undefined){
      setmessageSnack({ message: 'Senha inválida.', variant: 'error'})
    }

    handleClick();
  
    setTimeout(function(){
      handleClose();

      if(response.data.message == 'Password changed successfully.'){
        history.push(`/`);
      }
    }, 2000)
  }

  return (
    <>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
<<<<<<< HEAD
        <img src={Logo} alt="logo" />
        <form className={classes.form} onSubmit={handleSubmit}>
=======
        <img src={Logo} />
        <form className={classes.form} onSubmit={handleLostPassword}>
>>>>>>> master
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="p" component="p" align="center">
                Digite sua nova senha!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="email"
                label="E-mail"
                type="email"
                id="email"
                autoComplete="current-email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Enviar
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={open}
    autoHideDuration={6000}
    onClose={handleClose}
  >
    <MySnackbarContentWrapper
      onClose={handleClose}
      variant={messageSnack.variant}
      message={messageSnack.message}
    />
  </Snackbar>
    </>
  );
}
