import React from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Input from "@iso/components/uielements/input";
import Checkbox from "@iso/components/uielements/checkbox";
import Button from "@iso/components/uielements/button";
import IntlMessages from "@iso/components/utility/intlMessages";
import { notification } from "@iso/components";
// import FirebaseLoginForm from '../../FirebaseForm/FirebaseForm';
import authAction from "@iso/redux/auth/actions";
import appAction from "@iso/redux/app/actions";
// import Auth0 from '../../Authentication/Auth0/Auth0';
// import {
//   signInWithGoogle,
//   signInWithFacebook,
// } from '@iso/lib/firebase/firebase.authentication.util';
import SignInStyleWrapper from "./SignIn.styles";

const { login } = authAction;
const { clearMenu } = appAction;

export default function SignIn(props) {
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.Auth.idToken);
  const errorMsg = useSelector((state) => state.Auth.errorMsg);

  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  React.useEffect(() => {
    console.log(isLoggedIn, "this is isLoggedIn");
    if (isLoggedIn) {
      setRedirectToReferrer(true);
    }    
  }, [isLoggedIn]);
  React.useEffect(() => {
    if(errorMsg){
      notification("error", errorMsg);
    }
  }, [errorMsg]);


  function handleLogin(e, token = false) {
    // e.preventDefault();
    if (!(email && password)) {
      notification("error", "Please fill in Username. and password");
      return;
    }
    if (token) {
      dispatch(login(token));
    } else {
      dispatch(login(email, password));
    }
    // dispatch(clearMenu());
    // history.push('/dashboard');
  }
  let { from } = location.state || { from: { pathname: "/dashboard" } };

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }
  return (
    <SignInStyleWrapper className="isoSignInPage">
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="page.signInTitle" />
            </Link>
          </div>
          <div className="isoSignInForm">
            <form>
              <div className="isoInputWrapper">
                <Input
                  size="large"
                  placeholder="Username"
                  autoComplete="true"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>

              <div className="isoInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="Password"
                  autoComplete="false"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
                <Button type="primary" onClick={handleLogin}>
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>

              {/* <p className="isoHelperText">
                <IntlMessages id="page.signInPreview" />
              </p> */}
            </form>
           
            <div className="isoCenterComponent isoHelperWrapper">
              <Link to="/forgotpassword" className="isoForgotPass">
                <IntlMessages id="page.signInForgotPass" />
              </Link>
              <Link to="/signup">
                <IntlMessages id="page.signInCreateAccount" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SignInStyleWrapper>
  );
}
