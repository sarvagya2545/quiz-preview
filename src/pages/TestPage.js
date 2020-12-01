import React, { Component } from 'react';
import QuestionSection from '../components/main/q-section';
import Sidebar from "../components/main/sidebar";

class TestPage extends Component {
    render() {
        return (
            <main>
                <QuestionSection />
                <Sidebar />
            </main>
        )
    }
}

export default TestPage;