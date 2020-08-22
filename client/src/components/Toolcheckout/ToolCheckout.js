import React, {Component} from "react";
import styled from "styled-components";
import { Card, FormInput, Button } from "shards-react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

const Div = styled.div`
   .tool_name{
       position:relative;
       left:50px;
       width:400px;
       color:white;
       background-color:rgba(0, 0, 0, 0.1);
       ::placeholder{
        color:white;
       }
   }
   .table{
    position:relative;
    left:30px;
    justify-content:space-around;
    padding:10px;
   }
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
   .row{
       display:flex;
       position:relative;
       color:white;
       top:20px;
   }
   .alt-btn{
       position:relative;
       left:30px;
       top:100px;
       width:400px;
       color:white;
   }
   .alt-msgcheck{
       position:relative;
       top:110px;
       color:white;
       left:120px;
   }
`;

export default class Toolcheckout extends Component{
    constructor(){
        super();
        this.state = {
            toolname:"",
            timein:"",
            timeout:"",
            location:"",
            msg:"",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        axios.post("http://localhost:3001/users/toolcheckout",{
            toolname:this.state.toolname,
            timein:this.state.timein,
            timeout:this.state.timeout,
            location:this.state.location,
        }).then(res => {
            console.log(res.data);
            this.setState({
                msg: res.data
            })
        })
    }

    render(){
    return(
        <Div>
          <div className="background">
           <Navbar />
           
           <Card className="alt-card">
             <h1 style={{ padding:"20px"}}>Tool Checkout</h1>
             <body className="table">
               <div className="row">
                 <p class = "tool">Tool Name</p>
                 <FormInput className="tool_name" name="toolname" onChange={this.handleChange} placeholder= "Tool Name"></FormInput> <br></br>
               </div>
               <div style={{top:"40px"}} className="row">
                 <p class = "timein">Time In</p>
                 <FormInput style={{left:"75px"}} name="timein" onChange={this.handleChange} className="tool_name" placeholder="Enter Time In (Specify AM and PM)"></FormInput> <br></br>
               </div>
               <div style={{top:"60px"}} className="row">
                  <p class = "timeout">Time Out</p>
                  <FormInput style={{left:"60px"}} name="timeout" onChange={this.handleChange} className="tool_name" placeholder="Enter Time Out (Specify AM and PM)"></FormInput> <br></br>
               </div>
               <div style={{top:"80px"}} className="row">
                  <p class = "loc">Location</p>
                  <FormInput style={{left:"65px"}} name="location" onChange={this.handleChange} className="tool_name" placeholder="Enter Location (Specify City and State)"></FormInput> <br></br>
               </div>
               <Button onClick={this.handleSubmit} className="alt-btn"> Submit </Button>
               <div className="alt-msgcheck">{this.state.msg}</div>
             </body>
          </Card>
          </div>
        </Div>
    )
    }
}