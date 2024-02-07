const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null;
  }
  return (
    <div className={`${messageType}`}>
      {messageType === "success" && message}
      {messageType === "error" && message}
    </div>
  );
};

export default Notification;
