import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

class QuestionSection extends Component {
    prevQuestion = () => {
        const { current, changeQuestion } = this.props;
        changeQuestion(current, current - 1);
    }
    
    nextQuestion = () => {
        const { current, changeQuestion } = this.props;
        changeQuestion(current, current + 1);
    }

    markForReview = () => {
        const { markForReview } = this.props;
        markForReview();
    }

    render() {
        const { options, total, current, question, answer, markedForReview, isMultiple } = this.props;
        // console.log(this.props);

        return (
            <div className="q-container">
                <div className="question-box">
                    <h3 className="question-no">
                        Question {current + 1} / {total}
                    </h3>
                    <h3 className="question-no" style={{color: 'blue'}}>{isMultiple ? 'Multiple Correct' : 'Single Correct'}</h3>
                    <h1 className="question">{question}</h1>
                </div>
                <ul className="options-list">
                    {options.map((option, index) => {
                        return (
                            <li
                                key={index + 1}
                                className={classNames({ selected: answer.includes(index) })}
                            >
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        // set option in selected options
                                        this.props.selectOption(current, index, isMultiple);
                                    }}
                                >
                                    <span className="opt">{String.fromCharCode(65 + index)}</span>
                                    <div className="option">{`${option}`}</div>
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <div className="btn-box">
                    {current!== 0 && <button className="btn" onClick={this.prevQuestion}>PREVIOUS</button>}
                    <button className="btn" onClick={this.markForReview}>{
                        markedForReview ? 'UNMARK FOR REVIEW' : 'MARK FOR REVIEW'
                    }</button>
                    {current + 1 !== total && <button className="btn" onClick={this.nextQuestion}>NEXT</button>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { currentQuestion, questionList } = state;

    return {
        current: currentQuestion,
        total: questionList.length,
        question: questionList[currentQuestion].question,
        options: questionList[currentQuestion].options,
        answer: questionList[currentQuestion].answer,
        markedForReview: questionList[currentQuestion].markedForReview,
        isMultiple: questionList[currentQuestion].multiple
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectOption: (current, index, isMultiple) => dispatch({
            type: "SELECTED_OPTION",
            payload: {
                currentQuestion: current,
                optionIndex: index,
                isMultiple
            },
        }),
        changeQuestion: (from, to) => dispatch({
            type: 'CHANGE_QUESTION',
            payload: {
                from,
                to
            }
        }),
        markForReview: () => dispatch({
            type: 'MARK_FOR_REVIEW'
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionSection);
