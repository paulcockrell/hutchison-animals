import React from 'react'
import ReactDOM from 'react-dom'
import Index from './components/group/Index.jsx'

const container = document.getElementById('groups')
const animalId = container.getAttribute('data-animal-id')
ReactDOM.render(<Index path={`/animals/${animalId}`} animalId={animalId} />, container)
