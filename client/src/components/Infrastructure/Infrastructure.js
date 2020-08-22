import React, { Component } from 'react';
import axios from "axios";
import styled from "styled-components";
import Navbar from "../Navbar/Navbar";
import RentDetails from "./RentDetails";
import ElectricityDetails from "./ElectricityDetails";
import FurnitureCosts from "./FurnitureCosts";
import InfrastructureCharts from "./InfrastructureCharts/InfrastructureRentChart";
import {Link, Redirect} from 'react-router-dom';
import EquipmentDetails from "./EquipmentDetails";
import ToolDetails from "./ToolDetails";
import InteriorDetails from "./InteriorDetails";

const Div = styled.div`
  
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
}
.alt-btn-select-details{
    box-shadow: 0 0 5px #eeeeee;
    border-radius:5px;
    position:relative;
    top:40px;
    left:100px;
    height: 370px;
}
.alt-infra_seeGraphsbtn{
    position:relative;
    top:20px;
    left:300px;
    border-radius: 10px;
    background-color: rgba(0,0,0,0.3);
    box-shadow: 0 0 5px #eeeeee;
    border-style:none;
    color: white;
    cursor: pointer;
}
`;

export default class Infrastructure extends Component{
    constructor(){
        super();
        this.state={
             click: "",
             Content:"",
             redirect:""
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSeeGraphClick = this.handleSeeGraphClick.bind(this);
    }
    
    async handleClick(e){
        e.preventDefault();
        await this.setState({
            click: e.target.name
        });
        console.log("Click: ", this.state.click);
    }

    handleSeeGraphClick(e){
        e.preventDefault();
        this.setState({
            redirect:"/infrastructureCharts"
        })
    }

    render(){
        let Content
        if(this.state.click == "Rent Details"){
             Content = <RentDetails />
        }
        if(this.state.click == "Electricity costs"){
             Content = <ElectricityDetails />
        }
        if(this.state.click == "Furniture costs"){
            Content = <FurnitureCosts />
        }
        if(this.state.click == "Equipment costs"){
            Content = <EquipmentDetails />
        }
        if(this.state.click == "Tools costs"){
            Content = <ToolDetails />
        }
        if(this.state.click == "Interior costs"){
            Content = <InteriorDetails />
        }
        
        if (this.state.redirect) return <Redirect to={this.state.redirect} />
        return(
          <Div>
            <div className="background">
              <Navbar />
                <div className="alt-infrastructure">
                <div >
                   <button onClick={this.handleSeeGraphClick} className="alt-infra_seeGraphsbtn">See Graphs</button>
                </div>
                <p className="alt-Infrasheading">Infrastructure</p>
                <div className="alt-Infranavbar">
                 <div className="alt-infrastructure-ele1">
                     <button onClick={this.handleClick} name="Rent Details" className="alt-infrastructure-ele1-btn1">Rent Details</button>
                 </div>
                 <div className="alt-infrastructure-ele1">
                     <button onClick={this.handleClick} name="Electricity costs" className="alt-infrastructure-ele1-btn1">Electricity costs</button>
                 </div>
                 <div className="alt-infrastructure-ele1">
                     <button onClick={this.handleClick} name="Furniture costs" className="alt-infrastructure-ele1-btn1">Furniture costs</button>
                 </div>
                 <div className="alt-infrastructure-ele1">
                     <button onClick={this.handleClick} name="Equipment costs" className="alt-infrastructure-ele1-btn1">Equipment costs</button>
                 </div>
                 <div className="alt-infrastructure-ele1">
                     <button onClick={this.handleClick} name="Tools costs" className="alt-infrastructure-ele1-btn1">Tools costs</button>
                 </div>
                 <div className="alt-infrastructure-ele1">
                     <button onClick={this.handleClick} name="Interior costs" className="alt-infrastructure-ele1-btn1">Interior costs</button>
                 </div>
                 <div className="alt-infrastructure-ele1">
                     <button onClick={this.handleClick} name="Other costs" className="alt-infrastructure-ele1-btn1">Other costs</button>
                 </div>
                </div>
                <div className="alt-btn-select-details">
                  {Content}
                </div>
                </div>
            </div>
          </Div>
        )
    }
}