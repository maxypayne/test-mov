import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actions } from "../../context/redux";
import { login, signup } from "../../lib/api";

const Auth = () => {
  const [loginForm, setLoginForm] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);
  const [error, setError] = useState('');
  const dispatchFunc = useDispatch();
  const navigate = useNavigate();
  const submit = async(event: any) => {
    setIsWaiting(true);
    setError('');
    event.preventDefault();
    event.stopPropagation();
    const fields: Array<string> = [...!loginForm ? ['username'] : [],'email', 'password']
    const toSend: any = fields.reduce((acc, x, i) => ({...acc, [x]: event.target[i].value }), {});
    if(loginForm) {
      const data: any = await login(toSend).catch(() => null);
      if (data?.errMessage) {
        setError(data.errMessage);
      } else if(data) {
        dispatchFunc(actions.setUser(data));
        navigate('/');
      } else {
        setError('An error occured please try again');
      }
    } else {
      const data: any = await signup(toSend).catch(()=> null);
      if (data?.errMessage) {
        setError(data.errMessage);
      } else if(data) {
        setLoginForm(true);
      } else {
        setError('An error occured please try again');
      }
    }
    setTimeout(() => {
      setIsWaiting(false);
    }, 1500);
  }
  return (
    <div className="pageContainer auth">
      <div className="authContainer">
        <form className="authForm" onSubmit={submit}>
          {!loginForm && <input type="text" name="username" placeholder="Username"/> }
          <input type="email" name="email" placeholder="Email"/>
          <input type="password" name="password" placeholder="Mot de passe"/>
          <button disabled={isWaiting} className="authCta" type="submit">{loginForm ? 'Login' : 'Signup'}</button>
          <span className="suggestion" onClick={() => setLoginForm(!loginForm)}>{loginForm ? 'Don\'t have an account ?' : 'Already have an account ?'}</span>
          { error && <p className="error">{error}</p> }
        </form>
      </div>
    </div>
  )
}

export default Auth;