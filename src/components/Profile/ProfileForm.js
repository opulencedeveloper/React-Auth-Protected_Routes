import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import classes from './ProfileForm.module.css';

import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
 const newPasswordInputRef = useRef();
 const authCtx = useContext(AuthContext);

 const history = useHistory();

 const submitHandler = event => {
  event.preventDefault();
  const enteredNewPassword = newPasswordInputRef.current.value;

  fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBuL7n6YJj51J8jpTdnZpdgE79rcnB4MX0", 
  {
    method: 'POST',
    body: JSON.stringify({
      idToken: authCtx.token, 
      password: enteredNewPassword,
      retureSecureToken: false
    }),
    headers: {
      'Content-Type' : 'application/json'
    }
  }).then(res => {
    history.replace('/');
  });
 }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' maxLength="7" ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
