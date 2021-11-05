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
  return (
    <>
      {props.items.map((obj) => {
        return <Part name={obj.name} count={obj.exercises} />;
      })}
    </>
  );
};

const Total = (props) => {
  const total = props.parts.reduce(
    (sum, current) => sum + current.exercises,
    0
  );
  return (
    <>
      <p>Total number of exercises = {total}</p>{' '}
    </>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header courseName={course.name} />
      <Content items={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
