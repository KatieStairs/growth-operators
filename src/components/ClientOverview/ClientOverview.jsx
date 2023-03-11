import React from 'react';
import { useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

/*
Questions for group:
- When see details is clicked, the user is brought to this page right?
- So an ID should be sent with the button click I'm assuming?
*/

function ClientOverview() {

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: 'SAGA/GET_CLIENT_OVERVIEW',
    })
  }, [])

  return (
    <div className="container">
      <p>Client overview goes here</p>
    </div>
  );
}

export default ClientOverview;
