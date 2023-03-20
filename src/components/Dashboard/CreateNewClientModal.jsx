import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function CreateNewClientModal() {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);

    const [companyNameInput, setCompanyNameInput] = useState('');
    const [contactPersonInput, setContactPersonInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [dateInput, setDateInput] = useState('');

    const handleSubmit = (event) => {
        // event.preventDefault();
        const id = user.id
        let newCompany = {
            companyName: companyNameInput,
            contactPerson: contactPersonInput,
            emailInput: emailInput,
            date: dateInput,
            userId: id
        }
        // console.log('new company', newCompany)
        dispatch({ 
            type: 'SAGA/POST_CLIENT',
            payload: newCompany
        });
        clearNewClientForm();
    }
    const handleFormInputClick = () =>{
        // console.log('clicked input dummy data for create new client');
        setCompanyNameInput('Prime Digital Academy');
        setContactPersonInput('Matthew Black');
        setEmailInput('Matt@Prime.com');
    }
    const clearNewClientForm = () => {
        setCompanyNameInput('');
        setContactPersonInput('');
        setEmailInput('');
        setDateInput('');
    }

    return(
    <div className="mb-3">
        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#newClientModal">
            Create New Client
        </button>

        <div className="modal fade" id="newClientModal" tabIndex="-1" aria-labelledby="newClientModalLabel" aria-hidden="true">
        <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title" id="newClientModalLabel">Create New Client</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <div className="mb-3">
                <label htmlFor="create-client-company-name-input" className="form-label">
                    <h5 onClick={() => handleFormInputClick()}>Company Name</h5>
                </label>
                <input
                type='text'
                id="create-client-company-name-input"
                value={companyNameInput}
                onChange={(evt) => setCompanyNameInput(evt.target.value)} 
                />
            </div>
            <div className="mb-3">
                <label htmlFor="create-client-company-contact-input" className="form-label">
                    <h5>Contact Person</h5>
                </label>
                <input
                type='text'
                id="create-client-company-contact-input"
                value={contactPersonInput}
                onChange={(evt) => setContactPersonInput(evt.target.value)} 
                />
            </div>
            <div className="mb-3">
                <label htmlFor="create-client-company-email-input" className="form-label">
                    <h5>E-mail Address</h5>
                </label>
                <input
                type='text'
                id="create-client-company-email-input"
                value={emailInput}
                onChange={(evt) => setEmailInput(evt.target.value)} 
                />
            </div>
            <div>
                <label htmlFor="create-client-engagement-date-input" className="form-label">
                    <h5>Engagement Date</h5>
                </label>
                <input
                type='date'
                id="create-client-engagement-date-input"
                // placeholder="year-mm-dd"
                value={dateInput}
                onChange={(evt) => setDateInput(evt.target.value)} 
                />
            </div>
            </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit} data-bs-dismiss="modal">Submit</button>
            </div>
        </div>
        </div>
        </div>
        {/* <div className="grid-col grid-col_4">
        <button type="button" className="btn btn-primary">Create New Client</button>
        </div> */}

    </div>

    );
}

export default CreateNewClientModal
