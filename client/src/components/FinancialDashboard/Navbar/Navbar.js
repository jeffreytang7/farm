import React from 'react';
import './Navbar.css';

import { Link, NavLink } from 'react-router-dom';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">Home Page</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <React.Fragment>
                                <NavLink className="nav-item nav-link" to="/AccountInfo">Financial Dashboard</NavLink>
                                {/* <NavLink className="nav-item nav-link" to="/AccountInfo">Account Information</NavLink>
                                <NavLink className="nav-item nav-link" to="/Payment">Payment History</NavLink>
                                <NavLink className="nav-item nav-link" to="/InputWages">Input Wages</NavLink> */}
                            </React.Fragment>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;