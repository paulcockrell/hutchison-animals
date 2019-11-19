import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Pager from '../../components/shared/Pager.jsx'
import moment from 'moment'

const RECORDS_PER_PAGE = 5

class AnimalTable extends Component {
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

    const {
      deleteRecord,
      setSelectedRecord,
    } = this.props

    const offset = (currentPage - 1) * RECORDS_PER_PAGE
    const limit = offset + RECORDS_PER_PAGE
    const recordsSubset = records.slice(offset, limit)

    return (
      <section className="section">
        <Pager records={records} currentPage={currentPage} perPage={RECORDS_PER_PAGE} onChange={this.handlePage}/>
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recordsSubset.map((record) => (
              <tr key={record.id}>
                <td width="5%">{record.id}</td>
                <td>{record.name}</td>
                <td>{moment(record.createdAt).format('LLL')}</td>
                <td>{moment(record.updatedAt).format('LLL')}</td>
                <td>
                  <div className="buttons is-pulled-right">
                    <button className="button is-link" onClick={this.props.setSelectedRecord.bind(this, record)}>Edit</button>
                    <button className="button is-link is-lighter" onClick={this.props.redirectToGroup.bind(this, record)}>Groups</button>
                    <button className="button is-link is-light" onClick={this.props.deleteRecord.bind(this, record)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pager records={records} currentPage={currentPage} perPage={RECORDS_PER_PAGE} onChange={this.handlePage}/>
      </section>
    )
  }
}

AnimalTable.propTypes = {
  deleteRecord: PropTypes.func.isRequired,
  setSelectedRecord: PropTypes.func.isRequired,
  redirectToGroup: PropTypes.func.isRequired,
  records: PropTypes.array.isRequired,
}

export default AnimalTable
