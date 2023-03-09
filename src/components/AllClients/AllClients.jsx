import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

function AllClients() {
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');

  return (
    <>
    <div className="container">

    </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Client Name</th>
            <th scope="col">Engagement Start</th>
            <th scope="col">Status</th>
            <th scope="col">Operators</th>
            <th scope="col">Archive</th>
            <th scope="col">See Details</th>
            <th scope="col">Edit</th> {/*Modal?*/}
            <th scope="col">Delete</th> {/*Popup confirmation*/}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default AllClients;