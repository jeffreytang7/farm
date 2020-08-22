import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import { Row, Col, Button, FormSelect, Card } from "shards-react";
import Chart from "react-apexcharts";
import Navbar from "../Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

const Form = styled.form`
height: 600px;

.alt-card{
    width:600px; 
    height:450px;
    left: 100px; 
    top:30px;
    box-shadow: 0 0 5px #eeeeee;
    background-color:rgba(0, 0, 0, 0.1);
    color:white;
    border-radius: 10px;
  }

.alt-infrastructure-ele1{
    position:relative;
    
    left:100px;
}
.alt-Infranavbar{
    display:flex;
    position:relative;
    top:30px;
}
.alt-infrastructure{
    position: absolute;
    top:100px;
    left:50px;
    display:inline;
}
.alt-Infrasheading{
    color: white;
    font-size:25px;
    position:absolute;
    top:10px;
    left:100px;
}
.alt-infrastructure-ele1-btn1{
    color:white;
    width:130px;
    border-radius:5px;
    background-color: rgba(0,0,0,0.3);
    border-style:none;
    box-shadow: 0 0 5px #eeeeee;
    margin:10px;
    margin-top:50px;
}
.alt-btn-select-details{
    box-shadow: 0 0 5px #eeeeee;
    border-radius:5px;
    position:relative;
    top:40px;
    left:100px;
    width: 1300px;
}

.alt-rentd-heading{
       left:30px;
       top:10px;
       color:white;
       position:relative;
       font-size:20px;
}

.customization{
    margin-top: 25px;
}

.Farm-Number-Row{
    margin-top: 25px;
}
`;

export default class FarmView extends Component {
    constructor(props){
        super(props);

        this.state = {
            redirect:"",
            farm:"",
            month:"",
            months:["January","February","March","April","May","June","July", "August", "September", "October", "November", "December"],
        };

        this.handleFarm = this.handleFarm.bind(this);
    }

    handleFarm(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        if (this.state.redirect) return <Redirect to={this.state.redirect} />
        return (
            <Form>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <div className="background">
                    <Navbar />
                    <div className="alt-infrastructure">
                        <div className="alt-btn-select-details">
                        <p className='alt-rentd-heading'>Yield Tracking Farm View Charts</p>
                            <div className='customization'>
                                <Row>
                                    <Col sm={2}>
                                        <FormSelect name='farm' onChange={this.handleFarm}>
                                            <option disabled selected value=''>Select a Farm</option>
                                            <option value='1'>Farm 1</option>
                                            <option value='2'>Farm 2</option>
                                            <option value='3'>Farm 3</option>
                                            <option value='4'>Farm 4</option>
                                            <option value='5'>Farm 5</option>
                                            <option value='6'>Farm 6</option>
                                        </FormSelect>
                                    </Col>
                                    <Col sm={2}>
                                        <FormSelect name='month' onChange={this.handleFarm, this.retrieveFarmData}>
                                            <option disabled selected value=''>Select a Month</option>
                                            {this.state.months.map((month, index)=>(
                                                <option value={this.state.months[index]}>{month}</option>
                                            ))}
                                        </FormSelect>
                                    </Col>
                                    <Col sm={2}>
                                        <Button pill name='redirect' value='/yieldtrack' onClick={this.handleFarm}>See Charts</Button>
                                    </Col> 
                                </Row>
                                <Row>
                                    {/* Chart Goes Here */}
                                </Row>
                            </div>
                        </div>

                    </div>
                </div>
          </Form>
        );
    }
}
