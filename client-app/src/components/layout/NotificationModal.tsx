import { useContext } from "react";
import { AppContext } from "../../store";

function NotificationModal() {
  const { state, dispatch } = useContext(AppContext);
  const { notification } = state;
  if (notification.type !== null) {
    setTimeout(() => {
      dispatch({
        type: "setNotification",
        payload: { type: null, message: "" },
      });
    }, 3000);
  }
  return (
    <>
      {notification.message && notification.type && (
        <div
          className={`absolute top-3 right-4 rounded-md p-4 text-white/80 text-base ${
            notification.type === "ERROR" ? "bg-red-400" : "bg-blue-400"
          }`}
        >
          {notification.message}
        </div>
      )}
    </>
  );
}
export default NotificationModal;
