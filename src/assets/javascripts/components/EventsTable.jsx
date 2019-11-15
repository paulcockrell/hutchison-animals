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
      action_types_path,
    } = this.props

    fetch(records_path)
      .then(response => response.json())
      .then(data => this.setState({ records: data }))

    fetch(action_types_path)
      .then(response => response.json())
      .then(data => this.setState({ action_types: data }))
  }

  render () {
    const {
      title,
      records,
    } = this.state

    return (
      <div class="card events-card">
          <header class="card-header">
              <p class="card-header-title">
                  {title}
              </p>
          </header>
          <div class="card-table">
              <div class="content">
                  <table class="table is-fullwidth is-striped">
                      <tbody>
                          {records.map((record) => (
                            <tr>
                                <td width="5%"><i class="fa fa-bell-o"></i></td>
                                <td>{record.object_class} was {record.action_type} on {moment(record.created_at).format('LLL')}</td>
                            </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
          <footer class="card-footer">
              <a href="#" class="card-footer-item">View All</a>
          </footer>
      </div>
    )
  }
}

EventsTable.propTypes = {
  title: PropTypes.string.isRequired,
  records_path: PropTypes.string.isRequired,
  action_types_path: PropTypes.string.isRequired,
}

export default EventsTable
