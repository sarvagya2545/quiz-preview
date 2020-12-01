import React, { Component } from 'react'
import Legend from '../SideBar/legend';
import Timer from '../SideBar/timer';
import QuestionList from '../SideBar/QuestionList';
import { Link } from 'react-router-dom';

class Sidebar extends Component {

    render() {
        return (
            <div className="status-container">
                <Timer />
                <QuestionList />
                <Legend />
                <Link to="/status">
                    <div className="btn btn-submit active">SUBMIT</div>
                </Link>
            </div>
        )
    }
}

export default Sidebar;