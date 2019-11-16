import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import FormFeedback from '../components/FormFeedback.jsx'

class AnimalForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      animalName: '',
      errors: this.props.errors,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleChange(event) {
    this.setState({
      animalName: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      animalName,
    } = this.state

    const data = {
      name: animalName
    }

    this.props.addRecord(data)
  }

  handleCancel() {
    this.setState({
      animalName: '',
    })
  }

  render() {
    const {
      animalName,
      errors,
    } = this.state

    return (
      <section className="section">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              Animal form
            </p>
          </header>
          <div className="card-content">
            <div className="content">
              <form className="form" onSubmit={this.handleSubmit}>
                <div className="field">
                  <label className="label">Name</label>

                  <div className="control">
                    <input className="input" type="text" placeholder="Animal name" value={animalName} onChange={this.handleChange}/>
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

AnimalForm.propTypes = {
  addRecord: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
}

export default AnimalForm
