import React from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

import Form from '../form';
import '../form.css';



class Labour  extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      farm: '',
      timeIn: '',
      timeOut: '',
      activity: "",
     
    
    
    }

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.firstNameInputChangeHandler = this.firstNameInputChangeHandler.bind(this);
    this.lastNameInputChangeHandler = this.lastNameInputChangeHandler.bind(this);
    this.farmInputChangeHandler = this.farmInputChangeHandler.bind(this);
    this.timeInInputChangeHandler = this.timeInInputChangeHandler.bind(this);
    this.timeOutInputChangeHandler = this.timeOutInputChangeHandler.bind(this);
    this.activityInputChangeHandler = this.activityInputChangeHandler.bind(this);
   
  }

  onSubmitHandler (e) {
    e.preventDefault();
  
      axios.post('/api/labour', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        farm: this.state.farm,
        timeIn: this.state.timeIn,
        timeOut: this.state.timeOut,
        activity: this.state.activity

      }).then(res => {
        console.log(res)
        this.setState({
          redirect: true
        });
      }).catch(err => {
        console.log(err);
      });
    
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

  farmInputChangeHandler(event) {
    this.setState({
        farm: event.target.value
    });
  }

  timeInInputChangeHandler(event) {
    this.setState({
        timeIn: event.target.value
    });
  }

  timeOutInputChangeHandler(event) {
    this.setState({
        timeOut: event.target.value
    });
  }

  activityInputChangeHandler(event) {
    this.setState({
        activity: event.target.value
    });
  }



  render() {
   if (this.state.redirect) return <Redirect to='/' />
    return (
      <Form onSubmit={this.onSubmitHandler.bind(this)}>
        <h3 className="text-center text-info">Labour time</h3>
        <div className="form-group">
          <label htmlFor="first-name" className="text-info">First Name:</label><br />
          <input
            id="first-name"
            className="form-control"
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={this.firstNameInputChangeHandler}
            required />
        </div>
        <div className="form-group">
          <label htmlFor="last-name" className="text-info">Last Name:</label><br />
          <input
            id="last-name"
            className="form-control"
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={this.lastNameInputChangeHandler}
            required />
        </div>
        <div className="form-group">
          <label htmlFor="farm" className="text-info">farm:</label><br />
          <input
            id="farm"
            className="form-control"
            type="text"
            name="farm"
            placeholder="farm"
            onChange={this.farmInputChangeHandler}
            required />
        </div>
        <div className="form-group">
          <label htmlFor="timeIn" className="text-info">timeIn:</label><br />
          <input
            id="timeIn"
            className="form-control"
            type="text"
            name="timeIn"
            placeholder="timeIn"
            onChange={this.timeInInputChangeHandler}
            required />
        </div>



        <div className="form-group">
          <label htmlFor="timeOut" className="text-info">timeOut:</label><br />
          <input
            id="timeOut"
            className="form-control"
            type="text"
            name="timeOut"
            placeholder="timeOut"
            onChange={this.timeOutInputChangeHandler}
            required />
        </div>

        
        

        <div className="form-group">
          <label htmlFor="activity" className="text-info">activity:</label><br />
          <input
            id="activity"
            className="form-control"
            type="text"
            name="activity"
            placeholder="activity"
            onChange={this.activityInputChangeHandler}
            required />
            {/* {this.state.roles.map(renderRoles)} */}
        </div>



        <div className="d-flex justify-content-between align-items-end">
          <input type="submit" name="submit" className="btn btn-info btn-md" value="Submit" />
         
        </div>
      </Form>
    );
  }
}

export default Labour;
