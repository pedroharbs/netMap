import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import handleReqError from "../../utils/handleReqError";
import CustomMaterialTable from "../../components/CustomMaterialTable";
import InputMask from "react-input-mask";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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

const Providers = () => {
  const classes = useStyles();
  const [providers, setProviders] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [modalData, setModalData] = useState([]);
  const columns = [
    { title: "Nome", field: "name" },
    {
      title: "Endereço IP",
      field: "ip",
      editable: "onAdd",
      editComponent: props => (
        <InputMask
          mask="999.999.999.999"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      )
    },
    {
      title: "CIDR",
      field: "cidr",
      editable: "onAdd",
      editComponent: props => (
        <InputMask
          mask="/99"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      )
    },
    { title: "Máscara de sub-rede", field: "mask", editable: "never" }
  ];

  useEffect(() => {
    const getData = async () => {
      await getAllProviders();
    };
    getData();
  }, []);

  const handleModalState = rowData => {
    setModalData(rowData.ipRange);
    setModalState(!modalState);
  };

  const getAllProviders = () => {
    api
      .get("/listProviders")
      .then(response => {
        setProviders(response.data);
      })
      .catch(error => {
        handleReqError(error);
        throw error.response;
      });
  };

  const createProvider = data => {
    api
      .post("/createProvider", data)
      .then(async response => {
        toast.success(response.data.messageUi_PtBr);
        await getAllProviders();
      })
      .catch(error => {
        handleReqError(error);
        throw error.response;
      });
  };

  const updateProvider = newData => {
    api
      .put(`/updateProvider/${newData._id}`, newData)
      .then(async response => {
        toast.success(response.data.messageUi_PtBr);
        await getAllProviders();
      })
      .catch(error => {
        handleReqError(error);
        throw error.response;
      });
  };

  const destroyProvider = ({ _id }) => {
    api
      .delete(`/deleteProvider/${_id}`)
      .then(async response => {
        toast.success(response.data.messageUi_PtBr);
        await getAllProviders();
      })
      .catch(error => {
        handleReqError(error);
        throw error.response;
      });
  };

  return (
    <>
      <div style={{ maxWidth: "100%", minWidth: "100%" }}>
        <CustomMaterialTable
          columns={columns}
          data={providers}
          title="Provedores de internet"
          insert={createProvider}
          update={updateProvider}
          destroy={destroyProvider}
          modal={handleModalState}
        />
      </div>
      <div>
        <Modal
          className={classes.modal}
          open={modalState}
          onClose={handleModalState}
        >
          <div className={classes.paper}>
            <List dense>
              {modalData &&
                modalData.map((ip, index) => (
                  <ListItem>
                    <ListItemText
                      primary={`${index + 1} - ${ip}`}
                      secondary={index === 0 ? "Gateway" : ""}
                    />
                  </ListItem>
                ))}
            </List>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Providers;
