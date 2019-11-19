import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Navigation extends Component {
  constructor() {
    super()

    this.state = {
      isActive: false,
    }

    this.handleNavBarBurgerClick = this.handleNavBarBurgerClick.bind(this)
  }

  handleNavBarBurgerClick(event) {
    const {
      isActive
    } = this.state

    this.setState({
      isActive: !!!isActive,
    })
  }

  render () {
    const {
      isActive
    } = this.state

    return (
      <nav className="navbar has-margin-bottom-75" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://www.hutchison-t.com" target="_BLANK">
            <img src="https://www.hutchison-t.com/sites/chop/images/logo2-corporate.svg" width="28" height="28" />
          </a>

          <a role="button" onClick={this.handleNavBarBurgerClick} className={`navbar-burger burger ${isActive ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <a className="navbar-item" href="/">
              Home
            </a>

            <a className="navbar-item" href="/manage/animals">
              Manage
            </a>

            <a className="navbar-item" href="/events">
              Events
            </a>

            <a className="navbar-item" href="/help">
              Help
            </a>
          </div>

          <div className="navbar-end is-hidden-mobile">
            <div className="navbar-item">
              <a href="https://github.com/paulcockrell/hutchison-animals" target="_BLANK">
                <figure className="image is-24x24">
                  <img src="/images/github.svg" />
                </figure>
              </a>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navigation
