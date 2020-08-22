import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import { Row, Col, Button, FormSelect } from "shards-react";
import MaterialTable from 'material-table';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"


const Form = styled.form`
height: 600px;

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

.table{
    maxWidth: 100%;
    margin-top: 25px;
}
`;

export default class FarmView extends Component {
    constructor(props){
        super(props);

        this.state = {
            redirect:"",
            month:"",
            months:["January","February","March","April","May","June","July", "August", "September", "October", "November", "December"],
            farm:"",
            farmTitle:"",
            columns:[
                { title: 'Sector', field: 'sector' },
                { title: 'Cycle Start', field: 'cycleStart' },
                { title: 'Cycle End', field: 'cycleEnd'},
                { title: 'Weekly Produce', field: 'weeklyProduce', type: 'numeric' },
                { title: 'Lost Product', field: 'lostProduct', type: 'numeric' }
            ],
            data:[]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFarm = this.handleFarm.bind(this);
        this.handleChartTrigger = this.handleChartTrigger.bind(this);
    }

    handleChange(e){
        this.setState({ [e.target.name]: [e.target.value] });
    }

    handleFarm(e){
        e.preventDefault();
        this.setState({ 
            farm: [e.target.value],
            farmTitle: "Farm View #" + [e.target.value]
        });

        axios.get("http://localhost:3001/users/getSector1Details")
        .then(res => {
            this.setState({ 
                data:[res.data]
            });
        });
    }

    handleChartTrigger(e){
        this.setState({ redirect: '/yieldtrack/FarmViewCharts' });
    }

    render() {
        if (this.state.redirect) return <Redirect to={this.state.redirect} />
        return (
            <>
            <Form>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <p className='alt-rentd-heading'>Yield Tracking Farm View</p>
                <div className='customization'>
                    <Row>
                        <Col sm={2}>
                            <FormSelect name='farm' onChange={this.handleFarm}>
                                <option disabled selected value=''>Select a Farm</option>
                                <option value='1'>Farm 1</option>
                                <option value='2'>Farm 2</option>
                            </FormSelect>
                        </Col>
                        <Col sm={2}>
                            <Button pill onClick={this.handleChartTrigger}>See Graphs</Button>
                        </Col> 
                    </Row>
                </div>
                
                <div className="Farm-Number-Row">
                    <Row>
                        <Col sm={2}>
                            <FormSelect name='month' onChange={this.handleChange}>
                                <option disabled selected value=''>Select a Month</option>
                                {this.state.months.map((month, index)=>(
                                <option value={this.state.months[index]}>{month}</option>
                                ))}
                            </FormSelect>
                        </Col>
                    </Row>
                </div>
                
                <div className='table'>
                    <Row>
                        <Col sm={2}>
                            <FormSelect>
                                <option disabled selected value=''>Choose a Week</option>
                                <option value='1'>Week 1</option>
                                <option value='2'>Week 2</option>
                                <option value='3'>Week 3</option>
                            </FormSelect>
                        </Col>
                        <Col>
                            <MaterialTable
                                title={this.state.farmTitle}
                                columns={this.state.columns}
                                data={this.state.data}
                            />
                        </Col>
                    </Row>
                </div>
            </Form>
            </>
        );
    }
}
