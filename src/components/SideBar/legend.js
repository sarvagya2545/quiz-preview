import React from 'react'

function Legend() {
    return (
        <div className="legend">
            <div className="text">LEGEND</div>
            <button className="ques-legend answered">Answered</button>
            <button className="ques-legend not-answered">
                Not Answered but read
            </button>
            <button className="ques-legend current">Current Question</button>
            <button className="ques-legend review">Marked for review</button>
            <button className="ques-legend">Not read</button>
        </div>
    )
}

export default Legend;