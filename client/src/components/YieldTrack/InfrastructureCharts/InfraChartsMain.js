import React, { Component } from 'react';
import axios from "axios";
import styled from "styled-components";
import Navbar from "../../Navbar/Navbar";
import YieldSector1Chart from "./yieldSector1Chart";
import InfrastructureElectricityCharts from "./InfrastructureElectricityChart";
import InfrastructureFurnitureCharts from "./InfraStructureFurnitureChart";
import InfrastructureEquipmentCharts from "./InfrastructureEquipmentChart";
import InfrastructureToolCharts from "./InfrastructureToolChart";
import InfrastructureInteriorCharts from "./InfrastructureInteriorChart";

import {Link, Redirect} from 'react-router-dom';

const Div = styled.div`
  
.alt-infrastructure-ele1{
    position:relative;
    left:100px;
}
.alt-Infranavbar{
    display:flex;
    top:50px;
    position:relative;
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
    position:relative;
    top:40px;
    left:0px;
    height: 370px;
}
.alt-infra_seeGraphsbtn{
    position:relative;
    top:20px;
    left:300px;
    border-radius: 10px;
    background-color: rgba(0,0,0,0.3);
    color: white;
}
`;

export default class InfraChartsMain extends Component{
    constructor(){
        super();
        this.state={
             click: "",
             Content:"",
             redirect:""
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSeeDataClick = this.handleSeeDataClick.bind(this);
    }
    
    async handleClick(e){
        e.preventDefault();
        await this.setState({
            click: e.target.name
        });
        console.log("Click: ", this.state.click);
    }

    handleSeeDataClick(e){
        e.preventDefault();
        this.setState({
            redirect:"/Yieldtrack"
        })
    }

    render(){
        let Content
        if(this.state.click == "Sector 1 Details"){
             Content = <YieldSector1Chart />
        }
        if(this.state.click == "Electricity costs"){
             Content = <InfrastructureElectricityCharts />
        }
        if(this.state.click == "Furniture costs"){
            Content = <InfrastructureFurnitureCharts />
        }
        if(this.state.click == "Equipment costs"){
            Content = <InfrastructureEquipmentCharts />
        }
        if(this.state.click == "Tools costs"){
            Content = <InfrastructureToolCharts />
        }
        if(this.state.click == "Interior costs"){
            Content = <InfrastructureInteriorCharts />
        }
        
        if (this.state.redirect) return <Redirect to={this.state.redirect} />
        return(
          <Div>
            <div className="background">
              <Navbar />
                <div className="alt-infrastructure">
                <p className="alt-Infrasheading">Infrastructure</p>
                <button onClick={this.handleSeeDataClick} className="alt-infra_seeGraphsbtn">See Data</button>
                <div className="alt-Infranavbar">
                 <div className="alt-infrastructure-ele1">
                     <button onClick={this.handleClick} name="Sector 1 Details" className="alt-infrastructure-ele1-btn1">Sector 1 Details</button>
                 </div>
                 <div className="alt-infrastructure-ele1">
                     <button onClick={this.handleClick} name="Sector 2 Details" className="alt-infrastructure-ele1-btn1">Sector 2 Details</button>
                 </div>
                 <div className="alt-infrastructure-ele1">
                     <button onClick={this.handleClick} name="Sector 3 Details" className="alt-infrastructure-ele1-btn1">Sector 3 Details</button>
                 </div>
                 <div className="alt-infrastructure-ele1">
                     <button onClick={this.handleClick} name="Sector 4 Details" className="alt-infrastructure-ele1-btn1">Sector 4 Details</button>
                 </div>
                 <div className="alt-infrastructure-ele1">
                     <button onClick={this.handleClick} name="Sector 5 Details" className="alt-infrastructure-ele1-btn1">Sector 5 Details</button>
                 </div>
                 <div className="alt-infrastructure-ele1">
                     <button onClick={this.handleClick} name="Sector 6 Details" className="alt-infrastructure-ele1-btn1">Sector 6 Details</button>
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