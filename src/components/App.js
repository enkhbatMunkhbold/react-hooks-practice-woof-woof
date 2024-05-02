import React, { useEffect, useState } from "react";
import PupsList from "./PupsList";
import PupInfo from "./PupInfo";

function App() {
  const initialValues = {
    name: '',
    image: '',
    isGoodDog: ''
  }

  const [ isClicked, setIsClicked ] = useState(false)
  const [ showPup, setShowPup ] = useState(initialValues)
  const [ pups, setPups ] = useState([])
  const [ goodDogs, setGoodDogs ] = useState([])
  const [ isOn, setIsOn ] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3001/pups')
    .then(res => res.json())
    .then(setPups)
  }, [])

  function handlePickPup(pup) {
    setIsClicked(true)
    setShowPup(pup)
  }

  const handleClick = () =>  {
    setIsOn(prevState => !prevState)
    const goodPups = pups.filter(pup => pup.isGoodDog)
    setGoodDogs(goodPups)
  }

  function handleUpdatePup(chosenPup) {
    pups.forEach(pup => {
      if(pup.id === chosenPup.id) {
        fetch(`http://localhost:3001/pups/${chosenPup.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ isGoodDog: !chosenPup.isGoodDog })
        }).then(res => res.json())
        .then(changedPup => {
          const updatedDogs = pups.map(pup => pup.id === changedPup.id ? changedPup : pup)
          setPups(updatedDogs)
          setShowPup(changedPup)
        })
      }
    })
  }

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={handleClick}>Filter good dogs: {isOn ? "ON" : "OFF"}</button>
      </div>
      <div id="dog-bar">
        <PupsList pups={isOn ? goodDogs : pups} onPickPup={handlePickPup}/>
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          { isClicked ? <PupInfo pup={showPup} onUpdatePups={handleUpdatePup}/> : null}
        </div>
      </div>
    </div>
  );
}

export default App;
