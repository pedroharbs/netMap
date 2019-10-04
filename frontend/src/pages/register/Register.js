import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  makeStyles,
  Container
} from "@material-ui/core";

import { toast } from "react-toastify";

import Copyright from "../../components/Copyright";

import Logo from "../../assets/logo.png";
import Api from "../../services/Api";

const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recordId, setRecord] = useState("");
  const classes = useStyles();

  useEffect(() => {
    Api.get("isFirstAcess").then(response => {
      const isfirstAcess = response.data.isFirstAcess;
      if (!isfirstAcess) history.push("/");
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    Api.post("/firstAcess", {
      name,
      recordId,
      level: "Administrador",
      email,
      password
    })
      .then(response => {
        toast.success(response.data.messageUi_PtBr);
        history.push("/");
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
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img src={Logo} />
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="p" align="center">
                Crie sua credencial para o primeiro acesso ao sistema.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                name="name"
                variant="outlined"
                required
                fullWidth
                label="Nome"
                value={name}
                onChange={e => setName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                variant="outlined"
                required
                fullWidth
                label="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="recordId"
                variant="outlined"
                required
                fullWidth
                label="Prontuário"
                value={recordId}
                onChange={e => setRecord(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                variant="outlined"
                required
                fullWidth
                label="Senha"
                type="password"
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
            Iniciar sistema
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Register;

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
