import cookies from "./cookies";
import Api from "../services/Api";

export default function authenticated() {
  const token = cookies.get("authCookie");

  if (token) {
    return Api.get("/authenticated", {
      headers: { authorization: "Bearer " + token }
    })
      .then(() => {
        return true;
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  }

  return false;
}
