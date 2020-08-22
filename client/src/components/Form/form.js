import React from 'react';
import Navbar from '../Navbar/Navbar';
import styled from "styled-components";

const Div = styled.div`
   position: relative;
   top:50px;
   left:150px;
   width:1000px;
`;

const form = props => {
  return (
    <React.Fragment>
      <Navbar />
      <Div>
      <div className="">
        <div id="login-row" className="row justify-content-center align-items-center">
          <div id="login-column" className="col-md-6 py-3">
            <div id="login-box" className="col-md-12">
              <form
                id="login-form"
                className="form"
                method="post"
                onSubmit={props.onSubmit}>
                {props.children}
              </form>
            </div>
          </div>
        </div>
      </div>
      </Div>
    </React.Fragment>
  );
}

export default form;