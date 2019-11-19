import React from 'react'
import ReactDOM from 'react-dom'
import Breeds from './components/breed/Breeds.jsx'

const container = document.getElementById('breeds')
const animalId = container.getAttribute('data-animal-id')
const groupId = container.getAttribute('data-group-id')
ReactDOM.render(<Breeds path={`/animals/${animalId}/groups/${groupId}/breeds`} />, container)
