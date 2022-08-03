import React from "react";
import ReactDOM from "react-dom/client";
import { Amplify } from "aws-amplify";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

Amplify.configure({
  Auth: {
    region: "us-east-2",
    userPoolId: "us-east-1_KnnsLWuY0",
    userPoolWebClientId: "1ur3qlil5b9l820erujahmhmfe",
    mandatorySignIn: true,
  },
});

const myAppConfig = {
  aws_appsync_graphqlEndpoint:
    "https://pfdmtsvrovgovlk7cwdb3pky3u.appsync-api.us-east-1.amazonaws.com/graphql",
  aws_appsync_region: "us-east-2",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
};

Amplify.configure(myAppConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
