/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

class Footer extends React.Component {
  docUrl (doc, language) {
    const baseUrl = this.props.config.baseUrl
    return baseUrl + 'docs/' + (language ? language + '/' : '') + doc
  }

  pageUrl (doc, language) {
    const baseUrl = this.props.config.baseUrl
    return baseUrl + (language ? language + '/' : '') + doc
  }

  render () {
    const currentYear = new Date().getFullYear()
    return (
      <footer className='nav-footer' id='footer'>
        <section className='sitemap'>
          <a href={this.props.config.baseUrl} className='nav-home'>
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                className='growOnHover'
                width='66'
                height='58'
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('intro.html', this.props.language)}>
              Guides
            </a>
            <a href={this.docUrl('installation.html', this.props.language)}>
              Getting Started
            </a>
          </div>
          <div>
            <h5>Community</h5>
            <a href='https://twitter.com/thefrontside'><i className='fab fa-twitter' /> Twitter</a>
          </div>
          <div>
            <h5>More</h5>
            <a href='https://github.com/thefrontside/bigtest#bigtest-'><i className='fab fa-github' /> Github</a>
            <a href='https://fronstide.io'>The Frontside</a>
          </div>
        </section>
        <section className='copyright'>
          &copy; 2017 - {currentYear} THE FRONTSIDE, INC.
        </section>
      </footer>
    )
  }
}

module.exports = Footer
