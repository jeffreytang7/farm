import React, { Component } from 'react';
import axios from "axios";
import styled from "styled-components";

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
       width:140px;
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
    left:40px;
    position: relative;
    height:30px;
    width:140px;
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
`;

export default class RentDetails extends Component{
    constructor(){
        super();
        this.state={
            num: "",
            location:"",
            unit: "",
            item: "",
            sender:"",
            paymentType:"",
            referenceNumber:"",
            msg:"",
            receiver:"",
            error: '',
        }
        this.change = this.change.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    async change(e) {
      e.preventDefault();
      await this.setState({
          [e.target.name]: e.target.value
      })
      axios.get(`http://localhost:3001/infrastructure/getRentDetails?location=San Jose&month=${this.state.month}`)
       .then(res => {
           //console.log(res.data);
           this.setState({
               records: res.data
           })
       })
    }

    handleEdit(e){
        e.preventDefault();
        
    }

    async handleChange(e){
        let idx = e.target.id;
        let nm = e.target.name;
        let vl = e.target.value;
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
    async handleAdd(e){
        e.preventDefault();
        let rec = {
            num: "",
            location:"san jose",
            unit: "",
            item: "",
            sender:"",
            paymentType:"",
            referenceNumber:"",
            msg:"",
            receiver:"",
        }
        this.setState({
            records:[
                ...this.state.records,
                rec
            ]
        });
        console.log("After adding, records: ", this.state.records);
    }


    render(){
        return(
            <Form>
                <div className="alt-rentd-header">
                   <p className="alt-rentd-heading">Rent Details</p>
                   <option>Weekly Farm Packing Details</option>
                </div>
                <div className="alt-rentd-data">
                  <label className="alt-rentd-data-label">Number </label>
                  <label className="alt-rentd-data-label">Location</label>
                  <label className="alt-rentd-data-label">Units</label>
                  <label className="alt-rentd-data-label">Item</label>
                  <label className="alt-rentd-data-label">Sender</label>
                  <label className="alt-rentd-data-label">Reciever</label>
                  <label className="alt-rentd-data-label">Reference</label>
                  <label className="alt-rentd-data-label">Payment Type</label>

                </div>
/*
    num: "",
            location:"",
            unit: "",
            item: "",
            sender:"",
            paymentType:"",
            referenceNumber:"",
            msg:"",
            receiver:"",
*/
                <div className="alt-rentd-fields">
                {this.state.records.map((record,index) => (
                    <div className="alt-rentd-records">
                        <input className="alt-rentd-records-input1" onChange={this.handleChange} name="building_name" value={record.location} id={index} />
                        <input className="alt-rentd-records-input2" onChange={this.handleChange} name="area"  value={record.unit} id={index} /> 
                        <input className="alt-rentd-records-input3" onChange={this.handleChange} name="amount"  value={record.item} id={index} />
                        <input className="alt-rentd-records-input3" onChange={this.handleChange} name="amount"  value={record.sender} id={index} />
                        <input className="alt-rentd-records-input3" onChange={this.handleChange} name="amount"  value={record.paymentType} id={index} />
                        <input className="alt-rentd-records-input3" onChange={this.handleChange} name="amount"  value={record.referenceNumber} id={index} />
                        <input className="alt-rentd-records-input3" onChange={this.handleChange} name="amount"  value={record.msg} id={index} />
                        <input className="alt-rentd-records-input3" onChange={this.handleChange} name="amount"  value={record.receiver} id={index} />
                        <input className="alt-rentd-records-input3" onChange={this.handleChange} name="amount"  value={record.num} id={index} />

                    </div>
                ))}
                </div>
                <div className="alt-rentd-bottombar">
                  {this.state.disabled == false ? <button onClick={this.handleSave} className="alt-rentd-records-btn"> Save</button> : <></>}
                  <button onClick={this.handleAdd} className="alt-rentd-add-btn" >Add a New Record</button>
                </div>
                <div className="alt-rentd-txt">
                    <p>{this.state.msg}</p>
                </div>
            </Form>
          )
    }
}