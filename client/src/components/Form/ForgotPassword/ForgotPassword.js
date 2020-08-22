import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import Form from '../form';
import '../form.css';


class ForgotPasswored extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      
      redirect: localStorage.getItem('userTokenTime') ? true : false
    }

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.emailInputChangeHandler = this.emailInputChangeHandler.bind(this);
 
  }




  onSubmitHandler() {
    if (!(this.state.email === '' )
      ) {
       
      axios.post('/api/ForgotPassword', {
        email: this.state.email
       
      }).then(res => {

        this.setState({
          token: res.data.token
        });
     
        const data = {
          token: this.state.token,
          time: new Date().getTime()
        }
        localStorage.setItem('userTokenTime', JSON.stringify(data));
       
        this.setState({
          redirect: true
        });
      }).catch(err => {
        console.log(err);
      });
    } else {
      alert('Please enter valid details');
    }
  }




  emailInputChangeHandler(event) {
  
    this.setState({
      email: event.target.value
    });
  }



  render() {
    if (this.state.redirect) return <Redirect to="/" />;
    return (
      <Form onSubmit={this.onSubmitHandler.bind(this)}>
        <h3 className="text-center text-info">Forgot Passwored</h3>
        <div className="form-group">
          <label htmlFor="email" className="text-info">Email:</label><br />
          <input
            id="email"
            className="form-control"
            type="email"
            name="email"
            placeholder="example@domain.com"
            onChange={this.emailInputChangeHandler}
            required />
        </div>
      


        


        <div className="d-flex justify-content-between align-items-end">
        <button onClick={this.onSubmitHandler} className="btn btn-info btn-md" type="button">Submit</button>

          <Link to="/signIn" className="text-info">Login here</Link>
        </div>
      </Form>
    );
  }
}

export default ForgotPasswored;




