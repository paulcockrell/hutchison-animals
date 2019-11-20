import React from 'react'
import ReactDOM from 'react-dom'
import Show from './components/breed/Show.jsx'

const container = document.getElementById('breed')
const animalId = container.getAttribute('data-animal-id')
const groupId = container.getAttribute('data-group-id')
const breedId = container.getAttribute('data-breed-id')
ReactDOM.render(<Show path={`/animals/${animalId}/groups/${groupId}/breeds/${breedId}`} animalId={animalId} groupId={groupId} breedId={breedId} />, container)
