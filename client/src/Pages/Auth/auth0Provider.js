import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Authenticate = ({ children }) => {
  const domain = "divine-dev.us.auth0.com";
  const clientId = "hIA9zwn2RD9TzeZLeZEVS0gDu2VkYduh";

  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback()}
    >
      {children}
    </Auth0Provider>
  );
};

export default Authenticate;
