import { useEffect, useState } from "react"
import "./Grid.css"

const WINNER_CONDITIONS_ARR = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const Grid = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const toggleCurrentUserValue = () => {
    return currentUser === "X" ? "O" : "X"
  }

  const handleClick = (e) => {
    console.log(e)
    // if value is already set for the cell OR if user clicks outside the cell, return
    if (e.target.textContent || e.target.className !== "cell") return
    const toggledValue = toggleCurrentUserValue()
    e.target.textContent = toggledValue
    setCurrentUser(toggledValue)
  }

  useEffect(() => {
    // checks for winner
    if (
      WINNER_CONDITIONS_ARR.some((condition) => {
        return condition.every((cell) => {
          return (
            document.querySelector(`[data-cell-index="${cell}"]`)
              .textContent === currentUser
          )
        })
      })
    ) {
      // show modal
      setIsModalVisible(true)
    }
    return () => {}
  }, [currentUser])

  const resetGame = () => {
    Array.from(document.getElementsByClassName("cell")).forEach((element) => {
      console.log(element)
      element.textContent = ""
    })
  }

  const handleResetBtnClick = () => {
    setIsModalVisible(false)
    resetGame()
  }

  console.log(currentUser)

  return (
    <>
      <div className="mainContainer" onClick={handleClick}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((cell, index) => {
          return (
            <div key={index} data-cell-index={index} className="cell"></div>
          )
        })}
      </div>
      {isModalVisible ? (
        <div className="modal">
          <div>
            <h1>Winner is {currentUser}</h1>
            <button onClick={handleResetBtnClick}>Reset Game</button>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Grid
