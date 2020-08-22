import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';
import './SignUp.css';
import {  Button, Container, Input, Label, Col } from 'reactstrap';
import styled from "styled-components";
import Navbar from "../../Navbar/Navbar";

const Div = styled.div`
  
`;

const Form = styled.form`
  position:relative;
  top:-20px;
  .alt-signup-card{
    width:1100px;
    position:relative;
    left:90px;
    top: 50px;
    border-radius:20px;
  }
  .alt-email{
    position:relative;
    top:0px;
    left:250px;
    width:300px;
  }
  .alt-password{
    position:relative;
    top:20px;
  }
  .password{
    display:flex;
  }
  .last-name{
    position:relative;
    left:100px;
    width:200px;
  }
  .alt-repassword{
    position:relative;
    left:90px;
    top:20px;
  }
  .role{
    position:relative;
    top:20px;
    left:240px;
    width:200px;
  }
  .location{
    position:relative;
    top:30px;
    width:200px;
  }
  .text-info{
    position:relative;
    top:20px;
  }
  .bottom-row{
    position:relative;
    top:20px;
  }
  .form-card{
    height:450px;
  }
  .background{
    height:700px;
  }
`;

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



class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      REpassword: '',
      role: "'--Select One--'",
      location: "'--Select One--'",
      roles: [
        { role: '--Select One--', id: 0 },
        { role: 'Farmer', id: 1 },
        { role: 'Worker', id: 2 },
        { role: 'Driver', id: 3 },
        { role: 'Warehouse', id: 4 },
        { role: 'Salesperson', id: 5 },
        { role: 'Management', id: 6 },
      ],

      locations: [
        { location: '--Select One--', id: 0 },
        { location: 'San Jose', id: 1 },
        { location: 'Cupertino', id: 2 },
        { location: 'Saratoga', id: 3 },
        { location: 'Sunnyvale', id: 4 },
        { location: 'Freemont', id: 5 },
      ],

    }

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.firstNameInputChangeHandler = this.firstNameInputChangeHandler.bind(this);
    this.lastNameInputChangeHandler = this.lastNameInputChangeHandler.bind(this);
    this.emailInputChangeHandler = this.emailInputChangeHandler.bind(this);
    this.passwordInputChangeHandler = this.passwordInputChangeHandler.bind(this);
    this.REpasswordInputChangeHandler = this.REpasswordInputChangeHandler.bind(this);
    this.roleInputChangeHandler = this.roleInputChangeHandler.bind(this);
    this.locationInputChangeHandler = this.locationInputChangeHandler.bind(this);
  }

  onSubmitHandler(e) {
    e.preventDefault();
    if (!(this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.password === '')
      && (this.state.password.length >= 5) && (this.state.password === this.state.REpassword) && (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email))) {
      axios.post('http://localhost:3001/users/register', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
        location: this.state.location

      }).then(res => {
        console.log(res)
        this.setState({
          redirect: true
        });
      }).catch(err => {
        console.log(err);
      });
    } else {
      if (this.state.password != this.state.REpassword) {
        alert('passwored is not the same');
      } else
        alert('Please enter valid details');
    }
  }

  firstNameInputChangeHandler(event) {
    this.setState({
      firstName: event.target.value
    });
  }

  lastNameInputChangeHandler(event) {
    this.setState({
      lastName: event.target.value
    });
  }

  emailInputChangeHandler(event) {
    this.setState({
      email: event.target.value
    });
  }

  passwordInputChangeHandler(event) {
    this.setState({
      password: event.target.value
    });
  }

  REpasswordInputChangeHandler(event) {
    this.setState({
      REpassword: event.target.value
    });
  }

  roleInputChangeHandler(event) {
    this.setState({
      role: event.target.value
    });
  }

  locationInputChangeHandler(event) {
    this.setState({
      location: event.target.value
    });
  }
  render() {
    if (this.state.redirect) return <Redirect to='/' />
    return (
      <Div>
      <Navbar />
      <Form className="alt-signup-form" onSubmit={this.onSubmitHandler.bind(this)}>
        <div className='background' >
          <div className='alt-signup-card'>
            <div className='form-card'>
              <h1>Create Your Account</h1>
              <hr />
                  <div className="password">
                    <div className="first-name">
                      <Label htmlFor="first-name">First Name:</Label>
                      <Input
                        id="first-name"
                        className="input-styles"
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={this.firstNameInputChangeHandler}
                        required
                      >
                      </Input>
                    </div>
                    <div className="last-name">
                      <Label htmlFor="last-name">Last Name:</Label>
                      <Input
                        id="last-name"
                        className="input-styles"
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={this.lastNameInputChangeHandler}
                        required
                      >
                      </Input>
                    </div>
                    <div className="alt-email">
                     <Label htmlFor="email">Email:</Label>
                     <Input
                       id="email"
                       className="form-control"
                       type="email"
                       name="email"
                       placeholder="example@domain.com"
                       onChange={this.emailInputChangeHandler}
                       required> 
                     </Input>
                    </div>
                  </div>
                  <div className="password">
                    <div className="alt-password">
                      <Label htmlFor="password">Password:</Label>
                      <Input
                        id="password"
                        className="form-control"
                        type="password"
                        name="password"
                        placeholder="********"
                        onChange={this.passwordInputChangeHandler}
                        required
                      >
                      </Input>
                    </div>
                    <div className='alt-repassword'>
                      <Label htmlFor="REpassword">Re-type Password:</Label>
                      <Input
                        id="REpassword"
                        className="form-control"
                        type="password"
                        name="REpassword"
                        placeholder="Re-Type Password"
                        onChange={this.REpasswordInputChangeHandler}
                        required
                      >
                      </Input>
                    </div>
                    <div className='role'>
                      <Label htmlFor="role">Your Role:</Label>
                      <Input
                        id="role"
                        className="form-control"
                        type='select'
                        name="role"
                        placeholder='choose'
                        onChange={this.roleInputChangeHandler}
                        required
                      >
                        {this.state.roles.map(renderRoles)}
                      </Input>
                    </div>
                  </div>
                    <div className="location">
                      <Label htmlFor="location">Location:</Label>
                      <Input
                        id="location"
                        className="form-control"
                        type='select'
                        name='e.g. Gilroy'
                        placeholder="'--Select One--'"
                        onChange={this.locationInputChangeHandler}
                        required
                      >
                        {this.state.locations.map(renderLocation)}


                      </Input>
                    </div>

              <Col className='bottom-row'>
                <div className='btn'>
                  <Link to="/signIn">
                    <Button className='sign-in-btn'
                    >
                      Sign-In Instead
                 </Button>
                  </Link>
                </div>

                <div className='btn'>
                  <input type="submit" name="submit" className="btn btn-info btn-md" value="Submit" />
                </div>
              </Col>

            </div>
          </div>
        </div >
      </Form>
      </Div>
    );
  }
}

export default SignIn;
