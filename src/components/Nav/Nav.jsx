import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div class="container-fluid">
    <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-secondary">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline">nextLevel</span>
                </a>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                        <a href="#" class="nav-link align-middle px-0 text-dark">
                            <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle text-dark">
                            <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Assessments</span> </a>
                        <ul class="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                            <li class="w-100">
                                <a href="#" class="nav-link px-0 text-dark"> <span class="d-none d-sm-inline">- Organizational Design</span></a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0 text-dark"> <span class="d-none d-sm-inline">- Employee Engagement</span></a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0 text-dark"> <span class="d-none d-sm-inline">- Training & Development</span></a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0 text-dark"> <span class="d-none d-sm-inline">- Benefits & Compensation</span></a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0 text-dark"> <span class="d-none d-sm-inline">- Recruiting & Staffing</span></a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0 text-dark"> <span class="d-none d-sm-inline">- HRIS, Payroll & Compliance</span></a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" class="nav-link px-0 align-middle text-dark">
                            <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">All Clients</span></a>
                    </li>
                </ul>
                <hr></hr>
                {/* <div class="dropdown pb-4">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="d-none d-sm-inline mx-1">Malik Ibrahim</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><a class="dropdown-item" href="#">New project...</a></li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr class="dropdown-divider"></hr>
                        </li>
                        <li><a class="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div> */}
            </div>
        </div>
        <div class="col py-3">
            Content area...
        </div>
    </div>
</div>
  );
}

export default Nav;
