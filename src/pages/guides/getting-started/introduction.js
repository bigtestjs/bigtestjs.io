import React from "react"

import Layout from "../../../components/layout"

const IntroductionPage = () => (
  <Layout>
    <h1 id="introduction">Introduction</h1>

    <p>BigTest is a framework that aims to make it easy and fast to
    acceptance test <em>all</em> single page apps (SPAs) regardless of framework
    or library.</p>

    <p>When we build applications on the web, we want to be able to test them
    as close to where our users will be. A real person using your app is
    going to use a real browser; do your tests test your app in a real
    browser? And not everybody uses the same browser; do your tests test
    your app across multiple, different browsers and devices? What about
    the network? Chances are your app talks to the network, and your tests
    should account for this too, right? Not to mention a person isn’t
    going to interact with your app on a component level. They’re
    consuming the entire app, using all of it together. All of your
    components working with each other to create an experience.</p>

    <p>If your tests don’t test the app in the same way a person would use
    it, how confident can you really be in them?</p>

    <p>If you prefer video format, <a href="https://github.com/robdel12">Robert
    DeLuca</a> gave a talk at Byteconf
    introducing BigTest:</p>

    <div class="responsive-video">
      <iframe width="560" height="315"
      src="https://www.youtube.com/embed/w8a7Km9b6UI?start=107"
      frameborder="0" allow="autoplay; encrypted-media"
      title="BigTest at Byteconf"
      allowfullscreen></iframe>
    </div>

    <h2 id="whybigtest">Why BigTest?</h2>

    <p>We had a few requirements when setting out to find a testing tool
    that would be ideal for SPAs:</p>

    <ul>
    <li>Fast <span role="img" aria-label="">🏎</span></li>

    <li>Built with components in mind (composable)</li>

    <li>Cross-browser (Firefox, IE, Safari, etc)</li>

    <li>Cross-device (Windows, macOS, iOS, Android, etc)</li>

    <li>Cross-framework (React, Vue, Ember, Angular, etc)</li>

    <li>Cross-test framework (Mocha, Jasmine, etc)</li>
    </ul>

    <p>There are tools like <a href="https://jestjs.io">Jest</a>, but those tests don’t
    run in a real browser. There’s also <a href="https://cypress.io">Cypress</a>, but
    as of this writing, you currently can’t use it outside of Chrome
    (<a href="https://github.com/cypress-io/cypress/issues/310">others coming soon via
    webdriver</a>) and
    wasn't written with components in mind.</p>

    <div class="table-wrapper">
      <div class="table-scroller">
        <table class="comparison-table">
          <thead>
            <tr class="table-header center">
              <th class="sticky-col">Test Framework</th>
              <th>Fast</th>
              <th>Cross Browser</th>
              <th>Cross Device</th>
              <th>Cross Test&nbsp;Runner</th>
              <th>Cross Framework</th>
              <th>Composable</th>
            </tr>
          </thead>
          <tbody>
            <tr class="center">
              <td class="left sticky-col">BigTest</td>
              <td>🏎</td>
              <td>✅</td>
              <td>✅</td>
              <td>✅</td>
              <td>✅</td>
              <td>✅</td>
            </tr>
            <tr class="center">
              <td class="left sticky-col">Cypress</td>
              <td>🚗</td>
              <td>❌</td>
              <td>❌</td>
              <td>❌</td>
              <td>✅<br /></td>
              <td>❌</td>
            </tr>
            <tr class="center">
              <td class="left sticky-col">Selenium</td>
              <td>🚌</td>
              <td>✅<br /></td>
              <td>❌</td>
              <td>✅<br /></td>
              <td>✅<br /></td>
              <td>❌</td>
            </tr>
            <tr class="center">
              <td class="left sticky-col">Jest</td>
              <td>🏎</td>
              <td>❌</td>
              <td>❌</td>
              <td>❌<br /></td>
              <td>✅</td>
              <td>❌</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <p>Most of the existing frameworks check a few of those boxes (or
    partially check them), but not all of them. With mobile browsing being
    so prevalent in today's world we needed something that could easily run
    tests on any device we had on hand (by visiting a URL). So, we decided
    to build what we wanted to see in the ecosystem!</p>

    <h2 id="testingphilosophy">Testing philosophy</h2>

    <p>When writing tests with BigTest it's important to write them like a
    user will be using your app. When a person is interacting with your
    app, they’re using their mouse and keyboard which is translating to
    browser events that your app responds to. They’re clicking things and
    expecting to achieve results. This is what our app’s tests should do
    too: send browser events and assert that there was feedback. We all
    know cross-browser bugs exist!</p>

    <p>If you have tests where you reach into a components or
    controllers state, that's not a proper BigTest. All interactions
    should come from userland. Another thing to keep an eye for is to make
    sure you're asserting against a state in the application the users
    <em>sees</em> or <em>interacts</em> with.</p>

    <p>The goal is to make an interaction and observe the proper change on
    the page has happened as a result of that interaction.</p>

    <h2 id="howdoesbigtestwork">How does BigTest work?</h2>

    <p>BigTest mounts and renders your application into the browser. Then the
    tests you have written will be executed. Interactor drives
    the application around, which is right there inside of the
    browser with the tests and rendered application. This is the key
    difference between BigTest and other testing frameworks, BigTest
    doesn't have a separate process that controls the browser. Which is
    why you can just visit a URL and your BigTests will run.</p>

    <p>At a high-level BigTest:</p>

    <ul>
    <li>Starts your applications server (which bundles the tests &amp; app)</li>

    <li>Launches the browser(s)</li>

    <li>Starts running the test runner</li>

    <li>Interactor drives the application around (click this, visit a
    route, etc)</li>

    <li>Results are reported back to the CLI</li>
    </ul>

    <h2 id="packagesthatmakeupbigtest">Packages that make up BigTest</h2>

    <p>The BigTest framework is comprised of a few small packages that can
    also be used individually. It's helpful to know of these packages
    and what their role is in the BigTest framework.</p>

    <h3 id="convergence">Convergence</h3>

    <p><a href="/docs/convergence/">Convergences</a> are immutable, reusable,
    and composable assertions that allow you to know immediately when
    the desired state is achieved. Put in simple terms: it checks the DOM
    every 10ms (for 2s by default) to see if the state you're checking for
    is there.</p>

    <p>Convergence is the underpinning of everything in BigTest. It's what
    makes interactors reliable. Convergence is even used in the CLI for
    waiting on browser connected state.</p>

    <h3 id="interactor">Interactor</h3>

    <p>In biology, an <a href="/docs/interactor/">interactor</a> is defined as part of
    an organism that natural selection acts upon. A BigTest interactor
    defines part of an app that tests act upon. You can think of
    interactors as composable page objects for modern components.</p>

    <p>Interactors are the heart and soul of BigTest. In simple terms,
    we render the application into the browser and interactors <em>drive</em> the
    application around. They use convergences to make sure the element
    exists and can be interacted with before performing the interaction you
    want.</p>

    <p>Interactors also match the composability you get with modern
    components. This means you can compose your tests in a similar way you
    compose your UI.</p>

    <p>To learn more about interactors be sure to look at the <a href="/guides/interactors/introduction">interactor
    guides.</a></p>

    <h3 id="cli">CLI</h3>

    <p>The <a href="https://github.com/bigtestjs/cli">BigTest CLI</a> aims to make
    setting up acceptance testing in SPAs easy (like setup, build
    tool integration, and browser launching)</p>

    <p>You can think of the CLI as a <a href="https://karma-runner.github.io/2.0/index.html">Karma</a> or
    <a href="https://github.com/testem/testem">Testem</a> but easier to set up and
    contains other helpful CLI commands to work with the BigTest framework
    (like <code>bigtest init</code>).</p>

    <p><strong>Without using the CLI</strong></p>

    <p>Interactors and convergences can be used without BigTest CLI. The
    tradeoff is you will need to bring your own browser launcher
    (like <a href="https://karma-runner.github.io/2.0/index.html">Karma</a> or
    <a href="https://github.com/testem/testem">Testem</a>). If your application is
    already running tests in the browser with Karma/testem, you can easily plug
    convergence/interactor into your existing setup.</p>

    <p><a href="https://github.com/bigtestjs/examples">Checkout the examples GitHub
    repo</a> to see the different ways to get
    going with BigTest.</p>
  </Layout>
);

export default IntroductionPage;
