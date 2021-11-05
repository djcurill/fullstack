import React, { useState } from 'react';

const Header = ({ title }) => <h1>{title}</h1>;

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatisticLine = (props) => {
  return (
    <>
      <li>
        {props.text} : {props.value}
      </li>
    </>
  );
};

const Stats = ({ reviews }) => {
  if (reviews.some((n) => n > 0)) {
    const [good, neutral, bad] = reviews;
    const total = good + neutral + bad;
    const avg = ((good - bad) / total) * 100;
    const positiveRate = (good / total) * 100;

    return (
      <>
        <h2>Feedback Statistics</h2>
        <ul>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={total} />
          <StatisticLine text="Average" value={avg.toFixed(1) + '%'} />
          <StatisticLine
            text="Positive"
            value={positiveRate.toFixed(1) + '%'}
          />
        </ul>
      </>
    );
  } else {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const giveFeedback = (rating, setter) => () => setter(rating + 1);

  return (
    <div>
      <Header title="Give Feedback" />
      <Button handleClick={giveFeedback(good, setGood)} text="Good" />
      <Button handleClick={giveFeedback(neutral, setNeutral)} text="Neutral" />
      <Button handleClick={giveFeedback(bad, setBad)} text="Bad" />
      <Stats reviews={[good, neutral, bad]} />
    </div>
  );
};

export default App;
