import React from 'react'
import Pup from './Pup'

function PupsList({ pups, onPickPup }) {
  
  const renderAllPups = pups.map(pup => {
    return <Pup key={pup.id} pup={pup} onPickPup={onPickPup}/>
  })

  return renderAllPups
}

export default PupsList