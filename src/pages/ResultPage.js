import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

class ResultPage extends Component {
    score = 0;
    maxScore = 0;

    getResults = () => {
        // fetch answers
        const answers = [
            {
                id: 1,
                correctAnswers: [0]
            },
            {
                id: 2,
                correctAnswers: [1]
            },
            {
                id: 3,
                correctAnswers: [2]
            },
            {
                id: 4,
                correctAnswers: [0]
            },
            {
                id: 5,
                correctAnswers: [0,1,2]
            },
            {
                id: 6,
                correctAnswers: [0]
            },
            {
                id: 7,
                correctAnswers: [3]
            },
            {
                id: 8,
                correctAnswers: [0]
            },
            {
                id: 9,
                correctAnswers: [1]
            },
            {
                id: 10,
                correctAnswers: [0]
            }
        ]

        // get scores.
        const correctScore = 2;
        const incorrectScore = -1;
        const notAttemptedScore = 0;

        // compare answers with questions in the state.
        const responses = this.props.questionListResult;
        const answersArray = this.checkAnswers(answers, responses);

        // return an array with needed values.
        const results = answersArray.map((ans, index) => {
            const { stat, correctAnswers, attemptedAnswers } = ans;
            this.maxScore += correctScore;

            switch(stat) {
                case 'NO_RESPONSE': {
                    this.score += notAttemptedScore;
                    return (
                        <>
                            <div className="ques-stat">{index + 1}</div>
                            <div className="answer">Not answered</div>
                            <div className="correct">{correctAnswers.join(', ')}</div>
                            <div className="marks">0</div>
                        </>
                    )
                }

                case 'WRONG_ANSWER': {
                    this.score += incorrectScore;
                    return (
                        <>
                            <div className="ques-stat not-answered">{index + 1}</div>
                            <div className="answer">{attemptedAnswers.join(', ')}</div>
                            <div className="correct">{correctAnswers.join(', ')}</div>
                            <div className="marks">-1</div>
                        </>
                    )
                }

                case 'RIGHT_ANSWER': {
                    this.score += correctScore;
                    return (
                        <>
                           <div className="ques-stat answered">{index + 1}</div>
                            <div className="answer">{attemptedAnswers.join(', ')}</div>
                            <div className="correct">{correctAnswers.join(', ')}</div>
                            <div className="marks">+2</div> 
                        </>
                    )
                }
                default:
                    return null;
            }
        });

        return results;
    }

    checkAnswers(ans, res) {
        const answersArray = ans.map(answer => {
            const foundResponse = _.find(res, response => {
                return response.id === answer.id;
            })
            // console.log(foundResponse);

            const attemptedAnswers = foundResponse.answer;
            const correctAnswers = answer.correctAnswers;

            if (foundResponse.answer.length === 0) {
                return { stat: 'NO_RESPONSE', correctAnswers };
            } 

            if(attemptedAnswers.length !== correctAnswers.length) {
                return {
                    stat: 'WRONG_ANSWER',
                    attemptedAnswers,
                    correctAnswers
                }
            }

            const byId = obj => obj.id;

            const sortedAttemptedAnswers = _.sortBy(attemptedAnswers, byId);
            const sortedCorrectAnswers = _.sortBy(correctAnswers, byId);

            for(var i = 0; i < sortedAttemptedAnswers.length; i++) {
                if(sortedAttemptedAnswers[i] !== sortedCorrectAnswers[i]) {
                    return {
                        stat: 'WRONG_ANSWER',
                        attemptedAnswers,
                        correctAnswers
                    }
                }
            }

            return {
                stat: 'RIGHT_ANSWER',
                attemptedAnswers,
                correctAnswers
            };
        });
        
        return answersArray;
    }

    render() {
        console.log(this.props.history);
        const results = this.getResults();
        return (
            <div className="result-container">
            <h1 className="score">YOUR SCORE: {this.score}/{this.maxScore}</h1>
            <div className="report">
                    <h3 className="report-heading q">Q. no.</h3>
                    <h3 className="report-heading ans">Your response</h3>
                    <h3 className="report-heading correct">Correct response</h3>
                    <h3 className="report-heading marks">Marks allotted</h3>

                    {results.map((result, index) => {
                        return (
                            <React.Fragment key={index}>
                                {result}   
                            </React.Fragment>
                        )
                    })}
            </div>
            <Link to="/">
                <button className="btn btn-restart" onClick={this.props.resetQuiz}>RESTART TEST</button>
            </Link>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { questionList } = state;

    const questionListResult = questionList.map((ques) => {
        const { id, answer } = ques;
        return {
            id,
            answer
        }
    })

    return {
        questionListResult
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetQuiz: () => dispatch({ type: 'RESET_QUIZ' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);