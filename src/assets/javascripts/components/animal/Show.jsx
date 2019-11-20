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
      record: null,
      groupCount: 0,
    }

    this.loadRecord = this.loadRecord.bind(this)
    this.loadGroupCount = this.loadGroupCount.bind(this)
    this.redirectToGroup = this.redirectToGroup.bind(this)
  }

  componentDidMount() {
    this.loadRecord()
    this.loadGroupCount()
  }

  loadRecord() {
    const {
      path: url,
    } = this.state

    fetch(url)
    .then(response => response.json())
    .then(record => this.setState({record: record}))
  }

  loadGroupCount() {
    const {
      path
    } = this.state

    const url = `${path}/groups`

    fetch(url)
    .then(response => response.json())
    .then(records => this.setState({groupCount: records.length}))
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
      {url: `/manage${path}#`, name: animalId},
    ]

    return (
      <div>
        <section className="section">
          <Breadcrumb
            items={breadcrumbs} />
        </section>

        <section className="section">
          <h1 className="title has-margin-bottom-75">Viewing Animal '{record.name}'</h1>
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
              onClick={this.redirectToGroup.bind(this, record)}>
              View Groups</button>
          </div>
        </section>
      </div>
    )
  }
}

Show.propTypes = {
  path: PropTypes.string.isRequired,
  animalId: PropTypes.string.isRequired,
}

export default Show
