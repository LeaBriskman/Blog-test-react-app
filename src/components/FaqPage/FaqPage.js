import React, { Component } from 'react';
import './FaqPage.css';
import PageHeader from '../PageHeader/PageHeader';
import AnswerWrapper from './AnswerWrapper/AnswerWrapper';
import AnswerItem from './AnswerItem/AnswerItem';
import Tab from '../Tab/Tab';

const questions = {
    authorizationIssues: [
        {
            title: `What moderation means?`,
            answer: `If you don’t have a social profile, make sure that your profile section is filled out with your best work. Not having a social profile will limit your campaign offers, but it’s still possible to get projects on Insense without an active social presence.
            If you don’t have a social profile, make sure that your.`
        },
        {
            title: `How to register and start working with the app?`,
            answer: `If you don’t have a social profile, make sure that your profile section is filled out with your best work. Not having a social profile will limit your campaign offers, but it’s still possible to get projects on Insense without an active social presence.
            If you don’t have a social profile, make sure that your.`
        },
        {
            title: `Will receive offers from brands?`,
            answer: `If you don’t have a social profile, make sure that your profile section is filled out with your best work. Not having a social profile will limit your campaign offers, but it’s still possible to get projects on Insense without an active social presence.
            If you don’t have a social profile, make sure that your.`
        }
    ],
        
    theFirstSteps: [
        {
            title: `What moderation means?`,
            answer: `is ideal for Instagram or YouTube creators. If you do not have an account on these platforms, you are still welcome to join Insense - the main thing we’re after is the ability to create high quality content. is ideal for Instagram or YouTube creators. If you do not have an accountnt.`
        },
        {
            title: `How to register and start working with the app?`,
            answer: `is ideal for Instagram or YouTube creators. If you do not have an account on these platforms, you are still welcome to join Insense - the main thing we’re after is the ability to create high quality content. is ideal for Instagram or YouTube creators. If you do not have an accountnt.`
        },
        {
            title: `Who can become an Insense user?`,
            answer: `is ideal for Instagram or YouTube creators. If you do not have an account on these platforms, you are still welcome to join Insense - the main thing we’re after is the ability to create high quality content. is ideal for Instagram or YouTube creators. If you do not have an accountnt.`
        }
    ],

    payment: [
        {
            title: `How can I be sure that I will be paid?`,
            answer: `All brands working on Insense have pre-paid for creator content. When a brand approves you for working on a campaign, the agreed-upon payment amount is immediately frozen on the brand’s account. As soon as you complete your project with the brand, your payment `
        },
        {
            title: `What’s the payment process?`,
            answer: `All brands working on Insense have pre-paid for creator content. When a brand approves you for working on a campaign, the agreed-upon payment amount is immediately frozen on the brand’s account. As soon as you complete your project with the brand, your payment `
        },
        {
            title: `Is my income at Insense being taxed?`,
            answer: `All brands working on Insense have pre-paid for creator content. When a brand approves you for working on a campaign, the agreed-upon payment amount is immediately frozen on the brand’s account. As soon as you complete your project with the brand, your payment `
        }
    ]
};

//object connecting question object (keys) with tabs names (values)
const tabs = {
    authorizationIssues: 'Authorization Issues',
    theFirstSteps: 'The first steps',
    payment: 'Payment'
};

class FaqPage extends Component {
    state = {
        activeTabId: 'authorizationIssues'
    };

    //rendering and toggling tabs
    toggleTab(currentTabId) {
        this.setState({ activeTabId: currentTabId });
    };

    renderTabs() {
        return Object.keys(tabs).map((tabId, index) => {
            return(
                <Tab title={tabs[tabId]} key={index} onClick={() => this.toggleTab(tabId)} active={this.state.activeTabId === tabId ? true : false} />
            );
        });
    };

    //rendering containers with answers for each topic
    renderAnswers() {
        const activeTabId = this.state.activeTabId;
        const mappedQuestions = questions[activeTabId];
        return [...mappedQuestions].map((mappedQuestion, id) => {
            return (
                <AnswerWrapper key={`AnswerWrapper${id}`}>
                    <AnswerItem title={mappedQuestion.title} answer={mappedQuestion.answer} key={id} />
                </AnswerWrapper>
            );
        });
    };

    render() {
        return(
            <div className="FaqPage">
                <PageHeader header="FAQ"/>
                <div className="TabsWrapper">
                    {this.renderTabs()}
                </div>
                <div className="AnswersWrapper">
                    {this.renderAnswers()}
                </div>
            </div>
        );
    };
};

export default FaqPage;