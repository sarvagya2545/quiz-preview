const initState = {
    // time: {
    //     start: 
    // },
    currentQuestion: 0,
    questionList: [
        {
            id: 1,
            question: "What do you mean by Node Controller?",
            // array of the options given in the question
            options: [
                "Node controller are the group of services which were running in the Kubernetes Master",
                "Node controller are the group of services which were running in the Kubernetes Swarm"
            ],
            multiple: false,
            markedForReview: false,
            read: true,
            // list of options ticked by the user
            answer: []
        },
        {
            id: 2,
            question: "What is the use of Canvas element in HTML5?",
            // array of the options given in the question
            options: [
                "The canvas element is used to draw graphics by making use of CSS. It is defined with the <canvas> tag.",
                "The canvas element is used to draw graphics by making use of JavaScript. It is defined with the <canvas> tag."
            ],
            multiple: false,
            markedForReview: false,
            read: false,
            // list of options ticked by the user
            answer: []
        },
        {
            id: 3,
            question: "What is the correct HTML for adding a background color?",
            // array of the options given in the question
            options: [
                "<body bg=\"yellow\">",
                "<background>yellow</background>",
                "<body style=\"background-color:yellow;\">",
                "<body style bg=\"yellow\">"
            ],
            multiple: false,
            markedForReview: false,
            read: false,
            // list of options ticked by the user
            answer: []
        },
        {
            id: 4,
            question: "How to define a service without a selector?",
            // array of the options given in the question
            options: [
                "Specify the external name",
                "Specify an endpoint with IP",
                "Address and port Just by specifying the IP address",
                "Specifying the label and api-version"
            ],
            multiple: false,
            markedForReview: false,
            read: false,
            // list of options ticked by the user
            answer: []
        },
        {
            id: 5,
            question: "What is the use of SQL?",
            // array of the options given in the question
            options: [
                "Storing data in database",
                "Manipulating data in database",
                "Retrieving data in database",
                "Displaying images",
                "Managing queries"
            ],
            multiple: true,
            markedForReview: false,
            read: false,
            // list of options ticked by the user
            answer: []
        },
        {
            id: 6,
            question: "Which of the following are core Kubernetes objects?",
            // array of the options given in the question
            options: [
                "Pods, Services, Volumes",
                "Pods, Docker, Volumes",
                "Pods, Services, Droplets",
                "None of the mentioned"
            ],
            multiple: false,
            markedForReview: false,
            read: false,
            // list of options ticked by the user
            answer: []
        },
        {
            id: 7,
            question: "Which HTML element is used to define the description Data?",
            // array of the options given in the question
            options: [
                "<dt>",
                "<dl>",
                "<li>",
                "<dd>"
            ],
            multiple: false,
            markedForReview: false,
            read: false,
            // list of options ticked by the user
            answer: []
        },
        {
            id: 8,
            question: "What is called if a value shouldn't be greater than 100?",
            // array of the options given in the question
            options: [
                "Integrity constraint",
                "Feasible constraint",
                "Over-defined constraint",
                "Referential constraint"
            ],
            multiple: false,
            markedForReview: false,
            read: false,
            // list of options ticked by the user
            answer: []
        },
        {
            id: 9,
            question: "The /etc/shadow file in Linux is used to store:",
            // array of the options given in the question
            options: [
                "filesystem information",
                "various password information",
                "root user shell",
                "command aliases"
            ],
            multiple: false,
            markedForReview: false,
            read: false,
            // list of options ticked by the user
            answer: []
        },
        {
            id: 10,
            question: "Kubernetes can be configured in a multi-Master Node configuration. True or False?",
            // array of the options given in the question
            options: [
                "True",
                "False"
            ],
            multiple: false,
            markedForReview: false,
            read: false,
            // list of options ticked by the user
            answer: []
        }
    ],
};

const rootReducer = (state = initState, action) => {
    const { currentQuestion, questionList } = state;

    switch (action.type) {
        case 'SELECTED_OPTION': {
            const { currentQuestion, optionIndex, isMultiple } = action.payload;
            let updatedAnswers = state.questionList[currentQuestion].answer;
            if(!updatedAnswers.includes(optionIndex)) {
                if(isMultiple) {
                    updatedAnswers = [...updatedAnswers, optionIndex];
                } else {
                    updatedAnswers = [ optionIndex ];
                }
            } else {
                updatedAnswers = updatedAnswers.filter(ans => ans !== optionIndex);
            }

            let newQuestionList = questionList.map((item,index) => {
                return index === currentQuestion ? {
                    ...item,
                    answer: updatedAnswers
                } : item; 
            })

            return {
                ...state,
                questionList: newQuestionList
            }
        }

        case 'CHANGE_QUESTION': {
            const { to } = action.payload;

            // set the property read to true in the next question.
            let newQuestionList = questionList.map(question => {
                if(question.id === to + 1) {
                    question = {
                        ...question,
                        read: true
                    }
                }

                return question;
            })

            let newState = {
                ...state,
                currentQuestion: to,
                questionList: newQuestionList
            }
            return newState;
        } 

        case 'MARK_FOR_REVIEW': {
            const newQuestionList = questionList.filter(question => {
                if(question.id === currentQuestion + 1) {
                    question.markedForReview = !question.markedForReview;
                }

                return question;
            });

            let newState = {
                ...state,
                questionList: newQuestionList
            }

            return newState;
        }

        case 'RESET_QUIZ': {
            return {
                ...initState
            };
        }

        default: 
        return state;
    }
};

export default rootReducer;
