import React from 'react'
import ReactDOM from 'react-dom'
import Index from './components/breed/Index.jsx'

const container = document.getElementById('breeds')
const animalId = container.getAttribute('data-animal-id')
const groupId = container.getAttribute('data-group-id')
ReactDOM.render(<Index path={`/animals/${animalId}/groups/${groupId}`} animalId={animalId} groupId={groupId} />, container)
