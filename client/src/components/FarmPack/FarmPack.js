import React , {Component} from "react";
import { Button, Container, Input, Label, Form } from 'reactstrap';
import styled from "styled-components";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

const renderUnit = (units, index) => {
    return (
        <option>{units.unit}</option>
    )
}

const renderItem = (items, index) => {
    return (
        <option>{items.item}</option>
    )
}

const renderLocation = (locations, index) => {
    return (
        <option>{locations.location}</option>
    )
}

const renderSenders = (senders, index) => {
    return <option>{senders.sender}</option>;
}

const renderPaymentTypes = (paymentTypes, index) => {
    return <option>{paymentTypes.paymentType}</option>;
}

const Div = styled.div`
  .form-card{
    box-shadow: 0 0 5px #eeeeee;
    border-radius:10px;
    top:0px;
    background-color:rgba(0, 0, 0, 0.1);
    width:1100px;
    height:380px;
  }
  .alt-heading{
      color:white;
  }
  .material{
      display:flex;
      position:relative;
      left:20px;
  }
  .alt-itm{
      color:white;
  }
  .alt-element1{
      display:flex;
      position:relative;
      left: 0px;
      color:white;
  }
  .alt-element2{
    width:300px;
    color:white;
    display:flex;
    position:relative;
    left: 70px;
  }
  .alt-txtbox{
      position:relative;
      left:10px;
      height:37px;
      background-color:rgba(0, 0, 0, 0.1);
      color:white;
      ::placeholder{
          color:white;
      }
  }
  .alt-element3{
    color:white;
    display:flex;
    position:relative;
    left: 120px;
  }
  .submit-btn{
      position:relative;
      left:320px;
      width:300px;
      top:10px;
  }
  .alt-FarmPack-msg{
      position:relative;
      top: 15px;
      left:380px;
  }
`;

export default class FarmPack extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allFieldsFilled: false,

            num: "",
            location:"",
            unit: "'--Select One--'",
            item: "'--Select One--'",
            sender:"",
            paymentType:"",
            referenceNumber:"",
            msg:"",
            receiver:"",
            error: '',

            //the database with the locations should be in the backend database       

            units: [
                { unit: '--Select One--', id: 0 },
                { unit: 'Kg', id: 1 },
                { unit: 'g', id: 2 },
                { unit: 'L', id: 3 },
                { unit: 'mL', id: 4 },
            ],

            senders: [
                { sender: "--Select One--" },
                { sender: "one" },
                { sender: "two" },
                { sender: "three" },
            ],

            //this needs to come from the database backend
            items: [
                { item: '--Select One--', id: 0 },
                { item: 'Tomatoes', id: 1 },
                { item: 'Bell Pepper', id: 2 },
                { item: 'Cucumber', id: 3 },
                { item: 'Watermelon', id: 4 },
                { item: 'Banana', id: 5 },
            ],

            locations: [
                { location: '--Select One--', id: 0 },
                { location: 'San Jose', id: 1 },
                { location: 'Cupertino', id: 2 },
                { location: 'Saratoga', id: 3 },
                { location: 'Sunnyvale', id: 4 },
                { location: 'Gilroy', id: 5 },
            ],
            paymentTypes: [
                { paymentType: "--Select One--" },
                { paymentType: "Visa" },
                { paymentType: "MasterCard" },
            ],

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFarmPacking = this.handleFarmPacking.bind(this);
        this.fieldsFilled = this.fieldsFilled.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleFarmPacking(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(e){
        e.preventDefault();
        this.fieldsFilled();
        axios.post("http://localhost:3001/users/farmpacking",{
            item:this.state.item,
            num:this.state.num,
            unit:this.state.unit,
            sender:this.state.sender,
            paymentType:this.state.paymentType,
            referenceNumber:this.state.referenceNumber,
            location:this.state.location,
            receiver:this.state.receiver
        }).then(res => {
            console.log(res.data);
            this.setState({
                msg:res.data
            });
        })
    }

    fieldsFilled(entry) {
        let error = '';
        var alertMessage = "";
        if (
            !this.state.num || !this.state.unit || !this.state.item) {
            alertMessage = alertMessage + 'You do not have all the required fields filled!\n';
        }
        if (this.state.unit === "'--Select One--'") {
            alertMessage = alertMessage + 'You did not select a valid unit\n';
        }
        if (this.state.item === "'--Select One--'") {
            alertMessage = alertMessage + 'You did not select a valid item\n';
        }
        if (this.state.num === "") {
            alertMessage = alertMessage + 'num incomplete!\n';
        }

        if (!(alertMessage === "")) {
            alertMessage = alertMessage + 'Entry submitted:\n' + '\nnum = ' + this.state.num +
                '\nunit = ' + this.state.unit + '\nitem = ' + this.state.item ;
            alert(alertMessage)

        }
        else {
            this.setState({ allFieldsFilled: true });
        }

        this.setState.error = error;
    }
    
    render(){
        return(
            <Div>
            <div className='background'>
                <Navbar />
                <Container className='container'>
                    <div className='form-card'>
                        <h2 className="alt-heading">Farm packing</h2>
                        <hr/>
                                <div className='material'>
                                    <div className="alt-element1">
                                      <Label className="alt-itm">Item:</Label>
                                      <Input
                                          className="alt-txtbox"
                                          type='select'
                                          name="item"
                                          style={{left:"80px",width:"150px"}}
                                          placeholder='items'
                                          onChange={
                                              this.handleChange}
                                      >
                                          {this.state.items.map(renderItem)}
                                      </Input>
                                    </div>
                                    <div style={{left:"140px"}} className="alt-element2">
                                      <Label>Package Weignt: </Label>
                                      <Input
                                          className="alt-txtbox"
                                          type='material'
                                          name="num"
                                          placeholder='Ex. 10'
                                          onChange={
                                              this.handleChange
                                          }
                                      >
                                      </Input>
                                    </div>
                                    <div style={{left:"200px"}} className='alt-element3'>
                                        <label>Units:</label>
                                        <Input
                                            className="alt-txtbox"
                                            type='select'
                                            style={{left:"35px",width:"220px"}}
                                            name="unit"
                                            placeholder='Units'
                                            onChange={
                                                this.handleChange}
                                        >
                                            {this.state.units.map(renderUnit)}
                                        </Input>
                                    </div>
                                </div>
                                <div className='material'>
                                    <div className="alt-element1">
                                      <Label>Location:</Label>
                                      <Input
                                          type='select'
                                          className="alt-txtbox"
                                          style={{left:"50px",width:"150px"}}
                                          name="location"
                                          placeholder='e.g. Gilroy'
                                          onChange={this.handleChange
                                          }
                                      >
                                          {this.state.locations.map(renderLocation)}
                                      </Input>
                                    </div>
                                    <div style={{left:"110px"}} className="alt-element2">
                                      <Label>Sender: </Label>
                                      <Input 
                                          type='select'
                                          style={{left:"40px",width:"220px"}} 
                                          className="alt-txtbox"
                                          name="sender"
                                          placeholder='sender'
                                          onChange={this.handleChange}
                                      >
                                          {this.state.senders.map(renderSenders)}
                                      </Input>
                                    </div>
                                    <div style={{left:"170px"}} className='alt-element3'>
                                       <Label>Received By:</Label>
                                       <Input
                                           type="text"
                                           className="alt-txtbox"
                                           name="receiver"
                                           placeholder="Employee ID#"
                                           onChange={this.handleChange}
                                       />
                                    </div>
                                </div>
                                <div className='material'>
                                    <div className="alt-element1">
                                       <Label>Payment Type:</Label>
                                       <Input
                                           type="select"
                                           className="alt-txtbox"
                                           style={{left:"10px",width:"150px"}}
                                           name="paymentType"
                                           onChange={this.handleChange}
                                       >
                                           {this.state.paymentTypes.map(renderPaymentTypes)}
                                       </Input>
                                    </div>
                                    <div className="alt-element2">
                                       <Label>Payment Reference #:</Label>
                                       <Input
                                           type="text"
                                           className="alt-txtbox"
                                           style={{left:"15px",width:"220px"}}
                                           name="referenceNumber"
                                           onChange={this.handleChange}
                                       />
                                    </div>
                                </div>
                        {/* this is the button */}
                        <Form>
                            <Button className='submit-btn'
                                onClick={this.handleSubmit}
                            >
                                Submit
                            </Button>
                        </Form>
                        <div className="alt-FarmPack-msg">{this.state.msg}</div>
                    </div>
                </Container>
            </div>
            </Div>
        )
    }
}