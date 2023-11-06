import { toast } from "react-toastify";

export default function notificationToast(text = "", color = "green") {
  if (color === "green")
    return toast.success(text, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, //3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  return toast.error(text, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000, //3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}
