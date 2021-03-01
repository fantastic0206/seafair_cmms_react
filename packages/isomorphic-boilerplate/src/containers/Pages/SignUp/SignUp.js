import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from '@iso/components/uielements/input';
import Checkbox from '@iso/components/uielements/checkbox';
import Button from '@iso/components/uielements/button';
import authAction from '../../../redux/auth/actions';
// import appActions from '@iso/redux/app/actions';
 //import Auth0 from '../../Authentication/Auth0/Auth0';
import IntlMessages from '@iso/components/utility/intlMessages';
import notification from '@iso/components/Notification';
import SignUpStyleWrapper from './SignUp.styles';

const { signup } = authAction;
// const { clearMenu } = appActions;

export default function SignUp() {
  const dispatch = useDispatch();
  // const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordconfirm, setPasswordconfirm] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [termsChecked,setTermsChecked]=React.useState(false);

  const handleSignUp = (token = false) => {
   
    if(firstname==""){
      notification('error',"Please put the first name.");
      return;
    }
    if(lastname==""){
      notification('error',"Please put the last name.");
      return;
    }
    if(email==""){
      notification('error',"Please put the email address.");
      return;
    }
    if(password=="" || passwordconfirm=="" ){
      notification('error',"Please put the password.");
      return;
    }

    var sendData = {  
      strEmailAddress:email,
      password:password,
      passwordconfirm:passwordconfirm,
      strTelephone:phone,
      strFullName:firstname+" "+lastname
    }  
    dispatch(signup(sendData));   
  };
  return (
    <SignUpStyleWrapper className="isoSignUpPage">
      <div className="isoSignUpContentWrapper">
        <div className="isoSignUpContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="page.signUpTitle" />
            </Link>
          </div>

          <div className="isoSignUpForm">
            <div className="isoInputWrapper isoLeftRightComponent">
              <Input size="large"
                 placeholder="First name" value={firstname}
                  onChange={(event) => {
                    setFirstname(event.target.value);
                  }} />
              <Input size="large" 
                placeholder="Last name" 
                value={lastname}
                  onChange={(event) => {
                    setLastname(event.target.value);
                  }}
              />
            </div>

            <div className="isoInputWrapper">
              <Input size="large" 
              placeholder="Phone Number"
              value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
               />
            </div>

            <div className="isoInputWrapper">
              <Input size="large" 
              placeholder="Email"
              value={email}
              onChange={(event) => {
               setEmail(event.target.value);
                  }}
               />
            </div>

            <div className="isoInputWrapper">
              <Input size="large" type="password" 
              placeholder="Password"
              value={password}
              onChange={(event) => {
              setPassword(event.target.value);
                  }}
              />
            </div>

            <div className="isoInputWrapper">
              <Input
                size="large"
                type="password"
                placeholder="Confirm Password"
                value={passwordconfirm}
                onChange={(event) => {
                setPasswordconfirm(event.target.value);
                  }}
              />
            </div>

            <div className="isoInputWrapper" style={{ marginBottom: '50px' }}>
              <Checkbox checked={termsChecked} onChange={(event)=>{
                setTermsChecked(event.target.checked);
              }}>
                <IntlMessages id="page.signUpTermsConditions" />
              </Checkbox>
            </div>

            <div className="isoInputWrapper">
              <Button type="primary" onClick={handleSignUp} disabled={termsChecked?false:true}>
            {/* <Button type="primary" onClick={handleSignUp} disabled={true}> */}
                <IntlMessages id="page.signUpButton" />
              </Button>
            </div>
            <div className="isoInputWrapper isoOtherLogin">           
             
            </div>
            <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
              <Link to="/signin">
                <IntlMessages id="page.signUpAlreadyAccount" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SignUpStyleWrapper>
  );
}
