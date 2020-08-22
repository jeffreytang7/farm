import React from 'react';

import './Dashboard.css';
import Navbar from '../Navbar/Navbar';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {
      email: ''
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="background">
          <Navbar />
        </div>     
      </React.Fragment>
      
    );
  }
}

export default Dashboard;
