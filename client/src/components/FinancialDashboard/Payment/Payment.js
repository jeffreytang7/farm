import React, { Component } from 'react';
import './Payment-history.css';
import { Button } from 'reactstrap';
import Navbar from "../../Navbar/Navbar";
import { Link, NavLink, Redirect } from 'react-router-dom';


class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHeader: [
                { id: 'Date' },
                { id: 'Work Time (hr)' },
                { id: 'Over Time (hr)' },
                { id: 'Bonus' },
                { id: 'Total Earned' },
                // { id: 'Status' },
            ],

            tableInfo: [
                { info: '1/12/20' },
                { info: '6' },
                { info: '0' },
                { info: '$5.00' },
                { info: '$95.00' },
                // { info: 'pending' }
            ]
        }
    }

    render() {
        if (this.state.redirect) return <Redirect to="/" />;
        return (
            <div className='background'>
                <Navbar />
                <div className='payment-container'>
                        <div className="alt-navbar">
                            <React.Fragment>
                                <Link className="alt-lnk1" to="/AccountInfo">Account Information</Link>
                                <Link className="alt-lnk2" to="/Payment">Payment History</Link>
                                <Link className="alt-lnk3" to="/InputWages">Input Wages</Link>
                            </React.Fragment>
                        </div>
                    <div className='form-card'>
                        <h2>Payment History</h2>
                        <hr />
                        <div>
                            Name's Account  Hourly-Wage Overtime-Wage
                        </div>
                        <div className='table-container'>
                            <table className='table'>
                                {this.state.tableHeader.map((type, ind) =>
                                    <th className='table-header' key={ind}>{type.id}</th>)}
                                <tr className='row-background'>
                                    {this.state.tableInfo.map((type, ind) =>
                                        <td className='cell'>
                                            {type.info}
                                        </td>
                                    )}
                                </tr>
                            </table>
                        </div>
                        <div className='center-btn'>
                            <Button className='return-btn'>
                                <React.Fragment>
                                    <NavLink className="nav-item nav-link" to="/">Home</NavLink>
                                </React.Fragment>   
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
export default Payment;

