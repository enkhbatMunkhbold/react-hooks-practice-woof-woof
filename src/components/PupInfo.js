import React from 'react'

function PupInfo({ pup, onUpdatePups }) {
  const { name, image, isGoodDog } = pup

  function handleClick() {    
    onUpdatePups(pup)
  }

  return (
    <div>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <button onClick={handleClick}>{isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
    </div>    
  )
}

export default PupInfo