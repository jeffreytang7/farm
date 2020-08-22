import React, { Component } from 'react';
import axios from "axios";
import styled from "styled-components";
import Navbar from "../Navbar/Navbar";
import Sector1 from "./Sector1";
import Sector6 from "./Sector6";
import Sector4 from "./Sector4";
import InfrastructureCharts from "./InfrastructureCharts/InfraChartsMain";
import {Link, Redirect} from 'react-router-dom';
import Sector5 from "./Sector5";
import Sector2 from "./Sector2";
import Sector3 from "./Sector3";


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
            redirect:"/yieldCharts"
        })
    }

    render(){
        let Content
        if(this.state.click == "Sector 1"){
             Content = <Sector1 />
        }
        if(this.state.click == "Sector 6"){
             Content = <Sector6 />
        }
        if(this.state.click == "Sector 4"){
            Content = <Sector4 />
        }
        if(this.state.click == "Sector 5"){
            Content = <Sector5 />
        }
        if(this.state.click == "Sector 2"){
            Content = <Sector2 />
        }
        if(this.state.click == "Sector 3"){
            Content = <Sector3 />
        }
        
        if (this.state.redirect) return <Redirect to={this.state.redirect} />
        return(
          <Div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <div className="background">
              <Navbar />
                <div className="alt-infrastructure">
                <div >
                   <button onClick={this.handleSeeGraphClick} className="alt-infra_seeGraphsbtn">See Graphs</button>
                </div>
                <p className="alt-Infrasheading">Sectors</p>
                <div className="alt-Infranavbar">
                 <div className="alt-infrastructure-ele1">
                     <button onClick={this.handleClick} name="Sector 1" className="alt-infrastructure-ele1-btn1">Sector 1</button>
                 </div>
                 <div className="alt-infrastructure-ele1">
                     <button onClick={this.handleClick} name="Sector 2" className="alt-infrastructure-ele1-btn1">Sector 2</button>
                 </div>
                 <div className="alt-infrastructure-ele1">
                     <button onClick={this.handleClick} name="Sector 3" className="alt-infrastructure-ele1-btn1">Sector 3</button>
                 </div>
                 <div className="alt-infrastructure-ele1">
                     <button onClick={this.handleClick} name="Sector 4" className="alt-infrastructure-ele1-btn1">Sector 4</button>
                 </div>
                 <div className="alt-infrastructure-ele1">
                     <button onClick={this.handleClick} name="Sector 5" className="alt-infrastructure-ele1-btn1">Sector 5</button>
                 </div>
                 <div className="alt-infrastructure-ele1">
                     <button onClick={this.handleClick} name="Sector 6" className="alt-infrastructure-ele1-btn1">Sector 6</button>
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