import { toast } from "react-toastify";

export default function logout() {
  try {
    localStorage.clear();
    window.location.replace("/");
  } catch {
    toast.error("Problema ao sair do sistema.");
  }
}
