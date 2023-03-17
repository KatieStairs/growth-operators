import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';


function LoginPage() {
  const history = useHistory();

  return (
    <div className="text-center border border-2 rounded w-50 m-auto mt-5 bg-light">
      <LoginForm />
      <center>
        <button
          type="button"
          className="btn btn_asLink border border-2 rounded mb-2"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
    </div>
  );
}

export default LoginPage;
