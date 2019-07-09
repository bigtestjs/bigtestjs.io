import { Link } from "gatsby"
import React from "react"
import "./footer.css"

const Header = () => (
  <footer class="footer">
    <section class="footer-sitemap">
      <div class="footer-sitemap-section">
        <a href="/" class="footer-logo">
          <img src="/images/logo-white.svg" alt="BigTest" />
        </a>

        <Link to='/guides'>Guides</Link>
        <Link to='/docs'>Docs</Link>
      </div>

      <div class="footer-sitemap-section">
        <h5>Community</h5>
        <a href="https://twitter.com/thefrontside">
          <i class="fab fa-fw fa-twitter"></i> Twitter
        </a>
        <a href="https://gitter.im/bigtestjs">
          <i class="fab fa-fw fa-gitter"></i> Gitter
        </a>
      </div>

      <div class="footer-sitemap-section">
        <h5>More</h5>
        <a href="/download/index.html">
          Downloads
        </a>
        <a href="https://github.com/bigtestjs">
          <i class="fab fa-fw fa-github"></i> Github
        </a>
        <a href="https://frontside.io">Frontside</a>
      </div>
    </section>

    <section class="footer-copyright">
      &copy; 2017 - {new Date().getFullYear()} The Frontside, Inc.
    </section>
  </footer>
);

export default Header;
