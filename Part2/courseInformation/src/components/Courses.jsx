import Sum from "./Sum";
const Course = ({ course }) => {
    return (
        <>
            <h2>{course.name}</h2>
            <ul>
                {course.parts.map(part => <li key={part.id}>{part.name} {part.exercises}</li>)}
            </ul>
            <Sum course={course}></Sum>
        </>
    );
}

const Courses = ({ courses }) => {
    return (
        <>
            {courses.map(course => {
                return (<Course course={course} key={course.id}></Course>);
            })}
        </>
    );
}

export default Courses;