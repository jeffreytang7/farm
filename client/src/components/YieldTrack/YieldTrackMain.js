import React, { Component } from 'react';
import axios from "axios";
import { Redirect } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import styled from "styled-components";
import Summary from "./Summary";
import FarmView from "./FarmView";

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
`;

class YieldTrackMain extends Component {
    constructor(){
        super();
        this.state={
             click: "",
             Content:"",
             redirect:""
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSector = this.handleSector.bind(this);
    }
    
    handleClick(e){
        e.preventDefault();
        this.setState({
            click: e.target.name
        }); 
    }
    
    handleSector(e){
        this.setState({ redirect: '/yieldtrack/SectorView' })
    }

    render(){
        let Content
        if(this.state.click == "Summary"){
            Content = <Summary />
        }
        if(this.state.click == "Farm View"){
            Content = <FarmView />
        }
        if (this.state.redirect) return <Redirect to={this.state.redirect} />
        return(
          <Div>
            <div className="background">
            <Navbar />
                <div className="alt-infrastructure">
                    <p className="alt-Infrasheading">Yield Tracking</p>
                    <div className="alt-Infranavbar">
                        <div className="alt-infrastructure-ele1">
                            <button onClick={this.handleClick} name="Summary" className="alt-infrastructure-ele1-btn1">Summary</button>
                        </div>
                        <div className="alt-infrastructure-ele1">
                            <button onClick={this.handleClick} name="Farm View" className="alt-infrastructure-ele1-btn1">Farm View</button>
                        </div>
                        <div className="alt-infrastructure-ele1">
                            <button onClick={this.handleSector} className="alt-infrastructure-ele1-btn1">Sector View</button>
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

export default YieldTrackMain;

