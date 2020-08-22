import React from "react";
import styled from "styled-components";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const Div = styled.div`
.background-wrapper {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    /*justify-content: center;*/
    align-items: center;
}
  
.wrapper {
    width: 500px;
    display: flex;
    flex-direction: column;
    margin-top: 60px;
    /* padding: 20px 40px; */
    border-radius: 10px;
    box-shadow: 0px 10px 50px #555;
    background-color: #ffffff;
}

.header-wrapper {
    padding-top: 0px;
    height: 70px;
    background-color: #17a2b7;
}

.topic {
    text-align: center;
    font-size: 30px;
    padding: 15px;
    color: #ffffff;
    
}

.form-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    padding: 20px 10px 10px 10px;
    border-radius: 10px;
    
}

.Row {
    width: 100%; 
    /* margin-bottom: 20px; */
    padding: 10px;
    /* border: 1px solid #ccc;
    border-radius: 3px; */
}

.button-style{
    background-color: white;
    color: blue;
    border: none;
    font-weight: 1000;
    width: 480px;
    padding: 15px;
  }
  
  .button-style:hover{
    background-color: #17a2b7;
    color: white;
    text-decoration: double;
    border: none;
  
  }

.form {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.App{
    position:relative;
    left:70px;
}
.alt-item{
    position:relative;
    left:70px;
}
.alt-dropdwn{
    position:relative;
    left:120px;
}
.alt-row{
    position:relative;
    top:0px;
}
.alt-msg{
    position:relative;
    top:10px;
    left: 150px;
}
.input.error {
    border: 3px solid red;
  }
`;


export default class Form extends React.Component {
  constructor(){
    super();
     this.state = {
       Name: "",
       Item: "",
       Amount: "",
       Option: "",
       RemainAmount: "",
       msg:"",
     };
  }
  
  componentDidMount(){
    axios.get("http://localhost:3001/users/materialusefill")
        .then(response => {
          console.log(response)
        })
        .catch(err => console.error(err));
  }

  change(event) {
    if (event.target.name === "Item") {
      axios.get("http://localhost:3001/users/material?item=" + event.target.value)
        .then(response => {
          if (response.length !== 0) {
            this.setState({
              ["RemainAmount"]: response.data.amount
            });
          }
        })
      .catch(err => console.error(err));
    }
  
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:3001/users/materialuse",{
        name: this.state.Name,
        item: this.state.Item,
        amount: this.state.Amount,
        action: this.state.Option,
    }).then(res=>{
        console.log("response:",res.data);
        this.setState({
            msg: res.data,
            Amount: "",
            Option: "",
            Name: "",
            Item: "",
            RemainAmount: "",
        })
    })
  };

  render() {
    return (
     <Div>
       <div className='background'>
       <Navbar />
      <div className="background-wrapper">
        <div className="wrapper">

          <div className="header-wrapper">
            <h1 className="topic">Material Use</h1>
          </div>

          <div className="form-wrapper">
            <form>
             <div className="alt-item">
                <div className="App" >
                  <p>Time: {new Date().toLocaleTimeString()} | Date: {new Date().toLocaleDateString()}</p>
                </div>
                <p></p>
              <div className="alt-row">
                <label>Item:</label>
                <select className="alt-dropdwn" id = "dropdown" value={this.state.Item} name= "Item" onChange={e => this.change(e)}>
                  <option value="selectItem">Select an item</option>
                  <option value="manure">manure</option>
                  <option value="growth enhancers">growth enhancers</option>
                  <option value="seeds">seeds</option>
                  <option value="natural fertilizer">natural fertilizer</option>
                  <option value="soil enhancers">soil enhancers</option>
                  <option value="pest control">pest control</option>  
                </select>
               </div>
                <div style={{top:"0px"}} className="alt-row">
                  <label>Remaining Amount:</label>
                  <input style={{ left:"15px"}} className="alt-dropdwn"
                    name="RemainAmount"
                    placeholder="Amount Displayed Here"
                    value={this.state.RemainAmount}
                    onChange={e => this.change(e)}
                    disabled={true}
                  />
                </div>
              

              <div className="alt-row">
                <label>Amount:</label>
                <input
                  style={{ left:"95px"}}
                  className="alt-dropdwn"
                  name="Amount"
                  placeholder="Amount"
                  value={this.state.Amount}
                  onChange={e => this.change(e)}
                />
                {/\D/.exec(this.state.Amount) && (
                  <span>{this.state.Amount}</span>
                )}
                </div>
                <div className="alt-row">
                  <label>Action:</label>
                  <select style={{ left:"105px"}} value={this.state.Option} className="alt-dropdwn" id = "dropdown" name= "Option" onChange={e => this.change(e)}>
                    <option value="">Select an action</option>
                    <option value="add">Adding (+)</option>
                    <option value="sub">Removing (-)</option>
                  </select>
                </div>
              <div className="alt-row">
                <label>Name:</label>
                <input
                  style={{ left:"110px"}}
                  className="alt-dropdwn"
                  name="Name"
                  placeholder="Name"
                  value={this.state.Name}
                  onChange={e => this.change(e)}
                />
              </div>
             </div>
             <button className="button-style" onClick={this.onSubmit}><bold>SUBMIT</bold></button>
             <p className="alt-msg">
                 {this.state.msg}
             </p>
            </form>
          </div>
        </div>
      </div>
      </div>
    </Div>      
    );
  }
}
