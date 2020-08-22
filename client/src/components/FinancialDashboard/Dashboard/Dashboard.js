import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import './Dashboard.css';
import Navbar from '../Navbar/Navbar';

class FDashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Navbar />
            </React.Fragment>
        );
    }
}
export default FDashboard;
