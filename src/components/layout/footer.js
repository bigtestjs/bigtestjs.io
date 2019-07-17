import { Link } from "gatsby"
import React from "react"
import "./footer.css"
import footerLogo from '../../images/logo-white.svg';

const Header = () => (
  <footer className="footer">
    <section className="footer-sitemap">
      <div className="footer-sitemap-section">
        <a href="/" className="footer-logo">
          <img src={footerLogo} alt="BigTest" />
        </a>

        <Link to='/guides'>Guides</Link>
        <Link to='/docs'>Docs</Link>
      </div>

      <div className="footer-sitemap-section">
        <h5>Community</h5>
        <a href="https://twitter.com/thefrontside">
          <i className="fab fa-fw fa-twitter"></i> Twitter
        </a>
        <a href="https://gitter.im/bigtestjs">
          <i className="fab fa-fw fa-gitter"></i> Gitter
        </a>
      </div>

      <div className="footer-sitemap-section">
        <h5>More</h5>
        <a href="/download/index.html">
          Downloads
        </a>
        <a href="https://github.com/bigtestjs">
          <i className="fab fa-fw fa-github"></i> Github
        </a>
        <a href="https://frontside.io">Frontside</a>
      </div>
    </section>

    <section className="footer-copyright">
      &copy; 2017 - {new Date().getFullYear()} The Frontside, Inc.
    </section>
  </footer>
);

export default Header;
