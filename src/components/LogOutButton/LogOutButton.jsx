import React from 'react';
import { useDispatch } from 'react-redux';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <button
      className="btn btn_asLink border border-2 rounded py-2"
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
// old button code - adam
// return (
//   <button
//     // This button shows up in multiple locations and is styled differently
//     // because it's styled differently depending on where it is used, the className
//     // is passed to it from it's parents through React props
//     className={props.className}
//     onClick={() => dispatch({ type: 'LOGOUT' })}
//   >
//     Log Out
//   </button>
// );
// }
