const intialState = { questions: [] };

const questionsReducer = (state = intialState, action) => {
  if (action.type === 'questions') {
    return {
      questions: action.questions
    };
  }
  return state;
};

export default questionsReducer;