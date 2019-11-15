import api from "../services/api";

export default function authenticated() {
  if (localStorage.getItem("authToken")) {
    return api
      .get("/authenticated")
      .then(() => {
        return true;
      })
      .catch(err => {
        localStorage.removeItem("authToken");
        return false;
      });
  }

  return false;
}
