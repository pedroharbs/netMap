import { toast } from "react-toastify";

export default function handleReqError(error) {
  if (error.response) {
    toast.error(error.response.data.messageUi_PtBr);
  } else if (error.request) {
    toast.error("O servidor não está respondendo.");
  } else {
    toast.error(error.message);
  }
}
