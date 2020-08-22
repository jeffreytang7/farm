import React, { Component } from 'react';
import axios from "axios";
import styled from "styled-components";
import { Card, FormInput, Button } from "shards-react";

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

export default class Summary extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Div>
                <div className='background'>
                    <Card className='alt-card'>
                        <h1 style={{ padding:"20px"}}>Yield Tracking Summary</h1>
                    </Card>
                </div>
            </Div>
        );
    }
}