import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import FormFeedback from '../../components/shared/FormFeedback.jsx'

class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      errors: this.props.errors,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors ||
        prevProps.selectedRecord !== this.props.selectedRecord) {

      const state = {
        ...this.props.selectedRecord,
        errors: this.props.errors,
      }
      this.setState(state)
    }
  }

  handleChange(event) {
    this.setState({
      name: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      id,
      name,
    } = this.state

    const data = {
      id: id,
      name: name,
    }

    this.setState({
      id: null,
      name: '',
    })

    this.props.createOrUpdateRecord(data)
  }

  handleCancel() {
    this.setState({
      name: '',
    })
    this.props.handleCancel()
  }

  render() {
    const {
      name,
      errors,
    } = this.state

    return (
      <section className="section">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              Breed form
            </p>
          </header>
          <div className="card-content">
            <div className="content">
              <form className="form" onSubmit={this.handleSubmit}>
                <div className="field">
                  <label className="label">Name</label>

                  <div className="control">
                    <input className="input" type="text" placeholder="Breed name" value={name} onChange={this.handleChange}/>
                  </div>

                  <div className={`field-errors ${errors.length > 0 ? '' : 'is-hidden'}`}>
                    {errors.map((error) => (
                      <p key={error.message} className="help is-danger">{error.message}</p>
                    ))}
                  </div>
                </div>

                <div className="field is-grouped">
                  <div className="control">
                    <button className="button is-link" type="submit">Submit</button>
                  </div>
                  <div className="control">
                    <button className="button is-link is-light" onClick={this.handleCancel} type="button">Cancel</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

Form.propTypes = {
  createOrUpdateRecord: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  selectedRecord: PropTypes.object,
}

export default Form
