import React from 'react'
import ReactDOM from 'react-dom'
import Navigation from './components/Navigation.jsx'
import InfoTile from './components/InfoTile.jsx'

ReactDOM.render(<Navigation />, document.getElementById('navigation'))
ReactDOM.render(<InfoTile title="Animals" path="/animals_count" />, document.getElementById('animal-tile'))
ReactDOM.render(<InfoTile title="Groups" path="/groups_count" />, document.getElementById('group-tile'))
ReactDOM.render(<InfoTile title="Breeds" path="/breeds_count" />, document.getElementById('breed-tile'))
