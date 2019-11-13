import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class InfoTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
      count: 0,
    };
  }

  componentDidMount() {
    const {
      path,
    } = this.props

    fetch(path)
      .then(response => response.json())
      .then(data => this.setState({ count: data.count }))
  }

  render () {
    const {
      title,
      count,
    } = this.state

    return (
      <article className="tile is-child box">
        <p className="title">{count}</p>
        <p className="subtitle">{title}</p>
      </article>
    )
  }
}

InfoTile.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
}

export default InfoTile
