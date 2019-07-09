import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Does my application work in real life?" />
    <section className="home-section home-hero">
      <h1 className="home-hero-logo">
        <img src="/images/logo-e73367a1.svg" alt="BigTest" />
      </h1>

      <h2 className="home-hero-tagline">
        A Suite of JavaScript libraries and framework extensions to help you answer the&nbsp;question:
        <em>
          Does my application work in real&nbsp;life?
        </em>
      </h2>

      <div className="home-hero-cta">
        <Link to="/guides/getting-started/introduction" className="btn btn--secondary">Get Started</Link>
        <a href="https://gitter.im/bigtestjs" className="btn btn--primary btn--hollow">Chat on Gitter</a>
      </div>
    </section>

    <section className="home-section home-intro">
      <h2>Big Questions Need Big&nbsp;Tests</h2>

      <ul className="home-intro-buckets">
          <li>
            <h3>Real Applications</h3>
            <p>The surest way to know if an application is going to work is to actually run it. Big tests boot the entire application before every&nbsp;testcase.</p>
          </li>
          <li>
            <h3>Real Browsers</h3>
            <p>Does your appication run in a browser? Then if a test is going to measure whether it works or not, it also needs to run in a real browser that a real user might use, and it should dispatch real UI events against a real&nbsp;DOM.</p>
          </li>
          <li>
            <h3>Real Asynchrony</h3>
            <p>Testing big is hard because there can be hundreds if not thousands of things happening concurrently inside your application; including user&nbsp;interactions.</p>
          </li>
      </ul>
    </section>

    <section className="home-section home-users">
      <h2>Who's Using BigTest?</h2>

      <ul className="home-users-list">
        <li>
          <a href="https://frontside.io" target="_blank" rel="noopener noreferrer">
            <img src="/images/users/frontside-bca0ad03.svg" alt="The Frontside" />
          </a>
        </li>
        <li>
          <a href="https://folio.org" target="_blank" rel="noopener noreferrer">
            <img src="/images/users/folio-f719604e.png" alt="FOLIO" />
          </a>
        </li>
      </ul>
    </section>
  </Layout>
)

export default IndexPage
