const Header = ({ header }) => {
  return (
    <>
      <h1>{header}</h1>
    </>
  );
}
const Part = ({ part }) => {
  //console.log(part);
  return (
    <>
      <p>{part.name} {part.exercises}</p>
    </>
  )

}
const Content = ({ parts }) => {
  //console.log(parts);
  return (
    <>
      {parts.map((partAux, index) => (
        <Part key={index} part={partAux} />
      ))}
    </>
  );
}
const Total = ({ parts }) => {
  let sum = 0;
  parts.map((partAux) => sum += partAux.exercises);
  return (
    <>
      <p>Number of exercises {sum}</p>
    </>
  );
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  //console.log(course.name);
  const { name, parts } = course;
  return (
    <div>
      <Header header={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App