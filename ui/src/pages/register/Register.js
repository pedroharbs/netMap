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
import api from "../../services/api";
import handleReqError from "../../utils/handleReqError";
import Copyright from "../../components/copyright/Copyright";
import Logo from "../../assets/logo.png";

const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recordId, setRecord] = useState("");

  const classes = useStyles();

  useEffect(() => {
    api.get("isFirstAcess").then(response => {
      if (!response.data.isFirstAcess) history.push("/");
    });
  }, [history]);

  function handleSubmit(e) {
    e.preventDefault();

    api
      .post("/firstAcess", {
        name,
        recordId,
        email,
        password
      })
      .then(response => {
        toast.success(response.data.messageUi_PtBr);
        history.push("/");
      })
      .catch(error => handleReqError(error));
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img src={Logo} alt="logo" />
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
