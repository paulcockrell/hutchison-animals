import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import AnimalForm from '../components/AnimalForm.jsx'
import AnimalTable from '../components/AnimalTable.jsx'
import FormFeedback from '../components/FormFeedback.jsx'

const RECORDS_PER_PAGE = 5

class Animals extends Component {
  constructor(props) {
    super(props)

    this.state = {
      path: this.props.path,
      records: [],
      currentPage: 1,
      errors: [],
      saved: false,
    }

    this.loadRecords = this.loadRecords.bind(this)
    this.addRecord = this.addRecord.bind(this)
    this.deleteRecord = this.deleteRecord.bind(this)
  }

  componentDidMount() {
    this.loadRecords()
  }

  loadRecords(currentPage = 1) {
    const {
      path,
      records,
    } = this.state

    if (currentPage <= 0 || currentPage > (Math.ceil(records.length / RECORDS_PER_PAGE) || 1)) return

    this.setState({
      currentPage: currentPage,
    })

    fetch(path)
    .then(response => response.json())
    .then(data => this.setState({records: data}))
  }

  deleteRecord(record) {
    const {
      path,
      records,
    } = this.state

    const deletePath = `${path}/${record.id}`
    fetch(deletePath, {
      method: "DELETE",
    })
    .then(response => response.json())
    .then((_data) => {
      this.setState({
        records: records.filter(r => r != record)
      })
    })
  }

  addRecord(data) {
    const {
      path,
      records,
    } = this.state

    fetch(path, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        return Promise.reject(response)
      }
    })
    .then((data) => {
      this.setState({
        records: records.concat(data)
      })
      return this.handleSuccess(data)
    })
    .catch((response) => {
      response
        .json()
        .then(data => this.handleError(data))
    })
  }

  handleSuccess(data) {
    this.setState({
      saved: true,
      errors: [],
    })
  }

  handleError(data) {
    this.setState({
      saved: false,
      errors: data,
    })
  }

  handleCancel() {
    this.setState({
      saved: false,
      errors: [],
    })
  }

  render() {
    const {
      path,
      errors,
      saved,
      records,
    } = this.state

    return (
      <div>
        <section className="section">
          <h1 className="title has-margin-bottom-75">Manage Animals</h1>
        </section>

        <section className="section">
          {(errors.length > 0) ? <FormFeedback type="error" title="Error" subtitle="Animal record errors present" /> : null }
          {(saved) ? <FormFeedback type="success" title="Success" subtitle="Animal record created" /> : null }
        </section>

        <AnimalForm addRecord={this.addRecord} errors={errors} />
        <AnimalTable records={records} deleteRecord={this.deleteRecord} />
      </div>
    )
  }
}

export default Animals
