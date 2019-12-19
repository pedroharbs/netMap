import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import handleReqError from "../../utils/handleReqError";
import CustomMaterialTable from "../../components/CustomMaterialTable";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import types from "./typeList";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: 400,
    overflow: "auto"
  }
}));

const Equipaments = () => {
  const classes = useStyles();
  const [equipaments, setEquipaments] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [modalData, setModalData] = useState({});
  const columns = [
    { title: "Marca", field: "brand" },
    { title: "Modelo", field: "model" },
    { title: "Descrição", field: "description" },
    {
      title: "Tipo",
      field: "type",
      lookup: types
    },
    { title: "Quantidade de portas", field: "portsQuant", type: "numeric" },
    { title: "Quantidade de linhas", field: "linesQuant", lookup: [1, 2] },
    {
      title: "Primeira porta",
      field: "firstPort",
      lookup: [
        "Esquerdo",
        "Direito",
        "Superior esquerdo",
        "Superior direito",
        "Inferior esquerdo",
        "Inferior direito"
      ]
    }
  ];

  useEffect(() => {
    const getData = async () => {
      await getAllEquipaments();
    };
    getData();
  }, []);

  const handleModalState = () => {
    setModalState(!modalState);
  };

  const getAllEquipaments = () => {
    api
      .get("/listEquipaments")
      .then(response => {
        setEquipaments(response.data);
      })
      .catch(error => {
        handleReqError(error);
        throw error.response;
      });
  };

  const createEquipament = data => {
    api
      .post("/createEquipament", data)
      .then(async response => {
        toast.success(response.data.messageUi_PtBr);
        await getAllEquipaments();
      })
      .catch(error => {
        handleReqError(error);
        throw error.response;
      });
  };

  const updateEquipament = newData => {
    api
      .put(`/updateEquipament/${newData._id}`, newData)
      .then(async response => {
        toast.success(response.data.messageUi_PtBr);
        await getAllEquipaments();
      })
      .catch(error => {
        handleReqError(error);
        throw error.response;
      });
  };

  const destroyEquipament = ({ _id }) => {
    api
      .delete(`/deleteEquipament/${_id}`)
      .then(async response => {
        toast.success(response.data.messageUi_PtBr);
        await getAllEquipaments();
      })
      .catch(error => {
        handleReqError(error);
        throw error.response;
      });
  };

  const portsDisposition = rowData => {
    setModalData(equipaments[rowData.tableData.id]);
    handleModalState();
  };

  const makeTable = ({ portsQuant, linesQuant, firstPort }) => {
    // linesQuant += 1;
    // console.log(portsQuant)
  //   return (
  //     {linesQuant == 1 ? <Grid container spacing={3}>
  //       [...Array(2)].map(
  //         port => (
  //           <Grid item xs>
  //             <Paper className={classes.paper}>Porta</Paper>
  //           </Grid>
  //         )
  //       )
  //   </Grid> : <Grid container spacing={3}>
  //     [...Array(2)].map(
  //       port => (
  //         <Grid item xs>
  //           <Paper className={classes.paper}>Porta</Paper>
  //         </Grid>
  //       )
  //     )
  // </Grid>}
  //   );
  };

  return (
    <>
      <div style={{ maxWidth: "100%", minWidth: "100%" }}>
        <CustomMaterialTable
          columns={columns}
          data={equipaments}
          title="Equipamentos"
          insert={createEquipament}
          update={updateEquipament}
          destroy={destroyEquipament}
          portsDisposition={portsDisposition}
        />
      </div>
      <div>
        <Modal
          className={classes.modal}
          open={modalState}
          onClose={handleModalState}
        >
          <div className={classes.paper}>{makeTable(modalData)}</div>
        </Modal>
      </div>
    </>
  );
};

export default Equipaments;
