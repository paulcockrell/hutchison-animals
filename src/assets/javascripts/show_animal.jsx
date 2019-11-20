import React from 'react'
import ReactDOM from 'react-dom'
import Show from './components/animal/Show.jsx'

const container = document.getElementById('animal')
const animalId = container.getAttribute('data-animal-id')
ReactDOM.render(<Show path={`/animals/${animalId}`} animalId={animalId} />, container)
