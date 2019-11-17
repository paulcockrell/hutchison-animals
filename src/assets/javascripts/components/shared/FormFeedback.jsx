import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class FormFeedback extends Component {
  render() {
    const {
      feedback,
    } = this.props

    let heroType;
    switch(feedback.type) {
      case "error": {
        heroType = "is-danger"
        break
      }
      case "success": {
        heroType = "is-primary"
        break
      }
      default: {
        heroType = "is-info"
      }
    }

    return (
      <section className="section">
        <div className="container has-margin-bottom-75">
          <div className={`notification ${heroType}`}>
            {feedback.type.toUpperCase()} - {feedback.message}
          </div>
        </div>
      </section>
    )
  }
}

FormFeedback.propTypes = {
  feedback: PropTypes.object.isRequired,
}

export default FormFeedback
