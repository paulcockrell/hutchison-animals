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
      breedId: this.props.breedId,
      record: null,
      groupCount: 0,
    }

    this.loadRecord = this.loadRecord.bind(this)
    this.redirectToGroup = this.redirectToGroup.bind(this)
  }

  componentDidMount() {
    this.loadRecord()
  }

  loadRecord() {
    const {
      path: url,
    } = this.state

    fetch(url)
    .then(response => response.json())
    .then(record => this.setState({record: record}))
  }

  redirectToGroup(record) {
    const {
      path,
    } = this.state

    const url = `/manage${path}/groups`
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
      breedId,
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
      {url: `/manage/animals/${animalId}/groups/${groupId}/breeds/`, name: 'breeds'},
      {url: `/manage/animals/${animalId}/groups/${groupId}/breeds/${breedId}#`, name: breedId},
    ]

    return (
      <div>
        <section className="section">
          <Breadcrumb
            items={breadcrumbs} />
        </section>

        <section className="section">
          <h1 className="title has-margin-bottom-75">Viewing Breed '{record.name}'</h1>
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
      </div>
    )
  }
}

Show.propTypes = {
  path: PropTypes.string.isRequired,
  animalId: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
  breedId: PropTypes.string.isRequired,
}

export default Show
