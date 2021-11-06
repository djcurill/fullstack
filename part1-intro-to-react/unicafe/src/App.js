import React, { useState } from 'react';

const Header = ({ title }) => <h1>{title}</h1>;

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const TableRow = ({ field, value }) => {
  return (
    <>
      <tr>
        <td> {field} </td>
        <td> {value} </td>
      </tr>
    </>
  );
};

const Stats = ({ reviews }) => {
  if (reviews.some((n) => n > 0)) {
    const [good, neutral, bad] = reviews;
    const total = good + neutral + bad;
    const avg = (good - bad) / total;
    const positiveRate = (good / total) * 100;

    return (
      <>
        <h2>Feedback Statistics</h2>
        <table>
          <tbody>
            <TableRow field="Good" value={good} />
            <TableRow field="Neutral" value={neutral} />
            <TableRow field="Bad" value={bad} />
            <TableRow field="Average" value={avg.toFixed(2)} />
            <TableRow field="Positive" value={positiveRate.toFixed(1) + '%'} />
          </tbody>
        </table>
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
