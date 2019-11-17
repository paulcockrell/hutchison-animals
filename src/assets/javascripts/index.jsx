import React from 'react'
import ReactDOM from 'react-dom'
import Navigation from './components/shared/Navigation.jsx'
import InfoTile from './components/shared/InfoTile.jsx'
import EventsTable from './components/landing/EventsTable.jsx'

ReactDOM.render(<Navigation />, document.getElementById('navigation'))
ReactDOM.render(<EventsTable title="Events log" records_path="/events?limit=10" />, document.getElementById('events-table'))
ReactDOM.render(<InfoTile title="Animals" path="/animals_count" />, document.getElementById('animal-tile'))
ReactDOM.render(<InfoTile title="Groups" path="/groups_count" />, document.getElementById('group-tile'))
ReactDOM.render(<InfoTile title="Breeds" path="/breeds_count" />, document.getElementById('breed-tile'))
