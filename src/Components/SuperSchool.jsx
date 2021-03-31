import { React, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import logo from "./jb1.png";
import './dashboard.css';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DescriptionIcon from '@material-ui/icons/Description';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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
const SuperSchool = () => {
    const classes = useStyles();
    const [schooldata, setSchooldata] = useState([]);
    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [schoolName, setSchoolName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [adminid, setAdminid] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [administratordata, setAdministratordata] = useState([]);

    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/user`)
            .then(response => {
                console.log(response.data)
                setAdministratordata(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
    }, [])


    var admin = []
    for (var i = 0; i < administratordata.length; i++) {
        if ((administratordata[i].type).slice(11, 40) === "SchoolAdministrator") {
            var admindata = {
                admin_id: administratordata[i].id,
                name: administratordata[i].first_name + " " + administratordata[i].last_name
            }
            admin.push(admindata)
        }
    }
    // const sendData = () => {
    //     const formData = new FormData();
    //     formData.append('file', selectedFile);
    //     formData.append('admin_id', adminid);
    //     formData.append('contact', phone);
    //     formData.append('address', address);
    //     formData.append('email', email);
    //     formData.append('name', schoolName);
    //     axios({
    //         method: "post",
    //         url: "http://fee-management-api.nastechltd.co/api/schools",
    //         data: formData,
    //         headers: { "Content-Type": "multipart/form-data" },
    //     })
    //         .then(response => {
    //             //handle success
    //             console.log(response);
    //             setSelectedFile();

    //             alert("Submitted!!")

    //         })
    //         .catch(error => {
    //             //handle error
    //             console.log(error);
    //         });
    // }
    const sendData = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('admin_id', adminid);
        formData.append('name', schoolName);
        formData.append('contact', phone);
        formData.append('address', address);
        formData.append('email', email);
        console.log(formData.get('name'))
        if (schoolName == '') {
            alert("Enter School Name")
        }
        else if (address == '') {
            alert("Enter School Address")
        }
        else if (phone == '') {
            alert("Enter School Contact No.")
        }
        else if (adminid == '') {
            alert("Select School Admin")
        }
        else if (selectedFile == undefined) {
            alert("Select School School Logo")
        }
        else {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {

                axios({
                    method: "post",
                    url: "http://fee-management-api.nastechltd.co/api/schools",
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                })
                    .then(function (response) {
                        //handle success
                        console.log(response);
                        setSelectedFile();
                        setSchoolName('');
                        setPhone('');
                        setAddress('');
                        setEmail('');
                        setAdminid('')
                        handleClose('');
                    })
                    .catch((error) => {
                        if (error.response) {
                            alert(error.response.data.message);
                        }
                    })
            }
            else {
                alert("Enter Valid Email")
            }
        }
    }


    // const sendData = () => {
    //     axios.post('http://fee-management-api.nastechltd.co/api/schools', {
    //         file: selectedFile,
    //         admin_id: adminid,
    //         contact: phone,
    //         address: address,
    //         email: email,
    //         name: schoolName
    //     })
    //         .then(response => {
    //             console.log(response)
    //             console.log(response.data.id);
    //             setSchoolName();
    //             setPhone();
    //             setAddress();
    //             setEmail();
    //             setAdminid()
    //             handleClose();
    //             // reload();
    //         })
    //         .catch(error => {
    //             console.log(error)
    //             alert("Invali Field(s)")
    //         })
    // }


    // useEffect(() => {
    //     axios.get(`http://fee-management-api.nastechltd.co/api/schools`)
    //         .then(response => {
    //             console.log(response.data)
    //             setSchooldata(response.data)
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 alert(error.response.data.message);
    //             }
    //         })
    // }, [])

    var count = 0;

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

                            <Link class="nav-link" to="/super"><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas fa-columns"></i>
                                </div>
                                <div class="icon-name1">Administrators</div>
                            </div></Link>

                            <Link to="/superschool" class="nav-link active "><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas active fa-school"></i>
                                </div>
                                <div class="icon-name active">Schools</div>
                            </div></Link>
                        </div>
                    </div>
                </div>
                <div class="right-side">
                    <div class="right-header">
                        <div class="top-bar">
                            <div class="top-bar-justify">
                                <div class="big-inbox">
                                    Schools
                                </div>
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>

                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">
                        <div class="message">
                            <div class="add-student">
                                <button type="button" onClick={handleShow} class="btn btn-primary btn-lg"><AddIcon /> Add School</button>
                            </div>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title className="text-center">School Registration</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div class="row billing-main">
                                        <div class="col-6 billing-box">
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="demo-simple-select-label">Administrator</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={adminid}
                                                    onChange={(e) => setAdminid(e.target.value)}
                                                >
                                                    {admin.map((val, i) => {
                                                        return (
                                                            <MenuItem value={val.admin_id}>{val.name}</MenuItem>
                                                        )

                                                    })}
                                                </Select>
                                            </FormControl>
                                            <TextField className="pb-3 bg-white" type="text" onChange={(e) => setSchoolName(e.target.value)} label="School Name" variant="filled" />
                                            <TextField className="pb-3 bg-white" type="number" onChange={(e) => setPhone(e.target.value)} label="Contact No." variant="filled" />
                                            <label htmlFor="logo">Upload School Logo:</label>
                                            <input id="logo" type="file" name="logo" onChange={(e) => setSelectedFile(e.target.files[0])} className="form-control w-100" />
                                        </div>

                                        <div class="col-6 billing-box">
                                            <TextField className="pb-3" type="email" onChange={(e) => setEmail(e.target.value)} label="Email" variant="filled" />
                                            <TextField className="pb-3" onChange={(e) => setAddress(e.target.value)} label="Address" multiline rows={1} variant="filled" />
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

                            <div class="table-responsive">
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">NAME</th>
                                            <th class="border-top-0">Show</th>
                                            <th class="border-top-0">Phone</th>
                                            <th class="border-top-0">Email</th>
                                            {/* <th class="border-top-0">Visit</th> */}
                                            {/* <th class="border-top-0">Action</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {administratordata.map((val, i) => {
                                            return (
                                                <>
                                                    {
                                                        (val.type).slice(11, 40) == "SchoolAdministrator" ?
                                                            <tr key={i}>
                                                                <td>{count=1+count}</td>
                                                                <td class="txt-oflo print-capitalize">{`${val.first_name} ${val.last_name}'s Schools`}</td>
                                                                <td><Button onClick={() => history.push(`/adminschool/${val.id}`)}><DescriptionIcon /></Button></td>
                                                                <td>{val.contact}</td>
                                                                <td class="txt-oflo">{val.email}</td>
                                                                <td>
                                                                    {/* <ButtonGroup disableElevation variant="contained" color="primary">
      <Button className="student-btn-up" onClick={()=>update(val.id)}  ><UpdateIcon  className="text-white"/></Button>
      <Button className="student-btn-del" onClick={()=>deleteAdministrator(val.id)} ><DeleteIcon className="text-white"/></Button>
    </ButtonGroup> */}
                                                                </td>
                                                            </tr>
                                                            :
                                                            null
                                                    }
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
export default SuperSchool;