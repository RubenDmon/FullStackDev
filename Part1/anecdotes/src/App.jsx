import React from "react";
import { useState } from 'react'


const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const HasVotesLine = ({ votes }) => {
  return (
    <>
      <p>has {votes ? votes : 0} votes</p>
    </>
  )

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})
  const [mostVoted, setMostVoted] = useState(selected)
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const handleClickNext = () => setSelected(getRandomInt(anecdotes.length))
  const handleClickVote = () => {
    if (!votes[selected]) {
      votes[selected] = 0
    }
    const newVotes = {
      ...votes,
      [selected]: votes[selected] + 1
    }
    if (newVotes[selected] >= newVotes[mostVoted]) {
      const newMostVoted = selected
      setMostVoted(newMostVoted)
    }
    setVotes(newVotes)
  }
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <HasVotesLine votes={votes[selected]}></HasVotesLine>
      <Button handleClick={handleClickVote} text="Vote"></Button>
      <Button handleClick={handleClickNext} text="Next Anecdote"></Button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVoted]}</p>
      <HasVotesLine votes={votes[mostVoted]}></HasVotesLine>


    </div>
  )
}

export default App