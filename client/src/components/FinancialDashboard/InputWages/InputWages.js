import React, { Component } from 'react';
import './InputWages.css';
import { Button, Row, Label, Input, Col, Form } from 'reactstrap';
import Navbar from "../../Navbar/Navbar";
import axios from "axios";
import { Link, Redirect } from 'react-router-dom';


class InputWages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ename: '',
            date: '',
            timeIn: '',
            timeOut: '',
            hrRate: '',
            overTimeRate: '',
            bonus: '',
            msg:'',
        }

        this.handleChange = this.handleChange.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    buttonClick(e){
        e.preventDefault();
        axios.post("http://localhost:3001/users/inputwages",{
            ename: this.state.ename,
            date:this.state.date,
            timeIn:this.state.timeIn,
            timeOut:this.state.timeOut,
            hrRate:this.state.hrRate,
            overTimeRate: this.state.overTimeRate,
            bonus:this.state.bonus
        }).then(res => {
            console.log("response:",res.data);
            this.setState({
                msg: res.data,
            })
        })
    }

    render() {
        if (this.state.redirect) return <Redirect to="/" />;
        return (
            <div className='background'>
                <Navbar /> 
                <div className='Inputwages-container'>
                        <div className="alt-AInavbar">
                            <React.Fragment>
                                <Link className="alt-lnk1" to="/AccountInfo">Account Information</Link>
                                <Link className="alt-lnk2" to="/Payment">Payment History</Link>
                                <Link className="alt-lnk3" to="/InputWages">Input Wages</Link>
                            </React.Fragment>
                        </div>
                    <div className='form-card'>
                        <h4 className="alt-h4">Employee Wage Input</h4>
                        <hr />
                            <Form>
                                <Row>
                                <Col>
                                <Label>Employee Name:</Label>
                                <Input 
                                    type = 'name'
                                    name = 'e-name'
                                    placeholder = 'e.g. Greg Smith'
                                    onChange={
                                        this.handleChange}
                                >
                                </Input>
                                </Col>
                                <Col>
                                <Label>Date Worked:</Label>
                                <Input 
                                    type = 'date'
                                    name = 'date'
                                    placeholder = 'e.g 1/2/2020'
                                    onChange={
                                        this.handleChange}
                                >
                                </Input>
                                </Col>
                                <Col> 
                                <Label>Time In:</Label>
                                <Input 
                                    type = 'time'
                                    name = 'timeIn'
                                    onChange={
                                        this.handleChange}
                                >
                                </Input>
                                </Col>
                                </Row>
                            </Form>
                            <Form>
                                <Row>
                                <Col>
                                <Label>Time Out:</Label>
                                <Input 
                                    type = 'time'
                                    name = 'timeOut'
                                    onChange={
                                        this.handleChange}
                                >
                                </Input>
                                </Col>
                                <Col>
                                <Label>Hourly Rate:</Label>
                                <Input
                                    type = 'number'
                                    name = 'hrRate'
                                    placeholder = 'e.g 15'
                                    onChange={
                                        this.handleChange}
                                >
                                </Input>
                                </Col>
                                <Col>
                                <Label>Overtime Rate:</Label>
                                <Input
                                    type = 'number'
                                    name = 'overTimeRate'
                                    placeholder = 'e.g 20'
                                    onChange={
                                        this.handleChange}
                                >
                                </Input>
                                </Col>
                                </Row>
                            </Form>
                                
                                <Label>Bonus:</Label>
                                <Input
                                    type = 'number'
                                    name = 'bonus'
                                    placeholder = 'e.g 5'
                                    onChange={
                                        this.handleChange}
                                >
                                </Input>
                        <div className='alt-submt'>
                            <Button onClick={this.buttonClick} className='return-btn'>
                                Submit
                            </Button>
                        </div>
                        <div className="alt-msg">
                            {this.state.msg}
                        </div>
                </div>
                </div>
            </div>
        );
    }
}
export default InputWages;

