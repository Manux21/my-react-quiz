import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
//import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'
import QuizID from '../../components/QuizID/QuizID'
import { useParams } from "react-router-dom";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";
//import quizID from "../../components/QuizID/QuizID";


function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class Quiz extends Component {







  componentDidMount() {
    let { id } = this.props.params;
    this.props.fetchQuizById(id)
  }

  componentWillUnmount() {
    this.props.retryQuiz()
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          <QuizID/>

          {
            this.props.loading || !this.props.quiz
              ? <Loader />
              : this.props.isFinished
                ? <FinishedQuiz
                  results={this.props.results}
                  quiz={this.props.quiz}
                  onRetry={this.props.retryQuiz}
                />
                : <ActiveQuiz
                  answers={this.props.quiz[this.props.activeQuestion].answers}
                  question={this.props.quiz[this.props.activeQuestion].question}
                  onAnswerClick={this.props.quizAnswerClick}
                  quizLength={this.props.quiz.length}
                  answerNumber={this.props.activeQuestion + 1}
                  state={this.props.answerState}
                />

          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    id: state.quiz.id,
    loading: state.quiz.loading
  }
}


function mapDispatchToProps(dispatch) {
  return{
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withParams(Quiz))