import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-8d762-default-rtdb.firebaseio.com/'
})