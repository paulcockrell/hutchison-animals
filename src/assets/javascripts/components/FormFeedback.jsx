import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class FormFeedback extends Component {
  render() {
    const {
      type,
      title,
      subtitle,
    } = this.props

    let heroType;
    switch(type) {
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
      <div className="container has-margin-bottom-75">
        <div className={`notification ${heroType}`}>
          {title} - {subtitle}
        </div>
      </div>
    )
  }
}

FormFeedback.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
}

export default FormFeedback
