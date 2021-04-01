import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import logo from './jb1.png';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '35ch',
        },
    },
}));

const FeePeriod = () => {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [billing, setBilling] = useState();
    const [billingperiod, setBillingperiod] = useState([]);
    const [due, setDue] = useState();
    const [prevdata, setPrevdata] = useState('');
    const [generate, setGenerate] = useState();
    const [latefee, setLatefee] = useState();
    const school_id = localStorage.getItem("school_id")
    const history = useHistory();
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const handleClick = (id) => {
        localStorage.setItem("user_id", id)
        handleShow2();
    }
    const remove = () => {
        localStorage.removeItem("user_id")
        handleClose2();
    }

    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_billing_period/${school_id}`)
            .then(response => {
                console.log(response.data);
                setBillingperiod(response.data);

            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
    }, [])
    const reload = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_billing_period/${school_id}`)
            .then(response => {
                console.log(response.data);
                setBillingperiod(response.data);

            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
    }
    const deletePeriod = (id) => {
        axios.delete(`http://fee-management-api.nastechltd.co/api/billing_period/${localStorage.getItem("user_id")}`)
            .then(response => {
                console.log(response);
                remove();
                reload();
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
    }
    const update = (id) => {
        axios.get(`http://fee-management-api.nastechltd.co/api/billing_period/${id}`)
            .then(response => {
                console.log(response.data);
                setPrevdata(response.data);
                setDue(response.data.due_date)
                setGenerate(response.data.generation_date)
                setBilling(response.data.phase)
                setLatefee(response.data.late_fee_charge)
                handleShow();
            })

            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
    }

    const sendUpdated = () => {
        if (billing < 0 || billing > 12) {
            alert("Months Can Only Be From 1-12")
        }
        else if (generate < 0 || generate > 28) {
            alert("Generation date can only be from 1-28")
        }
        else if (due < 0 || due > 28) {
            alert("Due date can only be from 1-28")
        }
        else if (latefee < 0) {
            alert("charges can't be negative")
        }
        else {
            axios.put(`http://fee-management-api.nastechltd.co/api/billing_period/${prevdata.id}`, {
                phase: billing,
                generation_date: generate,
                due_date: due,
                late_fee_charge: latefee,
                school_id: localStorage.getItem("school_id")

            })
                .then(response => {
                    console.log(response.data);
                    setPrevdata('');
                    setDue();
                    setGenerate();
                    setBilling();
                    setLatefee();
                    handleClose();
                    reload();
                })
                .catch((error) => {
                    if (error.response) {
                        alert(error.response.data.message);
                    }
                })
        }

    }

    const data = {
        school_id: localStorage.getItem("school_id"),
        phase: billing,
        generation_date: generate,
        due_date: due,
        late_fee_charge: latefee
    }
    const sendData = () => {
        if (billing < 0 || billing > 12) {
            alert("Months Can Only Be From 1-12")
        }
        else if (generate < 0 || generate > 28) {
            alert("Generation date can only be from 1-28")
        }
        else if (due < 0 || due > 28) {
            alert("Due date can only be from 1-28")
        }
        else if (latefee < 0) {
            alert("charges can't be negative")
        }
        else {
            axios.post(`http://fee-management-api.nastechltd.co/api/billing_period`, data)
                .then(response => {
                    console.log(response);
                    setDue();
                    setGenerate();
                    setBilling();
                    setLatefee();
                    reload();
                })
                .catch((error) => {
                    if (error.response) {
                        alert(error.response.data.message);
                    }
                })
        }

    }
    // console.log(billingperiod)



    const logOut = () => {
        localStorage.clear();
        history.push("/")
    }


    return (
        <>
            <div class="dashboard">
                <div class="left">
                    <div class="navigation">
                        <div class="wrapper2">
                            <div class="abilan">
                                <img
                                    src={logo} />
                            </div>

                            <Link to="/campusdashboard" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas  fa-columns"></i>
                                </div>
                                <div class="icon-name1 ">Dashboard</div>
                            </div></Link>
                            <Link to="/admissioncomponents" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas fa-school"></i>
                                </div>
                                <div class="icon-name1">Admission</div>
                            </div></Link>

                            <Link class="nav-link" to="/class"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-users-class"></i>
                                </div>
                                <div class="icon-name">Class</div>
                            </div></Link>

                            <Link class="nav-link" to="/students"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <div class="icon-name">Students</div>
                            </div></Link>
                            <Link class="nav-link" to="/finance"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-tie"></i>
                                </div>
                                <div class="icon-name">Finance Employee</div>
                            </div></Link>
                            <Link class="nav-link" to="/feecomponents"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-money-check-alt active"></i>
                                </div>
                                <div class="icon-name active">Fee</div>
                            </div></Link>
                            <Link class="nav-link" to="/feevoucheradmin"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-print"></i>
                                </div>
                                <div class="icon-name">Fee Voucher</div>
                            </div></Link>
                            <Link class="nav-link" to="/adminledger"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-calculator-alt"></i>
                                </div>
                                <div class="icon-name">Student Ledger</div>
                            </div></Link>
                            <Link class="nav-link" to="/term"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-calendar-alt"></i>
                                </div>
                                <div class="icon-name">Term</div>
                            </div></Link>
                            <Link class="nav-link" to="/expense"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-receipt"></i>
                                </div>
                                <div class="icon-name">Expense Tracking</div>
                            </div></Link>



                        </div>
                    </div>
                </div>
                <div class="right-side">
                    <div class="right-header">
                        <div class="top-bar">
                            <div class="top-bar-justify">
                                <div class="big-inbox">
                                    Billing Period
                        </div>
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>

                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">

                        <div class="message">
                            <div class="add-student">
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Update Fee Period</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3" type="number" defaultValue={prevdata.phase} onChange={(e) => setBilling(e.target.value)} helperText="Month" label="Billing Period" variant="filled" />
                                                <TextField className="pb-3" type="number" defaultValue={prevdata.due_date} onChange={(e) => setDue(e.target.value)} helperText="The day Fee to be expired" label="Due Date" variant="filled" />
                                            </div>

                                            <div class="col-6 billing-box">
                                                <TextField type="number" className="pb-3" defaultValue={prevdata.late_fee_charge} onChange={(e) => setLatefee(e.target.value)} helperText=" " label="Late Fee Charges" variant="filled" />
                                                <TextField className="pb-3" type="number" defaultValue={prevdata.generation_date} onChange={(e) => setGenerate(e.target.value)} helperText="The day Fee to be Generated" label="Generation Date" variant="filled" />

                                            </div>
                                        </div>


                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn btn-secondary" onClick={handleClose}>
                                            Close
                                            </button>
                                        <button onClick={sendUpdated} className="btn btn-primary">Update</button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal show={show2} onHide={remove}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Confirmation</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="row">
                                            <div className="col-12">
                                                <h2 className="text-center">Are You Sure You Want To Delete?</h2>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn btn-secondary" onClick={remove}>
                                            Close
                                            </button>
                                        <button onClick={deletePeriod} className="btn btn-primary">Yes</button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            {billingperiod.length > 0 ?

                                <>
                                    <div class="table-responsive">

                                        <table class="table no-wrap">
                                            <thead>
                                                <tr>
                                                    <th class="border-top-0">#</th>
                                                    <th class="border-top-0">Phase</th>
                                                    <th class="border-top-0">Generation Date</th>
                                                    <th class="border-top-0">Due Date</th>
                                                    <th class="border-top-0">Late Charges</th>
                                                    <th class="border-top-0">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {billingperiod.map((val, i) => {
                                                    return (
                                                        <>
                                                            <tr key={i}>
                                                                <td>{val.id}</td>
                                                                <td>{val.phase}</td>
                                                                <td>{val.generation_date}</td>
                                                                <td class="txt-oflo">{val.due_date}</td>
                                                                <td>{val.late_fee_charge}</td>
                                                                <td>
                                                                    <ButtonGroup disableElevation variant="contained" color="primary ">
                                                                        <Button className="student-btn-up" onClick={() => update(val.id)}   ><UpdateIcon className="text-white" /></Button>
                                                                        <Button className="student-btn-del" onClick={() => handleClick(val.id)}><DeleteIcon className="text-white" /></Button>
                                                                    </ButtonGroup>
                                                                </td>

                                                            </tr>
                                                        </>
                                                    )
                                                })}

                                            </tbody>
                                        </table>
                                    </div>
                                </>

                                :
                                <>

                                    <h2 class="text-center mt-3 secondary">Billing Period</h2>
                                    <hr class="new-hr1 secondary" />

                                    <div class="row billing-main">
                                        <div class="col-4 billing-box">
                                            <TextField className="pb-3" type="number" onChange={(e) => setBilling(e.target.value)} helperText="Month" label="Billing Period" variant="filled" />
                                            <TextField className="pb-3" type="number" onChange={(e) => setDue(e.target.value)} helperText="The day Fee to be expired" label="Due Date" variant="filled" />
                                        </div>

                                        <div class="col-4 billing-box">
                                            <TextField type="number" className="pb-3" onChange={(e) => setLatefee(e.target.value)} helperText=" " label="Late Fee Charges" variant="filled" />
                                            <TextField className="pb-3" type="number" onChange={(e) => setGenerate(e.target.value)} helperText="The day Fee to be Generated" label="Generation Date" variant="filled" />

                                        </div>
                                    </div>

                                    <div class="text-center my-4">  <button class="btn btn-generate btn-success" onClick={sendData}>Submit</button></div>
                                </>

                            }

                        </div>


                    </div>
                </div>
            </div>
        </>
    );
};
export default FeePeriod;