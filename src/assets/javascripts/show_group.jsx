import React from 'react'
import ReactDOM from 'react-dom'
import Show from './components/group/Show.jsx'

const container = document.getElementById('group')
const animalId = container.getAttribute('data-animal-id')
const groupId = container.getAttribute('data-group-id')
ReactDOM.render(<Show path={`/animals/${animalId}/groups/${groupId}`} animalId={animalId} groupId={groupId} />, container)
