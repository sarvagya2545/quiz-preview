import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";

class StatusPage extends Component {
    status({ review, answered, read }) {
        if(answered && !review) return 'Answered'; 
        if(answered && review) return 'Answered <<Marked For Review>>';
        if(!answered && review) return 'Not Answered <<Marked For Review>>';
        if(!answered && !review && read) return 'Not Answered';
        return 'Not seen';
    }

    render() {
        const { questionListStatus } = this.props;
        // console.log(this.props);
        return (
            <div className="confirm-container">
                <h1 className="heading">Quiz status</h1>
                <div className="confirm-grid">
                    {questionListStatus.map((question, index) => {
                        return (
                            <React.Fragment key={index + 1}>
                                <div
                                    className={classNames(
                                        "ques-stat",
                                        { 'review': question.markedForReview },
                                        { 'answered': question.answered && question.read },
                                        { 'not-answered': !question.answered && question.read },
                                    )}
                                >
                                    Q{index + 1}
                                </div>
                                <div className="stat">
                                    {this.status({ review: question.markedForReview, answered: question.answered, read: question.read })}
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
                <div className="btn-box">
                    <Link to="/test">
                        <button className="btn btn-submit active">GO BACK</button>
                    </Link>
                    <Link to="/result">
                        <button className="btn-submit inactive btn">
                            CONFIRM SUBMISSION
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { questionList } = state;

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
        questionListStatus
    }
};

export default connect(mapStateToProps)(StatusPage);
