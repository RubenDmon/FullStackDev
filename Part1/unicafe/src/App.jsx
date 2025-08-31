import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, value, isPercentage }) => {
  if (isPercentage) {
    return (
      <>
        <tr>
          <td><p><b>{text}:</b></p></td>
          <td><p>{value} %</p></td>
        </tr>

      </>
    )
  }
  return (
    <>
      <tr>
        <td><p><b>{text}:</b></p></td>
        <td><p>{value}</p></td>
      </tr>
    </>
  )
}
const Statistics = ({ good, neutral, bad, total, avg, avgPositive }) => {
  if (total === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good}></StatisticLine>
          <StatisticLine text="Neutral" value={neutral}></StatisticLine>
          <StatisticLine text="Bad" value={bad}></StatisticLine>
          <StatisticLine text="All" value={total}></StatisticLine>
          <StatisticLine text="Average" value={avg}></StatisticLine>
          <StatisticLine text="Positive" value={avgPositive * 100} isPercentage={true}></StatisticLine>
        </tbody>
      </table>

    </>
  )
}
const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [avg, setAvg] = useState(0)
  const [avgPositive, setAvgPositive] = useState(0)


  const handleClickGood = () => {
    const updateGood = good + 1
    const all = updateGood + neutral + bad
    setGood(updateGood)
    setTotal(all)
    setAvg((updateGood - bad) / (all))
    setAvgPositive(updateGood / all)
  }
  const handleClickNeutral = () => {
    const updateNeutral = neutral + 1
    const all = good + updateNeutral + bad
    setNeutral(updateNeutral)
    setTotal(all)
    setAvg((good - bad) / (all))
    setAvgPositive(good / all)
  }
  const handleClickBad = () => {
    const updateBad = bad + 1
    const all = good + neutral + updateBad
    setBad(updateBad)
    setTotal(all)
    setAvg((good - updateBad) / (all))
    setAvgPositive(good / all)
  }

  return (
    <div>
      <h1>Give feed back</h1>
      <Button handleClick={handleClickGood} text="good"></Button>
      <Button handleClick={handleClickNeutral} text="neutral"></Button>
      <Button handleClick={handleClickBad} text="bad"></Button>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} avg={avg} avgPositive={avgPositive}></Statistics>
    </div>
  )
}

export default App
