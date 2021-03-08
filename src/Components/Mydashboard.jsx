import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal} from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import AddIcon from '@material-ui/icons/Add';
import logo from "./jb1.png";



import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const Mydashboard = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [schoolName, setSchoolName]= useState();
    const [phone, setPhone]= useState();
    const [address, setAddress]= useState();
    const [email, setEmail]= useState();
    const [administratordata, setadministratordata]= useState([]);
    const [studentdata, setStudentdata]= useState([]);
    const [schooldata, setSchooldata]= useState([]);
    const admin_id = localStorage.getItem("admin_id");
    const school_id = localStorage.getItem("school_id");
    
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/student/${school_id}`)
        .then(response => {
            console.log(response);
            setStudentdata(response.data);
        })
        .catch(error => (console.log(error)))

    },[])
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/schools/${admin_id}`)
        .then(response => {
            console.log(response.data)
            setSchooldata(response.data)
        })
        .catch(error => console.log(error) )

    },[]) 
    
      
        
    
    return (
        <>
            <div class="dashboard">
                <div class="left">
                    <div class="navigation">
                        <div class="wrapper2">
                            <div class="abilan">
                                <img src={logo}/>
                            </div>
        
                            <Link class="nav-link" to="/dashboard"><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas active fa-columns"></i>
                                </div>
                                <div class="icon-name1 active">Dashboard</div>
                            </div></Link>
                            
                            <Link class="nav-link" to="/school"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-school"></i>
                                </div>
                                <div class="icon-name1">Schools</div>
                            </div></Link>
                            {/* <div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <div class="icon-name nav-link"><Link to="/students">Students</Link></div>
                            </div>
                            <div class="folder-icons">
                                <div class="icon1">
                                <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name nav-link "><Link to="/finance" class="">Finance Employee </Link></div>
                            </div>
                            <div class="folder-icons">
                                <div class="icon1">
                                <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name nav-link "><Link to="/class" class="">Class </Link></div>
                            </div>
                    <div class="folder-icons">
                        <div class="icon1">
                            <i class="fas fa-user-graduate"></i>
                        </div>
                        <div class="icon-name nav-link"><Link to="/fee">Fee Generation</Link></div>
                    </div>
                    <div class="folder-icons">
                        <div class="icon1">
                        <i class="fas fa-wallet"></i>
                        </div>
                        <div class="icon-name nav-link "><Link to="/feeperiod" >Fee Period</Link></div>
                    </div>
                    <div class="folder-icons">
                        <div class="icon1">
                        <i class="fas fa-wallet"></i>
                        </div>
                        <div class="icon-name nav-link "><Link to="/structure">Fee Structure</Link></div>
                    </div> */}


                        </div>
                    </div>
                </div>
                <div class="right-side">
                    <div class="right-header">
                        <div class="top-bar">
                            <div class="top-bar-justify">
                                <div class="big-inbox">
                                    School Administrator
                        </div>
                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">
                        <div class="scroll-cards">
                            <div class="card">
                                <div class="mails">
                                    <div class="mail-names">
                                        Schools Active
                            </div>

                                </div>
                                <div class="mail-info">
                                    {schooldata.length} Schools all over Pakistan

                        </div>
                                <div>
                                </div>

                            </div>
                            <div class="card">
                                <div class="mails">
                                    <div class="mail-names">
                                        Active Students
                            </div>

                                </div>
                                <div class="mail-info">
                                    {studentdata.length} Students
                        </div>
                                <div>
                                </div>
                            </div>
                            {/* <div class="card">
                                <div class="mails">
                                    <div class="mail-names">
                                        Visits
                                    </div>
                                </div>
                                <div class="mail-info">
                                    100K+ Visits Per Day
                                </div>
                                <div>
                                </div>
                            </div> */}
                        </div>
                        <div class="message">
                        
                            <div class="table-responsive">
                                        
                                        


                                                   

         

                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">NAME</th>
                                            <th class="border-top-0">Contact</th>
                                            <th class="border-top-0">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { schooldata.map ((val, i)=> {
                                            return (
                                                <tr key={i}>
                                                    <td>{val.id}</td>
                                                    <td class="txt-oflo">{`${val.name}`}</td>
                                                    <td>{val.contact}</td>
                                                    <td class="txt-oflo">{val.email}</td>
                                                </tr>
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
export default Mydashboard;