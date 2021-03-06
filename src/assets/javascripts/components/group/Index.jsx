import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Form from './Form.jsx'
import Table from './Table.jsx'
import FormFeedback from '../../components/shared/FormFeedback.jsx'
import Breadcrumb from '../../components/shared/Breadcrumb.jsx'

const RECORDS_PER_PAGE = 5
const DELETED = 'deleted'
const CREATED = 'created'
const UPDATED = 'updated'
const RESET = 'reset'
const ERROR = 'error'
const ERROR_PATH = '/error'

class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      path: this.props.path,
      animalId: this.props.animalId,
      groupId: this.props.groupId,
      records: [],
      currentPage: 1,
      errors: [],
      feedback: null,
      selectedRecord: null,
      animal: null,
    }

    this.loadAnimalRecord = this.loadAnimalRecord.bind(this)
    this.loadRecords = this.loadRecords.bind(this)
    this.createOrUpdateRecord = this.createOrUpdateRecord.bind(this)
    this.deleteRecord = this.deleteRecord.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.setSelectedRecord = this.setSelectedRecord.bind(this)
    this.redirectToBreed = this.redirectToBreed.bind(this)
    this.showRecord = this.showRecord.bind(this)
  }

  componentDidMount() {
    this.loadAnimalRecord()
    this.loadRecords()
  }

  loadAnimalRecord(animalId) {
    const {
      path: url,
    } = this.state

    fetch(url)
    .then(response => response.json())
    .then(record => this.setState({animal: record}))
    .catch(_response => window.location = ERROR_PATH)
  }

  loadRecords(currentPage = 1) {
    const {
      path,
      records,
    } = this.state

    const url = `${path}/groups`

    if (currentPage <= 0 || currentPage > (Math.ceil(records.length / RECORDS_PER_PAGE) || 1)) return

    this.setState({
      currentPage: currentPage,
    })

    fetch(url)
    .then(response => response.json())
    .then(records => this.setState({records: records}))
  }

  deleteRecord(record) {
    const {
      path,
      records,
    } = this.state

    const url = `${path}/groups/${record.id}`
    fetch(url, {
      method: "DELETE",
    })
    .then(response => response.json())
    .then((_data) => {
      this.setState({
        records: records.filter(r => r != record),
      })
      return this.handleSuccess(DELETED, record)
    })
  }

  createOrUpdateRecord(data) {
    let method, url

    const {
      path,
      records,
    } = this.state

    const isNewRecord = data.id === null || typeof(data.id) === "undefined"

    if (isNewRecord) {
      method = 'POST'
      url = `${path}/groups`
    } else {
      method = 'PATCH'
      url = `${path}/groups/${data.id}`
    }

    fetch(url, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: method,
      body: JSON.stringify(data)
    })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        return Promise.reject(response)
      }
    })
    .then((record) => {
      this.setState({
        records: isNewRecord ? records.concat(record) : records.map(r => r.id === record.id ? record : r)
      })
      return this.handleSuccess(CREATED, record)
    })
    .catch((response) => {
      response
        .json()
        .then(errors => this.handleError(errors, data))
    })
  }

  showRecord(record) {
    const {
      path,
      animalId,
    } = this.state

    const url = `/manage/animals/${animalId}/groups/${record.id}`
    window.location = url
  }

  redirectToBreed(record) {
    const {
      path,
      animal,
    } = this.state

    const url = `/manage${path}/groups/${record.id}/breeds`
    window.location = url
  }

  setSelectedRecord(record) {
    this.setState({
      selectedRecord: record,
    })
  }

  buildFeedback(type, record) {
    const message = `Record ${record.name} ${type}`
    return {
      type: type,
      message: message,
    }
  }

  handleSuccess(action, record) {
    const feedback = this.buildFeedback(action, record)
    this.setState({
      errors: [],
      feedback: feedback,
      selectedRecord: null,
    })
  }

  handleError(errors, record) {
    const feedback = this.buildFeedback(ERROR, record)
    this.setState({
      errors: errors,
      feedback: feedback,
    })
  }

  handleCancel() {
    this.setState({
      errors: [],
      feedback: null,
      selectedRecord: null,
    })
  }

  render() {
    const {
      path,
      errors,
      records,
      feedback,
      selectedRecord,
      animal,
      animalId,
    } = this.state

    const url = '/manage/animals'
    const breadcrumbs = [
      {url: '/', name: 'home'},
      {url: '/manage/animals', name: 'animals'},
      {url: `/manage/animals/${animalId}`, name: animalId},
      {url: '#', name: 'groups'},
    ]

    if (!animal) {
      return (
        <h1>Loading...</h1>
      )
    }

    return (
      <div>
        <section className="section">
          <Breadcrumb
            items={breadcrumbs} />
        </section>
        <section className="section">
          <h1 className="title has-margin-bottom-75">
            Manage Groups for Animal <a href={`/manage${path}`} alt="Animals">{animal.name}</a>
          </h1>
        </section>

        {feedback ? <FormFeedback feedback={feedback} /> : null }

        <Form
          createOrUpdateRecord={this.createOrUpdateRecord}
          handleCancel={this.handleCancel}
          errors={errors}
          selectedRecord={selectedRecord} />

        <Table
          records={records}
          deleteRecord={this.deleteRecord}
          setSelectedRecord={this.setSelectedRecord}
          redirectToBreed={this.redirectToBreed}
          showRecord={this.showRecord} />
      </div>
    )
  }
}

Index.propTypes = {
  path: PropTypes.string.isRequired,
  animalId: PropTypes.string.isRequired,
}

export default Index
