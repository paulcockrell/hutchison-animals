import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Table from './Table.jsx'
import Breadcrumb from '../../components/shared/Breadcrumb.jsx'

const RECORDS_PER_PAGE = 5

class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      path: this.props.path,
      records: [],
      currentPage: 1,
    }

    this.loadRecords = this.loadRecords.bind(this)
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
    .then(records => this.setState({records: records}))
  }

  render() {
    const {
      path,
      errors,
      records,
    } = this.state

    const breadcrumbs = [
      {url: '/', name: 'home'},
      {url: '#', name: 'events'},
    ]

    return (
      <div>
        <section className="section">
          <Breadcrumb
            items={breadcrumbs} />
        </section>

        <section className="section">
          <h1 className="title has-margin-bottom-75">Events</h1>
        </section>

        <Table
          records={records} />
      </div>
    )
  }
}

Index.propTypes = {
  path: PropTypes.string.isRequired,
}

export default Index
