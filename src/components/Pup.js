import React from 'react'

function Pup({ pup, onPickPup }) {

  function handleClick() {
    onPickPup(pup)
  }
 
  return (
    <span onClick={handleClick}>{pup.name}</span>
  )
}

export default Pup