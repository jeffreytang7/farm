import React, { Component } from 'react';
import './AccountInfo.css';
import axios from 'axios';
import { Container, Button, Label, Modal, Input } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Navbar from "../../Navbar/Navbar";

const renderLocation = (locations, index) => {
    return (
        <option>{locations.location}</option>
    )
}

const renderRoles = (roles, index) => {
    return (
        <option>{roles.role}</option>
    )
}

class AccountInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: {
               editOpen: false
            },

            name: '',
            farm: '',
            role: '',
            streetAddress: '',
            city: '',
            state: '',
            zipcode: '',

            roles: [
                { role: '', id: 0 },
                { role: 'Farmer', id: 1 },
                { role: 'Worker', id: 2 },
                { role: 'Driver', id: 3 },
                { role: 'Warehouse', id: 4 },
                { role: 'Salesperson', id: 5 },
                { role: 'Management', id: 6 },
            ],

            locations: [
                { location: '', id: 0 },
                { location: 'San Jose', id: 1 },
                { location: 'Cupertino', id: 2 },
                { location: 'Saratoga', id: 3 },
                { location: 'Sunnyvale', id: 4 },
                { location: 'Fremont', id: 5 },
            ]
        }
        this.handleButton = this.handleButton.bind(this);
    }

    handleButton(e){
        e.preventDefault();
        this.setState({ toggle: { editOpen: false}});
        axios.post("http://localhost:3001/users/AccountInfo",{
            name: this.state.name,
            farm: this.state.farm,
            role:this.state.role,
            streetAddress: this.state.streetAddress,
            city: this.state.city,
            state:this.state.state,
            zipcode:this.state.zipcode,
        }).then(res => {
            console.log(res.data);
        })
    }
    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
     };

    render() {
        if (this.state.redirect) return <Redirect to="/" />;
        return (
            // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
            <React.Fragment>
            <div className='background'>
                <Navbar /> 
                <div className='accountInfo-container'>
                        <div className="alt-AInavbar">
                            <React.Fragment>
                                <Link className="alt-lnk1" to="/AccountInfo">Account Information</Link>
                                <Link className="alt-lnk2" to="/Payment">Payment History</Link>
                                <Link className="alt-lnk3" to="/InputWages">Input Wages</Link>
                            </React.Fragment>
                        </div>
                    <div className='form-card'>
                        <h2>Account Information</h2>
                        <hr />
                        <div className="user-info">
                            <div><Label>Full Name:    {this.state.name}</Label></div>
                            <div><Label>Location:    {this.state.farm}</Label></div>
                            <div><Label>Role:    {this.state.role}</Label></div>
                            <div><Label>Payment Type:    By Mail</Label></div>
                            <div><Label>Mailing Address:    {this.state.streetAddress}, {this.state.farm}, {this.state.state}, {this.state.zipcode}</Label></div>
                        </div>

                        <div className='center-btn'>
                            <Button className='return-btn'
                               onClick = {() => {
                                 this.setState({ toggle: { editOpen: true}})
                                }}
                            >
                                Edit
                            </Button>
                        </div>

                        <Modal isOpen={this.state.toggle.editOpen}>
                            <Container className= 'modal-background'>
                                <h1>EDIT INFO</h1>
                                <br/>
                                
                                <form>
                                <Label>Full Name:</Label>
                                <Input 
                                    type = 'text'
                                    name = 'name'
                                    placeholder = {this.state.name}
                                    onChange = {this.handleChange}
                                >
                                </Input>
                                <Label>Your Role:</Label>
                                <Input
                                    type ='select'
                                    name ='role'
                                    onChange = {this.handleChange}
                                >
                                   {this.state.roles.map(renderRoles)}
                                </Input>
                                <Label>Farm Location:</Label>
                                <Input
                                    type ='select'
                                    name ='farm'
                                    onChange = {this.handleChange}
                                >
                                  {this.state.locations.map(renderLocation)}
                                </Input>
                                <br/>
                                <h5>Mailing Address</h5>
                                <Label>Street Address:</Label>
                                <Input
                                    type ='address'
                                    name ='streetAddress'
                                    placeholder = {this.state.streetAddress}
                                    onChange = {this.handleChange}
                                >
                                </Input>
                                <Label>City:</Label>
                                <Input
                                    type ='city'
                                    name ='farm'
                                    placeholder = {this.state.farm}
                                    onChange = {this.handleChange}
                                >
                                </Input>
                                <Label>State:</Label>
                                <Input
                                    type ='state'
                                    name ='state'
                                    placeholder = {this.state.state}
                                    onChange = {this.handleChange}
                                >
                                </Input>
                                <Label>Zipcode:</Label>
                                <Input
                                    type ='number'
                                    name ='zipcode'
                                    placeholder = {this.state.zipcode}
                                    onChange = {this.handleChange}
                                >
                                </Input>
                                </form>
                                <br/>
                                <Button
                                    onClick = {this.handleButton}
                                >
                                    Save
                                </Button>
                            </Container>
                        </Modal>
                    </div>
                </div>
            </div>
        </React.Fragment>
        );
    }
}

export default AccountInfo;