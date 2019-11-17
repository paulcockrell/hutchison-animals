import React from 'react'
import ReactDOM from 'react-dom'
import Groups from './components/group/Groups.jsx'

const container = document.getElementById('groups')
const animalId = container.getAttribute('data-animal-id')
ReactDOM.render(<Groups path={`/animals/${animalId}`} />, container)
