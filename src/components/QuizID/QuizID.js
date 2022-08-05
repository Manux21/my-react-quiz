import React from 'react';
import { useLocation } from "react-router-dom";


const QuizId = () => {
  const search = useLocation().search;
  const id=new URLSearchParams(search).get("id");
  console.log(id);//12345
  return (
    <h1>{id}</h1>
  )
};

export default QuizId;