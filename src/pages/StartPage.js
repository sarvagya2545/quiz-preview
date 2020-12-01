import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class StartPage extends Component {
    render() {
        return (
            <Link to="/test">TEST PAGE</Link>
        )
    }
}

export default StartPage;