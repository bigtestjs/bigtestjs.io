import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "./header.css"

const Header = ({ siteTitle }) => (
  <header className="header">
    <div className="header-container">
      <a className="header-logo" href="/">
        <span className="visually-hidden">
          BigTest
        </span>
      </a>

      <nav className="header-nav">
        <ul>
          <li><Link to="/guides/">Guides</Link></li>
          <li><Link to="/docs/">Docs</Link></li>
        </ul>
      </nav>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
