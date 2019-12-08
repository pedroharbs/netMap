import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import handleReqError from "../../utils/handleReqError";
import CustomMaterialTable from "../../components/CustomMaterialTable";
import InputMask from "react-input-mask";
import { Switch } from "@material-ui/core";
import { CompactPicker } from "react-color";

const Vlans = () => {
  const [vlans, setVlans] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [color, setColor] = useState("#000");
  const [isDhcp, setIsDhcp] = useState(false);
  const [isVpn, setIsVpn] = useState(false);
  const columns = [
    { title: "Identificador", field: "vlan_id", editable: "never" },
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
    { title: "Máscara de sub-rede", field: "mask", editable: "never" },
    {
      title: "Campus",
      field: "campus",
      lookup: campuses,
      editable: "onAdd"
    },
    {
      title: "Cor",
      field: "color",
      editComponent: props => (
        <CompactPicker
          color={
            color ||
            (props.rowData.tableData && vlans[props.rowData.tableData.id].color)
          }
          onChangeComplete={color => setColor(color.hex)}
        />
      )
    },
    {
      title: "DHCP",
      field: "dhcp",
      editComponent: props => {
        return (
          <Switch
            checked={isDhcp}
            onChange={() => setIsDhcp(!isDhcp)}
            color="primary"
          />
        );
      }
    },
    {
      title: "VPN",
      field: "vpn",
      editComponent: props => {
        return (
          <Switch
            checked={isVpn}
            onChange={() => setIsVpn(!isVpn)}
            color="primary"
          />
        );
      }
    }
  ];

  useEffect(() => {
    const getData = async () => {
      await getAllVlans();
      await getAllCampuses();
    };
    getData();
  }, []);

  const getAllVlans = () => {
    api
      .get("/listVlans")
      .then(response => {
        response.data.map((vlan, index) => {
          response.data[index].dhcp = vlan.dhcp ? "É DHCP" : "Não é DHCP";
          response.data[index].vpn = vlan.vpn ? "É VPN" : "Não é VPN";
          return null;
        });
        setVlans(response.data);
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
        setCampuses(response.data.map(campus => campus.name));
      })
      .catch(error => {
        handleReqError(error);
        throw error.response;
      });
  };

  const createVlan = data => {
    api
      .post("/createVlan", {
        ...data,
        color: color,
        dhcp: isDhcp,
        vpn: isVpn
      })
      .then(async response => {
        toast.success(response.data.messageUi_PtBr);
        setIsDhcp(false);
        setIsVpn(false);
        await getAllVlans();
      })
      .catch(error => {
        handleReqError(error);
        throw error.response;
      });
  };

  const updateVlan = newData => {
    api
      .put(`/updateVlan/${newData._id}`, {
        ...newData,
        color: color,
        dhcp: isDhcp,
        vpn: isVpn
      })
      .then(async response => {
        toast.success(response.data.messageUi_PtBr);
        setIsVpn(false);
        setIsDhcp(false);
        await getAllVlans();
      })
      .catch(error => {
        handleReqError(error);
        throw error.response;
      });
  };

  const destroyVlan = ({ _id }) => {
    api
      .delete(`/deleteVlan/${_id}`)
      .then(async response => {
        toast.success(response.data.messageUi_PtBr);
        await getAllVlans();
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
        data={vlans}
        title="Vlans"
        insert={createVlan}
        update={updateVlan}
        destroy={destroyVlan}
      />
    </div>
  );
};

export default Vlans;
