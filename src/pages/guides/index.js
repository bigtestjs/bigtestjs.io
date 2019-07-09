import React from "react"

import Layout from "../../components/layout"

const IndexPage = () => (
  <Layout>
    <h1>Introduction</h1>

    <h2>Guides</h2>

    <h3>Getting Started</h3>

    <ul>
        <li><a href="/guides/getting-started/introduction/">Introduction</a></li>
        <li><a href="/guides/getting-started/quick-start/">Quick Start</a></li>
    </ul>
    <h3>Interactors</h3>

    <ul>
        <li><a href="/guides/interactors/introduction/">Introduction</a></li>
        <li><a href="/guides/interactors/custom-interactors/">Custom Interactors</a></li>
        <li><a href="/guides/interactors/composing-interactors/">Composing Interactors</a></li>
        <li><a href="/guides/interactors/available-interactions/">Available Interactions</a></li>
    </ul>

    <div className="quest-issue">
      <h2>Want to help with this&nbsp;page?</h2>
      <p>
        Check out this <a href="https://github.com/bigtestjs/bigtestjs.io/issues/18">quest issue</a>
        to see how you can help improve this&nbsp;page!
      </p>
    </div>

  </Layout>
);

export default IndexPage;
