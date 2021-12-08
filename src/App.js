import { NotificationItem, utils, api } from "@epnsproject/frontend-sdk-staging";
import { useEffect, useState } from "react";
import "./App.css";

const WALLET_ADDRESS = "0x0F68c056c901AcC3c1137feB3E0b3e67Ac4C53ED";
const PAGINATION_PARAMS = {
  page: 1,
  itemsPerPage: 20,
};

function App() {
  // create state components to fetch all the notifications.
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // on page load, fetch all the notifications
    api.fetchNotifications(WALLET_ADDRESS, PAGINATION_PARAMS.itemsPerPage, PAGINATION_PARAMS.page).then((notificationsData) => {
      const { count, results } = notificationsData || {};
      console.log(`${count} notifications loaded:`, results);
      // parse the notifications into the required format
      const response = utils.parseApiResponse([...results]);
      console.log({ unparsed: results });
      // const response = utils.parseApiResponse(results);
      console.log("Parsed response to:", response);
      console.log({ parsed: response });
      setNotifications(response);
    });
  }, []);

  return (
    <div className="App">
      <h2 className="App__header">EPNS Notifications</h2>
      {notifications.map((oneNotification) => {
        const { cta, title, message, app, icon, image, url } = oneNotification;

        // render the notification item
        return (
          <NotificationItem
            notificationTitle={title}
            notificationBody={message}
            cta={cta}
            app={app}
            icon={icon}
            image={image}
            url={url}
          />
        );
      })}
    </div>
  );
}

export default App;
