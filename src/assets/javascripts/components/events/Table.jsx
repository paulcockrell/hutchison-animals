import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Pager from '../../components/shared/Pager.jsx'
import moment from 'moment'

const RECORDS_PER_PAGE = 5

class Table extends Component {
  constructor(props) {
    super(props)

    this.state = {
      records: this.props.records,
      currentPage: 1,
    }

    this.handlePage = this.handlePage.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.records !== this.props.records) {
      this.setState({records: this.props.records})
    }
  }

  handlePage(newPage) {
    this.setState({
      currentPage: newPage,
    })
  }

  render() {
    const {
      records,
      currentPage,
    } = this.state

    const offset = (currentPage - 1) * RECORDS_PER_PAGE
    const limit = offset + RECORDS_PER_PAGE
    const recordsSubset = records.slice(offset, limit)

    return (
      <section className="section">
        <Pager records={records} currentPage={currentPage} perPage={RECORDS_PER_PAGE} onChange={this.handlePage}/>
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>Object</th>
              <th>Object ID</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recordsSubset.map((record) => (
              <tr key={record.objectId}>
                <td>{record.objectClass}</td>
                <td>{record.objectId}</td>
                <td>{record.actionType}</td>
                <td>{moment(record.createdAt).format('LLL')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pager records={records} currentPage={currentPage} perPage={RECORDS_PER_PAGE} onChange={this.handlePage}/>
      </section>
    )
  }
}

Table.propTypes = {
  records: PropTypes.array.isRequired,
}

export default Table
