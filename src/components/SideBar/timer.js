import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Timer extends Component {
    state = {
        min: 0,
        sec: 20
    }

    finishTest = () => {
        // Test finished
        this.props.history.push('/result');
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            this.setState(({ min, sec }) => {
                sec -= 1;
                if(sec < 0) {
                    sec = 59; 
                    min -=1;
                    if (min < 0) {
                        clearInterval(this.myInterval);
                        this.finishTest();
                        return {
                            sec: 0,
                            min: 0
                        }
                    }
                }

                return {
                    sec, min
                }
            })
        }, 1000);
    }

    render() {
        const { min, sec } = this.state;
        return (
            <div className="timer-box">
                <h1 className="timer"> { min }:{ sec >= 10 ? sec : `0${sec}`} min </h1>
            </div>
        )
    }
}

export default withRouter(Timer);