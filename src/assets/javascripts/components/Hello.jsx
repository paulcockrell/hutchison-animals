import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Hello extends Component {
  render () {
    const {
      name
    } = this.props

    return (
      <h1>Hello, {name}</h1>
    )
  }
}

Hello.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Hello
