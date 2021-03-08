import { React, useEffect } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import logo from './jb1.png'
import { useState } from 'react';
import axios from 'axios'
import { SportsEsportsOutlined } from '@material-ui/icons';

const Structure = () => {
    const [feedata, setFeedata] = useState([]);
    const [chargesdata, setChargesdata] = useState([]);
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/fee_structure`)
            .then(response => {
                setFeedata(response.data)
                
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }, [])
    // useEffect(() => {
    //     axios.get(`http://fee-management-api.nastechltd.co/api/monthly_charges`)
    //         .then(response => {
    //             console.log(response.data)
    //             setChargesdata(response.data)

    //         })
    //         .catch(error => console.log(error))
    // }, [])



    var mydata = []
    for (var i = 0; i < feedata.length; i++) {
            axios.get(`http://fee-management-api.nastechltd.co/api/monthly_charges/${feedata[i].id}`)
                .then(response => {
                    console.log(response.data)
                    // setChargesdata(response.data)
    
                })
                .catch(error => console.log(error))
        
        for (var j = 0; j < chargesdata.length; j++) {
            var objectdata = {
                id: feedata[i].id,
                class_id: feedata[i].class_id,
                school_id: feedata[i].school_id,
                tax: feedata[i].tax,
                totalmonthlyCharges: feedata[i].total_monthly_charges,
                totalyearlyCharges: feedata[i].total_yearly_charges,
                monthlyCharges: [],
                yearlyCharges: [],
            }
            if (feedata[i].id == chargesdata[j].fee_structure_id) {
                objectdata.monthlyCharges.push(chargesdata[j].monthly_charges)
                objectdata.yearlyCharges.push(chargesdata[j].yearly_charges)

            }
        }
        mydata.push(objectdata)
    }
    // console.log(mydata)
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

                            {/* <div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-school"></i>
                                </div>
                                <div class="icon-name"><Link  class="nav-link"to="/school">Campuses</Link></div>
                            </div> */}
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
                                    <i class="fas fa-wallet active"></i>
                                </div>
                                <div class="icon-name active">Fee Structure</div>
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
                                    <i class="fas fa-wallet"></i>
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
                                    Fee
                                </div>
                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">

                        <div class="message">
                            <div class="add-student1">
                                <Link to="/fee"> <button type="button" class="btn mb-1 btn-primary btn-lg"><AddIcon /> Add Structure</button></Link>
                            </div>
                            <div class="show_fee">

                                <div class="fee_card shadow rounded mx-2 my-3">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Class</th>
                                                <th scope="col">Monthly</th>
                                                <th scope="col">Yearly</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>567</td>
                                                <td>67</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                    <div className="col text-center my-3">
                                        <ButtonGroup disableElevation variant="contained" color="primary ">
                                            <Button className="student-btn-up"   ><UpdateIcon className="text-white" /></Button>
                                            <Button className="student-btn-del"  ><DeleteIcon className="text-white" /></Button>
                                        </ButtonGroup>
                                    </div>
                                </div>

                                <div class="fee_card shadow mx-2 rounded my-3">
                                    <div className="col">
                                        <span>Class:</span>
                                        <span>1</span>
                                    </div>
                                    <div className="col">
                                        <span>Monthly Charges:</span>
                                        <span>4556</span>
                                    </div>

                                    <div className="col">
                                        <span>Yearly Charges:</span>
                                        <span>4556</span>
                                    </div>
                                    <div className="col text-center mb-3">
                                        <ButtonGroup disableElevation variant="contained" color="primary ">
                                            <Button className="student-btn-up"   ><UpdateIcon className="text-white" /></Button>
                                            <Button className="student-btn-del"  ><DeleteIcon className="text-white" /></Button>
                                        </ButtonGroup>
                                    </div>
                                </div>

                                <div class="fee_card shadow mx-2 rounded my-3">
                                    <div className="col">
                                        <span>Class:</span>
                                        <span>1</span>
                                    </div>
                                    <div className="col">
                                        <span>Monthly Charges:</span>
                                        <span>4556</span>
                                    </div>

                                    <div className="col">
                                        <span>Yearly Charges:</span>
                                        <span>4556</span>
                                    </div>
                                    <div className="col text-center mb-3">
                                        <ButtonGroup disableElevation variant="contained" color="primary ">
                                            <Button className="student-btn-up"   ><UpdateIcon className="text-white" /></Button>
                                            <Button className="student-btn-del"  ><DeleteIcon className="text-white" /></Button>
                                        </ButtonGroup>
                                    </div>
                                </div>
                                <div class="fee_card shadow mx-2 rounded my-3">
                                    <div className="col">
                                        <span>Class:</span>
                                        <span>1</span>
                                    </div>
                                    <div className="col ">
                                        <span>Monthly Charges:</span>
                                        <span>4556</span>
                                    </div>

                                    <div className="col ">
                                        <span>Yearly Charges:</span>
                                        <span>4556</span>
                                    </div>
                                    <div className="col text-right my-3">
                                        <ButtonGroup disableElevation variant="contained" color="primary ">
                                            <Button className="student-btn-up"   ><UpdateIcon className="text-white" /></Button>
                                            <Button className="student-btn-del"  ><DeleteIcon className="text-white" /></Button>
                                        </ButtonGroup>
                                    </div>
                                </div>







                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

};
export default Structure;