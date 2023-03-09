import React, { useState } from 'react';
import {useSelector} from 'react-redux';


function CreateNewClientModal() {

    return(
    <div>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Create New Client
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Create New Client</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
            <div>
                <h5>Company Name</h5>
                <input
                type='text'
                // value={nameInput}
                // onChange={(evt) => setNameInput(evt.target.value)} 
                />
            </div>
            <div>
                <h5>Contact Person</h5>
                <input
                type='text'
                // value={nameInput}
                // onChange={(evt) => setNameInput(evt.target.value)} 
                />
            </div>
            <div>
            <h5>E-mail Address</h5>
                <input
                type='text'
                // value={nameInput}
                // onChange={(evt) => setNameInput(evt.target.value)} 
                />
            </div>
            <div>
            <h5>Engagement Date</h5>
                <input
                type='date'
                // value={nameInput}
                // onChange={(evt) => setNameInput(evt.target.value)} 
                />
            </div>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Submit</button>
            </div>
        </div>
        </div>
        </div>
        {/* <div className="grid-col grid-col_4">
        <button type="button" class="btn btn-primary">Create New Client</button>
        </div> */}

    </div>

    );
}

export default CreateNewClientModal
