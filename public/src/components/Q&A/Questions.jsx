import React from 'react';
import { useSelector } from 'react-redux';

const Questions = () => {
  const questions = useSelector((state) => state.questionsReducer.questions);

  return (
    <div>
      Questions Component
    </div>
  )
};

export default Questions;