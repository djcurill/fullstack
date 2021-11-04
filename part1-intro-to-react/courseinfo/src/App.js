import React from 'react';

const Header = (props) => (
  <>
    <h1>{props.courseName}</h1>
  </>
);

const Part = (props) => {
  return (
    <>
      <p>
        {props.name} : {props.count}
      </p>
    </>
  );
};

const Content = (props) => {
  const zip = props.parts.map((item, i) => ({
    item: item,
    count: props.counts[i],
  }));

  return (
    <>
      {zip.map((obj) => {
        return <Part name={obj.item} count={obj.count} />;
      })}
    </>
  );
};

const Total = (props) => {
  return (
    <>
      <p>Total number of exercises = {props.total}</p>{' '}
    </>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header courseName={course} />
      <Content
        parts={[part1, part2, part3]}
        counts={[exercises1, exercises2, exercises3]}
      />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
