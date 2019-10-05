<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Link,
  Grid,
  Box,
  makeStyles,
  Container
} from "@material-ui/core";

import { toast } from "react-toastify";

import Copyright from "../../components/Copyright";
import Logo from "../../assets/logo.png";
import Api from "../../services/Api";
import cookies from "../../utils/cookies";
import authenticated from "../../utils/authenticated";
=======
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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

import Logo from "../../assets/logo.png";
import Api from "../../services/Api";
>>>>>>> master

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
    margin: theme.spacing(3, 0, 2),
    background: "#ffa949",
    "&:hover": {
      background: "#ff9949"
    }
  },
  linkSenha: {
    textDecorationLine: "none !important"
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

export default function Login({ history }) {
  
  async function handleLoad(){
    const firstLogin = await Api.post("/createSession", {
      schoolRecord : 'BA1798839',
      password : 'firstPassword@1931'
    });
    
    if(firstLogin.data.code == 0){
      history.push(`/firstAccess`);
    }
  }

  handleLoad();
  
  function handleClick() {
    setOpen(true);
  }

<<<<<<< HEAD
    if (authenticated()) history.push("/dashboard");
  }, [history]);
=======
  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
>>>>>>> master

    setOpen(false);
  }

  const [schoolRecord, setSchoolRecord] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [messageSnack, setmessageSnack] = useState("")

  const classes = useStyles();
  
  //Verifica se useState esta guardando username, precisa add onSubmit={handleSubmit} no form ou no input
  async function handleSubmit(e) {
    e.preventDefault();

    //realiza requisição post a API
    const response = await Api.post("/createSession", {
      schoolRecord,
      password
<<<<<<< HEAD
    })
      .then(async response => {
        await cookies.set("authCookie", response.data.token, { path: "/" }); //Add httpOnly option.
        toast.success(response.data.messageUi_PtBr);
        history.push("/dashboard");
      })
      .catch(error => {
        if (error.response) {
          toast.error(error.response.data.messageUi_PtBr);
        } else if (error.request) {
          toast.error("O servidor não está respondendo.");
        } else {
          toast.error(error.message);
        }
      });
=======
    });

    if(response.data.auth == true){
      setmessageSnack({ message: 'Logado com sucesso.', variant: 'success'})
    } else if(response.data.message == 'User not found.'){
      setmessageSnack({ message: 'Prontuário não encontrado.', variant: 'error'})
    } else if(response.data.message == 'Password incorrect'){
      setmessageSnack({ message: 'Senha inválida.', variant: 'error'})
    }
    handleClick();

    setTimeout(function(){
      handleClose();

      if(response.data.auth == true){
        history.push(`/home`);
      }
    }, 2000)

>>>>>>> master
  }

  return (
    <>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={Logo} alt="logo" />
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="schoolRecord"
            label="Prontuário"
            name="schoolRecord"
            autoComplete="schoolRecord"
            autoFocus
            value={schoolRecord}
            onChange={e => setSchoolRecord(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Logar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link className={classes.linkSenha} href="/lostPassword" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
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
