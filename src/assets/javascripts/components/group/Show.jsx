import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Breadcrumb from '../../components/shared/Breadcrumb.jsx'
import moment from 'moment'

const RECORDS_PER_PAGE = 5

class Show extends Component {
  constructor(props) {
    super(props)

    this.state = {
      path: this.props.path,
      animalId: this.props.animalId,
      groupId: this.props.groupId,
      record: null,
      groupCount: 0,
    }

    this.loadRecord = this.loadRecord.bind(this)
    this.loadBreedCount = this.loadBreedCount.bind(this)
    this.redirectToBreeds = this.redirectToBreeds.bind(this)
  }

  componentDidMount() {
    this.loadRecord()
    this.loadBreedCount()
  }

  loadRecord() {
    const {
      path: url,
    } = this.state

    fetch(url)
    .then(response => response.json())
    .then(record => this.setState({record: record}))
  }

  loadBreedCount() {
    const {
      path
    } = this.state

    const url = `${path}/breeds`

    fetch(url)
    .then(response => response.json())
    .then(records => this.setState({groupCount: records.length}))
  }

  redirectToBreeds(record) {
    const {
      path,
    } = this.state

    const url = `/manage${path}/breeds`
    window.location = url
  }

  setSelectedRecord(record) {
    this.setState({
      selectedRecord: record,
    })
  }

  render() {
    const {
      path,
      animalId,
      groupId,
      record,
      groupCount,
    } = this.state

    if (!record) {
      return (
        <p>Loading...</p>
      )
    }

    const breadcrumbs = [
      {url: '/', name: 'home'},
      {url: '/manage/animals', name: 'animals'},
      {url: `/manage/animals/${animalId}/`, name: animalId},
      {url: `/manage/animals/${animalId}/groups/`, name: 'groups'},
      {url: `/manage/animals/${animalId}/groups/${groupId}/`, name: groupId},
    ]

    return (
      <div>
        <section className="section">
          <Breadcrumb
            items={breadcrumbs} />
        </section>

        <section className="section">
          <h1 className="title has-margin-bottom-75">Viewing Group '{record.name}'</h1>
        </section>

        <section className="section">
          <article className="message is-info">
            <div className="message-header">
              <p>{record.name}</p>
            </div>
            <div className="message-body">
              <p>ID: {record.id}</p>
              <p>Name: {record.name}</p>
              <p>Created at: {moment(record.createdAt).format('LLL')}</p>
              <p>Updated at: {moment(record.updatedAt).format('LLL')}</p>
              <p>Group count: {groupCount}</p>
            </div>
          </article>
        </section>
        <section className="section">
          <div className="buttons is-right">
            <button
              className="button is-link is-lighter"
              onClick={this.redirectToBreeds.bind(this, record)}>
              View Breeds</button>
          </div>
        </section>
      </div>
    )
  }
}

Show.propTypes = {
  path: PropTypes.string.isRequired,
  animalId: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
}

export default Show
