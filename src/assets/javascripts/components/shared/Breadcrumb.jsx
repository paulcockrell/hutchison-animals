import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Breadcrumb extends Component {
  render() {
    const {
      items,
    } = this.props

    return (
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          {items.map((item) => {
            return (
              <li key={item.url}>
                <a href={item.url}>{item.name}</a>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }
}

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    name: PropTypes.node,
  })),
}

Breadcrumb.defaultProps = {
  items: [],
}

export default Breadcrumb
