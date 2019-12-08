import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import handleReqError from "../../utils/handleReqError";
import CustomMaterialTable from "../../components/CustomMaterialTable";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(() => ({
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const Users = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [selectedCampuses, setSelectedCampuses] = useState([]);
  const [selectedCampusesRow, setSelectedCampusesRow] = useState([]);
  const columns = [
    { title: "Prontuário", field: "recordId", type: "numeric" },
    { title: "Nome", field: "name" },
    { title: "E-mail", field: "email" },
    {
      title: "Nível",
      field: "level",
      lookup: { Coordenador: "Coordenador", Administrador: "Administrador" }
    },
    {
      title: "Campi",
      field: "campuses",
      editComponent: props => {
        if (props.rowData.tableData) {
          setSelectedCampusesRow(selectedCampuses[props.rowData.tableData.id]);
        }
        return (
          <Select
            multiple
            value={selectedCampusesRow}
            onChange={event => handleChange(props.rowData.tableData.id, event)}
            input={<Input />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip
                    key={value._id}
                    label={value.name}
                    className={classes.chip}
                  />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {campuses.map(campus => (
              <MenuItem key={campus._id} value={campus}>
                {campus.name}
              </MenuItem>
            ))}
          </Select>
        );
      }
    },
    {
      title: "Senha",
      field: "password",
      editComponent: props => (
        <input
          type="password"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      ),
      emptyValue: "*****"
    }
  ];

  const handleChange = (id, event) => {
    const updateSelected = selectedCampuses;
    updateSelected[id] = event.target.value;
    setSelectedCampuses(updateSelected);
    setSelectedCampusesRow(event.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      await getAllUsers();
      await getAllCampuses();
    };
    getData();
  }, []);

  const getAllUsers = () => {
    api
      .get("/listUsers")
      .then(response => {
        setSelectedCampuses(
          response.data.map(user => user.campuses.map(campus => campus))
        );

        const campusesName = response.data.map(user =>
          user.campuses.map(campus => campus.name)
        );

        response.data.map((user, index) => {
          if (user.campuses.length > 1) {
            user.campuses = campusesName[index].join(", ");
          } else {
            user.campuses = campusesName[index];
          }
        });

        setUsers(response.data);
      })
      .catch(error => {
        handleReqError(error);
        throw error.response;
      });
  };

  const getAllCampuses = () => {
    api
      .get("/listCampuses")
      .then(response => {
        setCampuses(response.data);
      })
      .catch(error => {
        handleReqError(error);
        throw error.response;
      });
  };

  const createUser = data => {
    api
      .post("/createUser", {
        ...data,
        campuses: selectedCampusesRow
      })
      .then(async response => {
        toast.success(response.data.messageUi_PtBr);
        await getAllUsers();
      })
      .catch(error => {
        handleReqError(error);
        throw error.response;
      });
  };

  const updateUser = (newData, oldData) => {
    api
      .put(`/updateUser/${oldData.recordId}`, {
        ...newData,
        campuses: selectedCampusesRow
      })
      .then(async response => {
        toast.success(response.data.messageUi_PtBr);
        await getAllUsers();
      })
      .catch(error => {
        handleReqError(error);
        throw error.response;
      });
  };

  const destroyUser = ({ recordId }) => {
    api
      .delete(`/deleteUser/${recordId}`)
      .then(async response => {
        toast.success(response.data.messageUi_PtBr);
        await getAllUsers();
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
        data={users}
        title="Usuários"
        insert={createUser}
        update={updateUser}
        destroy={destroyUser}
      />
    </div>
  );
};

export default Users;
