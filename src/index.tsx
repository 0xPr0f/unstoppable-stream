import ReactDOM, { render } from "react-dom";
//import './index.css'
import "./styles/globals.css";
// eslint-disable-next-line
import UAuth from "@uauth/js";
import ClockLoader from "react-spinners/ClockLoader";
import { Button } from "@material-ui/core";

import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from "react-router-dom";
import Navhan from "./Nav";
import Stream from "./Stream";

//import App from './index'
require("dotenv").config();

const uauth = new UAuth({
  //   https://udstream.netlify.app/
  // These can be copied from the bottom of your app's configuration page on unstoppabledomains.com.
  clientID: process.env.REACT_APP_CLIENT_ID!,
  clientSecret: process.env.REACT_APP_SECRET_ID!,

  // These are the scopes your app is requesting from the ud server.
  scope: "openid wallet",

  // This is the url that the auth server will redirect back to after every authorization attempt.
  redirectUri: "http://localhost:3000/callback"!,

  // This is the url that the auth server will redirect back to after logging out.
  postLogoutRedirectUri: "http://localhost:3000/login"!,
});

const Home: React.FC<RouteProps> = (props) => {
  const [redirectTo, setRedirectTo] = useState<string>();

  useEffect(() => {
    // Try to access the id_token inside `window.localStorage`
    uauth
      .user()
      // User is inside cache, redirect to the profile page.
      .then((user) => {
        console.log("user ->", user);
        setRedirectTo("/profile");
      })
      // User is not inside cache, redirect to the login page.
      .catch((error) => {
        console.error(error);
        setRedirectTo("/login");
      });
  }, []);

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return (
    <>
      {" "}
      <h1 className="text-3xl flex flex-wrap justify-center items-center h-screen">
        Loading...
      </h1>
      <h1 className="text-3xl flex flex-wrap justify-center items-center h-screen">
        Logging in...
      </h1>
    </>
  );
};

const Login: React.FC<RouteProps> = (props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(
    new URLSearchParams(props.location?.search || "").get("error")
  );

  const handleLoginButtonClick: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    setErrorMessage(null);
    uauth.login().catch((error) => {
      console.error("login error:", error);
      setErrorMessage("User failed to login.");
    });
  };

  return (
    <>
      <div className="flex justify-center relative top-44 items-center align-middle">
        <div>
          <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-pink-600 text-8xl align-middle flex justify-center items-center">
            UNSTOPPABLE STREAM
          </h1>

          <br />
          <br />
          <br />
        </div>
      </div>
      <br></br>
      <div className="relative top-44 flex justify-center items-center ">
        {errorMessage && (
          <div className="mb-3" style={{ position: "fixed" }}>
            <strong>Message:</strong> {errorMessage} <br />
          </div>
        )}
      </div>
      <div className="flex flex-wrap relative top-52 justify-center items-center ">
        <Button
          size="large"
          variant="outlined"
          style={{ maxWidth: "400px", position: "fixed", maxHeight: "50px" }}
          color="primary"
          onClick={handleLoginButtonClick}
        >
          <p className="text-2xl">Login with Unstoppable</p>
        </Button>
      </div>
    </>
  );
};

const Callback: React.FC<RouteProps> = (props) => {
  const [redirectTo, setRedirectTo] = useState<string>();

  useEffect(() => {
    // Try to exchange authorization code for access and id tokens.
    uauth
      .loginCallback()

      // Successfully logged and cached user in `window.localStorage`
      .then((response) => {
        console.log("sucess");
        console.log("loginCallback ->", response);
        setRedirectTo("/profile");
      })
      // Failed to exchange authorization code for token.
      .catch((error) => {
        console.error("callback error:", error);
        setRedirectTo("/login?error=" + error.message);
      });
  }, []);

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return (
    <>
      {" "}
      <br></br>
      <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-pink-600  text-3xl flex flex-wrap justify-center items-center h-screen">
        <ClockLoader color="#007aff" loading={true} size={40} />
        &nbsp; &nbsp; &nbsp; Logging in...
      </h1>
    </>
  );
};

export const Profile: React.FC<RouteProps> = () => {
  var address;

  const [user, setUser] = useState<any>();

  const [loading, setLoading] = useState(false);

  const [redirectTo, setRedirectTo] = useState<string>();

  useEffect(() => {
    uauth
      .user()
      .then(setUser)

      .catch((error) => {
        console.error("profile error:", error);
        setRedirectTo("/login?error=" + error.message);
      });
  }, []);

  const handleLogoutButtonClick: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    console.log("logging out!");
    setLoading(true);
    uauth
      .logout({
        beforeRedirect(url: string) {
          // alert(url)
        },
      })
      .catch((error) => {
        console.error("profile error:", error);
        setLoading(false);
      });
  };

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  if (!user || loading) {
    return (
      <>
        {" "}
        <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-pink-600 text-3xl flex flex-wrap justify-center items-center h-screen">
          <ClockLoader color="#007aff" loading={true} size={40} />
          &nbsp; &nbsp; &nbsp; Logging out...
        </h1>
      </>
    );
  }
  address = user.wallet_address;
  return (
    <>
      {console.log(JSON.stringify(user, null, 2))}

      <div className="overflow-visible">
        <div className="flex flex-row">
          <Button
            style={{ position: "absolute", left: "90%", margin: "3px" }}
            variant="outlined"
            color="primary"
            onClick={handleLogoutButtonClick}
            className="w-28"
          >
            Logout
          </Button>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <p className="text-xl ">
            Logged in as:<strong> {user.sub} </strong>
          </p>
        </div>
      </div>
      {console.log(address)}
      <div>
        <Navhan />
      </div>
      {/*<MyApp Component={undefined} pageProps={undefined}/>*/}
      {/*<pre>{JSON.stringify(user, null, 2)}</pre>*/}
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/callback" component={Callback} />
        <Route path="/profile" component={Profile} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
