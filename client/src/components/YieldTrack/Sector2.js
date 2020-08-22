import React, { Component } from 'react';
import axios from "axios";
import styled from "styled-components";
import MaterialTable from 'material-table';

const Form = styled.form`
   height: 300px;
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
   }
   .alt-rentd-header{
       display:flex;
   }
   .alt-rentd-drpdwn{
       color:white;
       position:relative;
       left:60px;
       top:15px;
   }
   .alt-rentd-records{
       display: flex;
       position: relative;
       left:40px;
   }
   .alt-rentd-records-input1{
       margin:10px;
       height:30px;
       width:80px;
       border-radius:5px;
       background-color: rgba(0,0,0,0.4);
       color: white;
   }
   .alt-rentd-records-input2{
    margin:10px;
    position: relative;
    left:20px;
    height:30px;
    width:50px;
    border-radius:5px;
    background-color: rgba(0,0,0,0.4);
    color: white;
   }
   .alt-rentd-records-input3{
    margin:10px;
    left:50px;
    position: relative;
    height:30px;
    width:100px;
    border-radius:5px;
    background-color: rgba(0,0,0,0.4);
    color: white;
   }
   .alt-rentd-records-input4{
    margin:10px;
    left:40px;
    position: relative;
    height:30px;
    width:60px;
    border-radius:30px;
    background-color: rgba(0,0,0,0.4);
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
    left:350px;
    background-color: rgba(0,0,0,0.4);
    color: white;
    border-radius: 10px;
   }
   .alt-rentd-fields{
       overflow-y: scroll;
       height: 170px;
   }
   .alt-rentd-dropdwn{
       border-radius: 5px;
       position: relative;
       left:10px;
       background-color: rgba(0,0,0,0.4);
       color: white;
   }
`;

export default class ToolDetails extends Component{
    constructor(){
        super();
        this.state={
             month:"",
             months:[
                 "January","February","March","April","May","June","July", "August", "September", "October", "November", "December"
             ],
             records:[],
             amount: "",
             disabled: true,
             msg:""
        }
    
        this.change = this.change.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    async change(e) {
      e.preventDefault();
      this.setState({
          msg:""
      })
      await this.setState({
          [e.target.name]: e.target.value
      })
      axios.get(`http://localhost:3001/infrastructure/getToolDetails?location=San Jose&month=${this.state.month}`)
       .then(res => {
           //console.log(res.data);
           this.setState({
               records: res.data
           })
       })
    }

    async handleAdd(e){
        e.preventDefault();
        let rec = {
            location: "San Jose",
            month: this.state.month,
            tool_name: "",
            quantity: "",
            amount: ""
        }
        this.setState({
            records:[
                ...this.state.records,
                rec
            ]
        });
        console.log("After adding, records: ", this.state.records);
    }

    handleSave(e){
        e.preventDefault();
        this.state.records.map((record,index) => {
            axios.post("http://localhost:3001/infrastructure/saveToolDetails",{
                location: record.location,
                month: record.month,
                tool_name: record.tool_name,
                quantity: record.quantity,
                amount: record.amount  
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

    async handleDelete(e){
        e.preventDefault();
        let idx = e.target.id;
        let removeContent = this.state.records[idx];

        // Remove data from the records list
        this.state.records.splice(idx, 1) // remove the item from current index
        this.setState({
            records:[
                ...this.state.records
            ]
        });
        // console.log(removeContent.tool_name)

        // Remove data from the database
        axios.get(`http://localhost:3001/infrastructure/deleteToolDetails?location=San+Jose&month=${this.state.month}&tool_name=${removeContent.tool_name}`)
       .then(res => {
            console.log(res.data);
            this.setState({
                msg: res.data
            });
       }) 
    }

    async handleChange(e){
        let idx = e.target.id;
        let nm = e.target.name;
        let vl = e.target.value;
        // console.log(idx)
        // console.log(nm)
        // console.log(vl)
        this.setState({
            msg:" "
        })
        await this.setState(prevState => ({
            records: prevState.records.map(
                (rcrd,index) => idx == index ? {...rcrd, [nm]:vl }: rcrd
            )
        })
        );
        this.setState({
            disabled: false
        })
    }

    render(){
        return(
          <Form>
              <div className="alt-rentd-header">
                 <p className="alt-rentd-heading">Tool Costs</p>
                 <div className="alt-rentd-drpdwn">
                 <label>Select Month:</label>
                 <select className="alt-rentd-dropdwn" id = "dropdown" value={this.state.month} name= "month" onChange={this.change}>
                   <option value="selectItem">Select a month</option>
                   {this.state.months.map((month,index)=>(
                       <option value={month}>{month}</option>
                   ))} 
                 </select>
                 </div>
              </div>
              <div className="alt-rentd-data">
                <label className="alt-rentd-data-label">Tool Name</label>
                <label className="alt-rentd-data-label">Quantity</label>
                <label className="alt-rentd-data-label">Amount (in $)</label>
              </div>
              <div className="alt-rentd-fields">
              {this.state.records.map((record,index) => (
                  <div className="alt-rentd-records">
                      <input className="alt-rentd-records-input1" onChange={this.handleChange} name="tool_name" value={record.tool_name} id={index} />
                      <input className="alt-rentd-records-input2" onChange={this.handleChange} name="quantity"  value={record.quantity} id={index} /> 
                      <input className="alt-rentd-records-input3" onChange={this.handleChange} name="amount"  value={record.amount} id={index} />
                      <button onClick={this.handleDelete} className="alt-rentd-records-input4" id={index}>Delete</button>
                  </div>
              ))}
              </div>
              <div className="alt-rentd-bottombar">
                {this.state.disabled == false ? <button onClick={this.handleSave} className="alt-rentd-records-btn"> Save</button> : <></>}
                
              </div>
              <div className="alt-rentd-txt">
                  <p>{this.state.msg}</p>
                  <button onClick={this.handleAdd} className="alt-rentd-add-btn" >Add a New Record</button>
              </div>
          </Form>
        )
    }
}