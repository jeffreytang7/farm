import React, {Component} from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";
import Axios from "axios";

const Div = styled.div`

 .alt-infra-chart1{
     position:relative;
     top:50px;
     left:50px;
     display:flex;
 }
 .alt-infraRent-Chart{
    box-shadow: 0 0 5px #eeeeee;
    border-radius: 10px;
    margin-left:60px;
    background-color: rgba(0,0,0,0.3);
 }
`;

export default class YieldSector1Chart extends Component{
    constructor(){
        super();
        this.state = {
           Charts_data:[],
           crop_name:[],
           months:["January","February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
           
        }
    }

    componentDidMount(){
        Axios.get("http://localhost:3001/yield/getAllSector1Details")
        .then(res => {
            console.log("res.data: " ,res.data)
            this.setState({
                Charts_data:res.data
            })
            console.log("Charts_data: ", this.state.Charts_data)
            Object.keys(res.data).forEach((key, index) => {
                this.state.crop_name.push(key);
                this.setState({
                    crop_name: this.state.crop_name
                })
                
            })
            //console.log("this.state.crop_name: " ,this.state.crop_name);
        });
    }

    render(){
        return(
          <Div>
             <div className="alt-infra-chart1">
                 {this.state.crop_name.map((crop_name,index) => {
                    var options={
                        chart:{
                            id:"basic-bar"
                        },
                        xaxis:{
                            categories:[],
                            labels:{
                                style:{
                                    colors: 'white'
                                }
                            }
                        },
                        yaxis:{
                            labels:{
                                style:{
                                    colors:'white'
                                }
                            }
                        },
                        title:{
                            text: crop_name,
                            margin: 20,
                            align: 'center',
                            style:{
                                fontSize:  '20px',
                                fontWeight:  'bold',
                                color: 'white'
                            }
                        }
                    };
                    var series= [
                        {
                            name:"series-1",
                            data:[],
                            
                        }
                    ]
                     Object.entries(this.state.Charts_data[crop_name]).forEach((entry,indx) => {
                         options.xaxis.categories.push(entry[0]);
                         series[0].data.push(entry[1]);
                     })
                     return(
                        <Chart key={index}
                        className="alt-infraRent-Chart"
                        options= {options}
                        series={series}
                        type="bar"
                        width="400"
                        />
                 )})}
             </div>
          </Div>
        )
    }
}