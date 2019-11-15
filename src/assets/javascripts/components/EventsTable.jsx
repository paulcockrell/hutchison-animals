import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import moment from 'moment'

class EventsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
      records: [],
    };
  }

  componentDidMount() {
    const {
      records_path,
    } = this.props

    fetch(records_path)
      .then(response => response.json())
      .then(data => this.setState({ records: data }))
  }

  render () {
    const {
      title,
      records,
    } = this.state

    return (
      <div className="card events-card">
          <header className="card-header">
              <p className="card-header-title">
                  {title}
              </p>
          </header>
          <div className="card-table">
              <div className="content">
                  <table className="table is-fullwidth is-striped">
                      <tbody>
                          {records.map((record) => (
                            <tr key={record.createdAt}>
                                <td width="5%"><i className="fa fa-bell-o"></i></td>
                                <td>{record.objectClass} #{record.objectId} was {record.actionType} on {moment(record.createdAt).format('LLL')}</td>
                            </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
          <footer className="card-footer">
              <a href="#" className="card-footer-item">View All</a>
          </footer>
      </div>
    )
  }
}

EventsTable.propTypes = {
  title: PropTypes.string.isRequired,
  records_path: PropTypes.string.isRequired,
}

export default EventsTable
