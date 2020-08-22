import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from "styled-components";

const Ddiv = styled.div`
  position:relative;
  height:80px;
  width:auto;
  background-color: #17a2b7;
  .alt-container{
    display: flex;
    position:absolute;
    top:20px;
    left:100px;
  }
  .alt-optns{
    display: flex;
    position:relative;
    top:-10px;
    left:300px;
  }
  .alt-link{
    color:white;
    position:relative;
    top:-5px;
    font-size:25px;
  }
  
`;
const Div = styled.div`
  position:relative;
  display: flex;
  top:8px;
  right:10px;
  .alt-lnk{
    color: white;
    position:relative;
    top:8px;
  }
`;

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.getItem('userTokenTime')
    }
  }

  render() {
    return (
      <Ddiv>
        
        <div className="alt-container">
          <Link className="alt-link" to="/">Farm Supply chain</Link>
            <div className="alt-optns">
              {this.state.loggedIn ?
                <React.Fragment>
                  <Div>
                   <Link className="alt-lnk" to="/farmpack">Farm Pack</Link>
                   <Link style={{left:"20px"}} className="alt-lnk" to="/infrastructure">Infrastructure</Link>
                   <Link style={{left:"40px"}} className="alt-lnk" to="/toolcheckout">Tool Checkout</Link>
                   <Link style={{left:"60px"}} className="alt-lnk" to="/accountinfo">Financial Dashboard</Link>
                   <Link style={{left:"80px"}} className="alt-lnk" to="/Materialuse">Material Use</Link>
                   <Link style={{left:"100px"}} className="alt-lnk" to="/Yieldtrack">Yield Track</Link>              
                   <NavLink style={{position:"relative",left:"120px"}} className="alt-lnk" to="/signOut">Sign Out</NavLink>
                  </Div>
                </React.Fragment>
                :
                <React.Fragment>
                 <Div>
                  <Link className="alt-lnk" to="/Labour">Labour Time</Link>
                  <Link style={{left:"20px"}} className="alt-lnk" to="/signIn">Sign In</Link>
                  <Link style={{left:"40px"}} className="alt-lnk" to="/signUp">Sign Up</Link>
                  <Link style={{left:"60px"}} className="alt-lnk" to="/forgotPassword">Forgot Password</Link>
                 </Div>
                </React.Fragment>}
            </div>
        </div>
    </Ddiv>
    );
  }
}

export default Navbar;