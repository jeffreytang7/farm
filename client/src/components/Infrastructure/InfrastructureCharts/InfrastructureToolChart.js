import React, {Component} from "react";
import styled, { withTheme } from "styled-components";
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

export default class InfrastructureToolCharts extends Component{
    constructor(){
        super();
        this.state = {
           Charts_data:[],
           locations:[],
           months:["January","February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
           
        }
    }

    componentDidMount(){
        Axios.get("http://localhost:3001/infrastructure/getAllToolDetails")
        .then(res => {
            console.log("res.data: " ,res.data)
            this.setState({
                Charts_data:res.data
            })
            console.log("Charts_data: ", this.state.Charts_data)
            Object.keys(res.data).forEach((key, index) => {
                this.state.locations.push(key);
                this.setState({
                    locations: this.state.locations
                })
                
            })
            //console.log("this.state.locations: " ,this.state.locations);
        });
    }

    render(){
        return(
          <Div>
             <div className="alt-infra-chart1">
                 {this.state.locations.map((location,index) => {
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
                            text: location,
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
                    ];
                     Object.entries(this.state.Charts_data[location]).forEach((entry,indx) => {
                         options.xaxis.categories.push(entry[0]);
                         series[0].data.push(entry[1]);
                     })
                     return(
                        <Chart key={index}
                        className="alt-infraRent-Chart"
                        options= {options}
                        series={series}
                        type="area"
                        width="400"
                        />
                 )})}
             </div>
          </Div>
        )
    }
}