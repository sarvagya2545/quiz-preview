import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import "./App.css";
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';
import StatusPage from './pages/StatusPage';
import StartPage from './pages/StartPage';

class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={StartPage} />
                <Route path="/test" component={TestPage}/>
                <Route path="/result" component={ResultPage}/>
                <Route path="/status" component={StatusPage}/>
            </Router>
        );
    }
}

export default App;
