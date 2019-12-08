import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import handleReqError from "../../utils/handleReqError";
import CustomMaterialTable from "../../components/CustomMaterialTable";
import InputMask from "react-input-mask";
import cities from "./cities";

const Campuses = () => {
  const [campuses, setCampuses] = useState([]);
  const columns = [
    { title: "Nome", field: "name" },
    { title: "Cidade - Sigla", field: "city", lookup: cities },
    {
      title: "Endereço IP (Dois primeiros octetos)",
      field: "ip",
      editable: "onAdd",
      editComponent: props => (
        <InputMask
          mask="999.999"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      )
    }
  ];

  useEffect(() => {
    getAllCampuses();
  }, []);

  const getAllCampuses = () => {
    api
      .get("/listCampuses")
      .then(async response => {
        setCampuses(response.data);
      })
      .catch(error => {
        handleReqError(error);
        throw error.response;
      });
  };

  const createCampus = data => {
    api
      .post("/createCampus", data)
      .then(async response => {
        toast.success(response.data.messageUi_PtBr);
        await getAllCampuses();
      })
      .catch(error => {
        handleReqError(error);
        throw error.response;
      });
  };

  const updateCampus = (newData, oldData) => {
    api
      .put(`/updateCampus/${oldData._id}`, newData)
      .then(async response => {
        toast.success(response.data.messageUi_PtBr);
        await getAllCampuses();
      })
      .catch(error => {
        handleReqError(error);
        throw error.response;
      });
  };

  const destroyCampus = ({ _id }) => {
    api
      .delete(`/deleteCampus/${_id}`)
      .then(async response => {
        toast.success(response.data.messageUi_PtBr);
        await getAllCampuses();
      })
      .catch(error => {
        handleReqError(error);
        throw error.response;
      });
  };

  return (
    <div style={{ maxWidth: "100%", minWidth: "100%" }}>
      <CustomMaterialTable
        columns={columns}
        data={campuses}
        title="Campi"
        insert={createCampus}
        update={updateCampus}
        destroy={destroyCampus}
      />
    </div>
  );
};

export default Campuses;
