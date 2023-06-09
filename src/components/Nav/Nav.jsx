import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {

  return (
    <>
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-secondary" id="sidebar">
                <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                        <span className="fs-5 d-none d-sm-inline">nextLevel</span>
                    </a>
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        <li className="nav-item">
                            <a href="/dashboard" className="nav-link align-middle px-0 text-dark">
                                <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-dark">
                                <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Assessments</span> </a>
                            <ul className="collapse nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                <li className="w-100">
                                    <a href="assessment-form/1" className="nav-link px-0 text-dark"> <span className="d-none d-sm-inline">- Organizational Effectiveness</span></a>
                                </li>
                                <li>
                                    <a href="assessment-form/2" className="nav-link px-0 text-dark"> <span className="d-none d-sm-inline">- Employee Engagement</span></a>
                                </li>
                                <li>
                                    <a href="assessment-form/3" className="nav-link px-0 text-dark"> <span className="d-none d-sm-inline">- Training & Development</span></a>
                                </li>
                                <li>
                                    <a href="assessment-form/4" className="nav-link px-0 text-dark"> <span className="d-none d-sm-inline">- Benefits & Compensation</span></a>
                                </li>
                                <li>
                                    <a href="assessment-form/5" className="nav-link px-0 text-dark"> <span className="d-none d-sm-inline">- Recruiting & Staffing</span></a>
                                </li>
                                <li>
                                    <a href="assessment-form/6" className="nav-link px-0 text-dark"> <span className="d-none d-sm-inline">- HRIS, Payroll & Compliance</span></a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="/all-clients" className="nav-link px-0 align-middle text-dark">
                                <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">All Clients</span></a>
                        </li>
                    </ul>
                    <hr></hr>
                </div>
            </div>
            
    </>
  );
}

export default Nav;
