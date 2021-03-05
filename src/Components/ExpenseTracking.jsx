import { React, useEffect, useState } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import logo from './jb1.png'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '30ch'

        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const MyExpense = () => {
    const [expensedata, setExpensedata] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const classes = useStyles();
    const [studentdata, setStudentdata] = useState([]);
    const [studentname, setStudentname] = useState();
    const [studentid, setStudentid] = useState('');
    const [charges, setCharges] = useState();
    const [paid, setPaid] = useState();
    const [description, setDescription] = useState();
    const school_id = localStorage.getItem("school_id")
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/student/${school_id}`)
            .then(response => {
                console.log(response);
                setStudentdata(response.data);

            })
            .catch(error => (console.log(error)))

    }, [])


    if (studentid.length != 0) {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_student/${studentid}`)
            .then(response => {
                setStudentname(`${response.data.first_name} ${response.data.last_name}`);

            })
            .catch(error => (console.log(error)))
    }





    const data = {
        school_id : school_id,
        student_id: studentid,
        charges: charges,
        description: description,
        name: studentname,
        paid: 0
    }
    const sendData = () => {
        axios.post(`http://fee-management-api.nastechltd.co/api/expense_tracking`, data)
            .then(response => {
                console.log(response);
                handleClose();
                reload();

            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/expense_tracking/${school_id}`)
            .then(response => {
                console.log(response);
                setExpensedata(response.data)
            })
            .catch(error => console.log(error))

    }, [])

    const reload = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/expense_tracking/${school_id}`)
            .then(response => {
                setExpensedata(response.data)
            })
            .catch(error => console.log(error))
    }


    const sendpay = (id) => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_expense_tracking/${id}`)
            .then(response => {
                console.log(response.data);
                axios.put(`http://fee-management-api.nastechltd.co/api/expense_tracking/${id}`, {
                    description: response.data.description,
                    charges: response.data.charges,
                    student_id: response.data.student_id,
                    name: response.data.name,
                    paid: 1
                })
                    .then(response => {
                        console.log(response.data);
                        reload();
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }
    const update = (id) => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_expense_tracking/${id}`)
            .then(response => {
                console.log(response.data)
                localStorage.setItem("id", response.data.id)
                localStorage.setItem("charges", response.data.charges)
                localStorage.setItem("description", response.data.description)
                setCharges(response.data.charges)
                setDescription(response.data.description)
                setStudentname(response.data.name)
                setStudentid(response.data.student_id)
                setPaid(response.data.paid)
                handleShow1();
                //   setSection(response.data.name)
            })
            .catch(error => console.log(error))
    }
    const sendUpdated = () => {
        axios.put(`http://fee-management-api.nastechltd.co/api/expense_tracking/${localStorage.getItem("id")}`, {
         charges : charges,
         description : description,
         name : studentname,
         paid : paid,
         student_id : studentid
        })
            .then(response => {
                console.log(response);
                localStorage.removeItem("id")
                localStorage.removeItem("charges")
                localStorage.removeItem("description")
                reload();
                handleClose1();
            })
            .catch(error => console.log(error))
    }
    const deleteExpense = (id) => {
        axios.delete(`http://fee-management-api.nastechltd.co/api/expense_tracking/${id}`)
            .then(response => {
                console.log(response)
                reload();
            })
            .catch(error => {
                console.log(error)
                alert("First Delete Students Of This Class")
            })
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

                            <Link to="/dashboard" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas  fa-columns"></i>
                                </div>
                                <div class="icon-name1 ">Dashboard</div>
                            </div></Link>
                            <Link class="nav-link" to="/class"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate"></i>
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
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Finance Employee</div>
                            </div></Link>
                            <Link class="nav-link" to="/fee"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Fee Generation</div>
                            </div></Link>
                            <Link class="nav-link" to="/feeperiod"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Fee Period</div>
                            </div></Link>
                            <Link class="nav-link" to="/structure"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Fee Structure</div>
                            </div></Link>
                            <Link class="nav-link" to="/discounted"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Discounted</div>
                            </div></Link>
                            <Link class="nav-link" to="/term"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Term</div>
                            </div></Link>
                            <Link class="nav-link" to="/expense"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet active"></i>
                                </div>
                                <div class="icon-name active">Expense Tracking</div>
                            </div></Link>
                            <Link class="nav-link" to="/ledger"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Student Ledger</div>
                            </div></Link>


                        </div>
                    </div>
                </div>
                <div class="right-side">
                    <div class="right-header">
                        <div class="top-bar">
                            <div class="top-bar-justify">
                                <div class="big-inbox">
                                    Expense Tracking
                        </div>
                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">

                        <div class="message">
                            <div class="add-student">
                                <button type="button" onClick={handleShow} class="btn btn-primary btn-lg"><AddIcon /> Add More</button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title className="text-center">Add Expense</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div class="col-4 billing-box">
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-label">Student</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        value={studentid}
                                                        onChange={(e) => setStudentid(e.target.value)}
                                                    >


                                                        {studentdata.map((val, i) => {
                                                            return (
                                                                <MenuItem value={val.id}>{`${val.first_name} ${val.last_name}`}</MenuItem>
                                                            )

                                                        })}
                                                    </Select>
                                                </FormControl>
                                                <TextField className="pb-3" type="number" onChange={(e) => setCharges(e.target.value)} label="Charges" variant="filled" />
                                            </div>

                                            <div class="col-4 billing-box">
                                                <TextField className="pb-3" type="text" label="Description" onChange={(e) => setDescription(e.target.value)} variant="filled" />

                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn btn-secondary" onClick={handleClose}>
                                            Close
                                        </button>
                                        <button onClick={sendData} className="btn btn-primary">Create</button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal show={show1} onHide={handleClose1}>
                                    <Modal.Header closeButton>
                                        <Modal.Title className="text-center">Update Expense</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div class="col-6 billing-box">

                                                <TextField className="pb-3" type="number" defaultValue={localStorage.getItem("charges")} onChange={(e) => setCharges(e.target.value)} label="Charges" variant="filled" />
                                            </div>

                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3" type="text" defaultValue={localStorage.getItem("description")} label="Description" onChange={(e) => setDescription(e.target.value)} variant="filled" />

                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn btn-secondary" onClick={handleClose1}>
                                            Close
                                        </button>
                                        <button onClick={sendUpdated} className="btn btn-primary">Update</button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            <div class="table-responsive">
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">NAME</th>
                                            <th class="border-top-0">Description</th>
                                            <th class="border-top-0">Charged</th>
                                            <th class="border-top-0">Status</th>
                                            <th class="border-top-0">Action</th>
                                            <th class="border-top-0">Update/Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {expensedata.map((val, i) => {
                                            return (
                                                <>
                                                    <tr key={i}>
                                                        <td>{val.id}</td>
                                                        <td class="txt-oflo">{val.name}</td>
                                                        <td>{val.description}</td>
                                                        <td>{val.charges}</td>
                                                        <td>
                                                            {val.paid == 1 ?
                                                                <span class="text-primary text-bolder">Paid</span>
                                                                :
                                                                <span class="text-danger text-bolder">Unpaid</span>
                                                            }
                                                        </td>
                                                        <td>
                                                            <ButtonGroup disableElevation variant="contained" color="primary">
                                                                <Button className="expense-btn-p " onClick={() => sendpay(val.id)}><span class="text-white text-bolder mb-1">Pay</span></Button>
                                                            </ButtonGroup>
                                                        </td>
                                                        <td>
                                                            <ButtonGroup disableElevation variant="contained" color="primary">
                                                                <Button className="student-btn-up" onClick={() => update(val.id)}  ><UpdateIcon className="text-white" /></Button>
                                                                <Button className="student-btn-del" onClick={() => deleteExpense(val.id)} ><DeleteIcon className="text-white" /></Button>
                                                            </ButtonGroup>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })}








                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </div>
                </div>
            </div>




        </>
    );
};
export default MyExpense;