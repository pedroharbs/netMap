import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import handleReqError from "../../utils/handleReqError";
import CustomMaterialTable from "../../components/CustomMaterialTable";
import InputMask from "react-input-mask";

const Providers = () => {
  const [providers, setProviders] = useState([]);
  const columns = [
    { title: "Nome", field: "name" },
    {
      title: "Endereço IP",
      field: "ip",
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
      editComponent: props => (
        <InputMask
          mask="/99"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      )
    },
    { title: "Máscara de sub-rede", field: "mask", readonly: true }
  ];

  useEffect(() => {
    const getData = async () => {
      await getAllProviders();
    };
    getData();
  }, []);

  const getAllProviders = () => {
    api
      .get("/listProviders")
      .then(response => {
        setProviders(response.data);
      })
      .catch(error => {
        handleReqError(error);
        throw error;
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
        throw error;
      });
  };

  const updateProvider = (newData, oldData) => {
    api
      .put(`/updateProvider/${oldData.recordId}`, newData)
      .then(async response => {
        toast.success(response.data.messageUi_PtBr);
        await getAllProviders();
      })
      .catch(error => {
        handleReqError(error);
        throw error;
      });
  };

  const destroyProvider = ({ recordId }) => {
    api
      .delete(`/deleteProvider/${recordId}`)
      .then(async response => {
        toast.success(response.data.messageUi_PtBr);
        await getAllProviders();
      })
      .catch(error => {
        handleReqError(error);
        throw error;
      });
  };

  return (
    <div style={{ maxWidth: "100%", minWidth: "100%" }}>
      <CustomMaterialTable
        columns={columns}
        data={providers}
        title="Provedores de internet"
        insert={createProvider}
        update={updateProvider}
        destroy={destroyProvider}
      />
    </div>
  );
};

export default Providers;
