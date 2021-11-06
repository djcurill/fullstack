import React, { useState } from 'react';
import { randomInt, argMax } from './utils';

const Button = (props) => {
  return (
    <>
      <button onClick={props.handleClick}>{props.text}</button>
    </>
  );
};

const TopAnecdote = ({ votes, anecdotes }) => {
  const winner = anecdotes[argMax(votes)];
  return (
    <>
      <h1>Anecdote with Most Votes</h1>
      {winner}
      <p>Number of votes: {Math.max(...votes)}</p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ];

  const n = anecdotes.length;

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(n).fill(0));

  const randomAnecdote = () => {
    setSelected(randomInt(n));
  };

  const castVote = () => {
    let updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
  };

  return (
    <div>
      <h1> Anecdote of the Day </h1>
      <p> {anecdotes[selected]} </p>
      <Button handleClick={castVote} text="Vote" />
      <Button handleClick={randomAnecdote} text="Next Anecdote" />
      <TopAnecdote votes={votes} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
