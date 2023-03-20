import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
    <div className="text-center border border-2 rounded w-50 m-auto mt-5 bg-light">
      <RegisterForm />

      <center>
        <button
          type="button"
          className="btn border border-2 rounded mb-2"
          // className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button>
      </center>
    </div>
  );
}

export default RegisterPage;
