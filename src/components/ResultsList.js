import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const ResultsList = () => {
  const results = useSelector((state) => state.results);
  

  const ResultsMap = () => {
    let array = []
      results.map((result, index) => {
        if (index !== 0) {
        array.push (
          <div key={index}>
            <p>Accuracy: {result.accuracy}</p>
            <p>Errors: {result.errors}</p>
            <p>Word Errors: {result.wordErrors}</p>
            <p>Total: {result.total}</p>
            <p>WPM: {result.wpm}</p>
          </div>
        )
        }
      })
    return array
  }

  return (
    <div>
      <h1>Results</h1>
      <ResultsMap />
    </div>
  )
}
