import React, { Component } from 'react';
import axios from "axios";
import styled from "styled-components";
import { Row, Col, Button, FormSelect } from "shards-react";
import MaterialTable from 'material-table';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";


const Form = styled.form`
   .alt-rentd-heading{
       left:30px;
       top:10px;
       color:white;
       position:relative;
       font-size:20px;
   }
   .alt-rentd-data{
       position:relative;
       top:0px;
       left:30px;
       color:white;
       display:flex;
   }
   .alt-rentd-data-label{
       margin:20px;
       left:40px;
       width:120px;
   }
   .alt-rentd-header{
       display:flex;
   }
   .alt-rentd-drpdwn{
       color:white;
       position:relative;
       left:60px;
       top:15px;background-color: rgba(0,0,0,0.4);
       color: white;
   }
   .alt-rentd-records{
       display: flex;
       position: relative;
       left:40px;
   }
   .alt-rentd-records-input1{
       margin:10px;
       height:30px;
       width:100px;
       border-radius:5px;background-color: rgba(0,0,0,0.4);
       color: white;
   }
   .alt-rentd-records-input2{
    margin:10px;
    position: relative;
    left:30px;
    height:30px;
    width:100px;
    border-radius:5px;background-color: rgba(0,0,0,0.4);
    color: white;
   }
   .alt-rentd-records-input3{
    margin:10px;
    left:70px;
    position: relative;
    height:30px;
    width:100px;
    border-radius:5px;background-color: rgba(0,0,0,0.4);
    color: white;
   }
   .alt-rentd-records-input4{
    margin:10px;
    left:90px;
    position: relative;
    height:30px;
    width:100px;
    border-radius:5px;background-color: rgba(0,0,0,0.4);
    color: white;
   }
   .alt-rentd-records-input5{
    margin:10px;
    left:110px;
    position: relative;
    height:30px;
    width:100px;
    border-radius:5px;background-color: rgba(0,0,0,0.4);
    color: white;
   }
   .alt-rentd-records-input6{
    margin:10px;
    left:130px;
    position: relative;
    height:30px;
    width:100px;
    border-radius:5px;background-color: rgba(0,0,0,0.4);
    color: white;
   }
   .alt-rentd-records-btn{
    left:40px;
    top:10px;
    position: relative;
    height:30px; 
   }
   .alt-rentd-txt{
       position:relative;
       left:70px;
       top:10px;
       color:white;
       font-weight:bold;
       font-size:20px;
   }
   .alt-rentd-bottombar{
       position:relative;
       left:100px;
   }
   .alt-rentd-add-btn{
    position:absolute;
    top:10px;   
    left:270px;
    background-color: rgba(0,0,0,0.4);
    color: white;
    border-radius: 10px;
   }
   }
   .alt-rentd-fields{
       overflow-y: scroll;
       height: 180px;
   }
   .alt-rentd-dropdwn{
       border-radius: 5px;
       position: relative;
       left:10px;
       background-color: rgba(0,0,0,0.4);
       color: white;
   }
   .alt-rentd-records-input7{
    margin:10px;
    left:150px;
    position: relative;
    height:30px;
    width:60px;
    border-radius:30px;
    background-color: rgba(0,0,0,0.4);
    color: white;
   }
`;

export default class Sector1Details extends Component {
    constructor() {
        super();
        this.state = {
            month: "",
            // months: [
            //     "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
            // ],
            records: [],
            crop_name: "",
            plant_date: "",
            start_harvest: "",
            end_harvest: "",
            daily_yield: "",
            sector: "",
            disabled: true,
            columns: [
                { title: 'Crop Name', field: 'crop_name' },
                { title: 'Plant Date', field: 'plant_date' },
                { title: 'Start Harvest', field: 'start_harvest' },
                { title: 'End Harvest', field: 'end_harvest' },
                { title: 'Date', field: 'date'},
                { title: 'Daily Yield', field: 'daily_yield', type: 'numeric' },
            ],
            msg: ""
        }
        this.change = this.change.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    async change(e) {
        e.preventDefault();
        await this.setState({
            [e.target.name]: e.target.value
        })
        axios.get(`http://localhost:3001/yield/getAllSector1Details?month=${this.state.month}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    records: res.data
                })
            })
    }

    async handleAdd(e) {
        e.preventDefault();
        let rec = {
            crop_name: "",
            month: this.state.month,
            plant_date: "",
            start_harvest: "",
            end_harvest: "",
            daily_yield: "",
            sector: "Sector1",
        }
        this.setState({
            records: [
                ...this.state.records,
                rec
            ]
        });
        console.log("After adding, records: ", this.state.records);
    }

    handleSave(e) {
        e.preventDefault();
        this.state.records.map((record, index) => {
            axios.post("http://localhost:3001/yield/saveSector1Details", {
                crop_name: record.crop_name,
                plant_date: record.plant_date,
                start_harvest: record.start_harvest,
                end_harvest: record.end_harvest,
                daily_yield: record.daily_yield,
                month: record.month,
                sector: "Sector1",
            }).then(res => {
                console.log(res.data);
                this.setState({
                    msg: res.data
                });
            })
        });
        this.setState({
            disabled: true
        })
    }

    async handleDelete(e) {
        e.preventDefault();
        let idx = e.target.id;
        let removeContent = this.state.records[idx];

        // Remove data from the records list
        this.state.records.splice(idx, 1) // remove the item from current index
        this.setState({
            records: [
                ...this.state.records
            ]
        });
        // console.log(removeContent.equipment_name)

        // Remove data from the database
        axios.get(`http://localhost:3001/yield/deleteSector1Details?crop_name=apple&month=${this.state.month}&plant_date=${removeContent.plant_date}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    msg: res.data
                });
            })
    }


    async handleChange(e) {
        let idx = e.target.id;
        let nm = e.target.name;
        let vl = e.target.value;
        this.setState({
            msg: " "
        })
        await this.setState(prevState => ({
            records: prevState.records.map(
                (rcrd, index) => idx == index ? { ...rcrd, [nm]: vl } : rcrd
            )
        })
        );
        console.log(this.state.records);
        this.setState({
            disabled: false
        })
    }

    render() {
        return (
            <Form>
                <div className="alt-rentd-header">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                    <p className="alt-rentd-heading"> Sector 1</p>
                    <div className="alt-rentd-drpdwn">
                        <label>Select Month:</label>
                        <select className="alt-rentd-dropdwn" id="dropdown" value={this.state.month} name="month" onChange={this.change}>
                            <option value="selectItem">Select a month</option>
                            {/* {this.state.months.map((month, index) => (
                                <option value={month}>{month}</option>
                            ))} */}
                            <option value="January"> January</option>
                            <option value="February"> february</option>
                            <option value="March"> March</option>
                            <option value="April"> April</option>

                        </select>
                    </div>
                </div>

                <MaterialTable
                    title="Sector 1"
                    columns={this.state.columns}
                    data={this.state.records}
                    editable={{
                        onRowAdd: (newData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    if (newData.crop_name && newData.plant_date + "" && newData.start_harvest && newData.crop_name && newData.date && this.state.month && newData.end_harvest && newData.daily_yield) {
                                        // check if the combination of toolname and email are unique
                                        axios.get(`http://localhost:3001/yield/checkExistSector1?crop_name=${newData.crop_name}&Daily_yield=${newData.daily_yield}&plant_date=${newData.plant_date}`)
                                            .then(res => {
                                                if (res.data) { // if exist
                                                    alert("ADD ERROR: Material already exist")
                                                }
                                                else { // if not exist
                                                    axios.post("http://localhost:3001/yield/saveSector1Details", {
                                                        crop_name: newData.crop_name,
                                                        plant_date: newData.plant_date,
                                                        month: this.state.month,
                                                        start_harvest: newData.start_harvest,
                                                        end_harvest: newData.end_harvest,
                                                        daily_yield: newData.daily_yield,
                                                        date: newData.date
                                                    }).then(res => {
                                                        console.log(res.data);
                                                    })

                                                    this.setState((prevState) => {
                                                        const records = [...prevState.records];
                                                        records.push(newData);
                                                        return { ...prevState, records };
                                                    });
                                                }
                                            })
                                    }
                                    else {
                                        alert("ADD ERROR: One or more field(s) is/are empty")
                                    }

                                }, 600);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                // check if the combination of toolname and email are unique
                                    axios.get(`http://localhost:3001/yield/checkExistSector1?crop_name=${newData.crop_name}&Daily_yield=${newData.daily_yield}&plant_date=${newData.plant_date}`)
                                .then(res => {
                                    if (!res.data) { // if not exist
                                        alert("WARNING: Changes in Material Name might ADD a new data instead of UPDATE data\nREFRESH THE PAGE TO SEE CHANGE");
                                    }
                                })

                                axios.post("http://localhost:3001/yield/saveSector1Details",{
                                            crop_name: newData.crop_name,
                                            plant_date: newData.plant_date,
                                            month: this.state.month,
                                            start_harvest: newData.start_harvest,
                                            end_harvest: newData.end_harvest,
                                            daily_yield: newData.daily_yield,
                                            date: newData.date  
                                        }).then(res => {
                                            console.log(res.data);
                                        });

                                this.setState((prevState) => {
                                const records = [...prevState.records];
                                records[records.indexOf(oldData)] = newData;
                                return { ...prevState, records };
                                });
                            }
                        }, 600);
                    }),
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    this.setState((prevState) => {
                                const records = [...prevState.records];
                                records.splice(records.indexOf(oldData), 1); // remove the item from current index
                                return { ...prevState, records };
                            });

                            // Remove data from the database
                            axios.get(`http://localhost:3001/users/deleteSector1?crop_name=${oldData.crop_name}&daily_yield=${oldData.daily_yield}&plant_date=${oldData.plant_date}`)
                            .then(res => {
                                console.log(res.data);
                                this.setState({
                                    msg: res.data
                                });
                            })
                        }, 600);
                    }),
                    }}
                />
            </Form>
        )
    }
}