import React from 'react'
import ReactDOM from 'react-dom'
import Hello from './components/Hello.jsx'
import InfoTile from './components/InfoTile.jsx'

ReactDOM.render(<Hello name="Paul" />, document.getElementById('app'))
ReactDOM.render(<InfoTile title="Animals" path="/animals_count" />, document.getElementById('animal-tile'))
ReactDOM.render(<InfoTile title="Groups" path="/groups_count" />, document.getElementById('group-tile'))
ReactDOM.render(<InfoTile title="Breeds" path="/breeds_count" />, document.getElementById('breed-tile'))
