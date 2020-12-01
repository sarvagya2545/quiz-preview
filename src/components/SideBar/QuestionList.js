import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

class QuestionList extends Component {
    moveToQuestion = (index) => {
        const { currentQuestion, changeQuestion } = this.props;
        changeQuestion(currentQuestion, index);
    }

    render() {
        const { questionListStatus, currentQuestion } = this.props;
        return (
            <div className="question-buttons">
                {questionListStatus.map((ques, index) => {
                    return (
                        <button 
                            className={
                                classnames(
                                    'ques-stat', 
                                    { 'current': index === currentQuestion },
                                    { 'not-answered': !ques.answered && ques.read },
                                    { 'answered': ques.answered && ques.read },
                                    { 'review': ques.markedForReview }
                                )
                            }
                            key={ques.id}

                            onClick={() => { this.moveToQuestion(index) }}
                            >{index + 1}
                        </button>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { questionList, currentQuestion } = state;
    const questionListStatus = questionList.map(question => {
        const { id, markedForReview, read, answer} = question;

        return {
            id,
            markedForReview,
            read,
            answered: answer.length !== 0
        }
    });

    return {
        questionListStatus,
        currentQuestion
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeQuestion: (from, to) => dispatch({
            type: 'CHANGE_QUESTION',
            payload: {
                from,
                to
            }
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);