/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const ProjectTitle = props => (
  <h2 className="projectTitle">
    {siteConfig.title}
    <small>{siteConfig.tagline}</small>
  </h2>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || '';
    return (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">
            <div className="projectLogo">
              <img src={`${siteConfig.baseUrl}img/ghost-logo.png`} />
            </div>
            <div className="inner">
              <h2 className="projectTitle">
                {siteConfig.title}
                <small>{siteConfig.tagline}</small>
              </h2>
              <div className="section promoSection">
                <div className="promoRow">
                  <div className="pluginRowBlock">
                    <Button href={docUrl('examples.html', language)}>Examples</Button>
                    <Button href={docUrl('installation.html', language)}>Get Started</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

const Features = props => (
  <Block layout="fourColumn">
    {[
      {
        title: 'What is Bigtest?',
        content: 'Gold Road clipper bring a spring upon her cable reef.',
      },
      {
        title: 'Why Use It?',
        content: 'Mutiny Admiral of the Black run a shot across the bow.',
      },
    ]}
  </Block>
);

const Testimonials = props => (
  <Container className="testimonials">
    <GridBlock
      align="center"
      contents={[
        {
          content:
            "<i>Leverage agile frameworks to provide a robust synopsis for high level overviews. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</i>",
          image: `${siteConfig.baseUrl}img/john.jpeg`,
          imageAlign: "top",
          title: 'John Johnson <br/><font size="2">Worlds Greatest Developer</font>'
        },
        {
          content:
            "<i>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution.</i>",
          image: `${siteConfig.baseUrl}img/anderson.jpeg`,
          imageAlign: "top",
          title: 'Mr. Anderson <br/><font size="2">Voted "Most Credible Reviewer" in College</font>'
        },
        {
          content:
            "<i>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps.</i>",
          image: `${siteConfig.baseUrl}img/paul.jpeg`,
          imageAlign: "top",
          title: '...Paul? <br/><font size="2">Nice Guy</font>'
        }
      ]}
      layout="threeColumn"
    />
    <div className="disclaimer"><font size="1">These are not real people or testimonials.</font></div>
  </Container>
);

const HowTo = ({ language }) => (
  <div className="howToSection">
      <Container>
        <div>
          <h2>You've Convinced Me! How do I use This?!</h2>
          <p>Lee rutters matey. Snow scallywag chandler. Barkadeer cutlass gaff. Prow gibbet avast.</p>
        </div>
        <div>
          <a className="button" href={docUrl('installation.html', language)}>
            Get Started
          </a>
        </div>
      </Container>
    </div>
);

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }
  const showcase = siteConfig.users
    .filter(user => {
      return user.pinned;
    })
    .map((user, i) => {
      return (
        <a href={user.infoLink} className="growOnHover" key={i}>
          <img src={user.image} title={user.caption} />
        </a>
      );
    });

  return (
    <div className="productShowcaseSection">
      <h2>{"Who's Using This?"}</h2>
      <p>All These People Love BigTest</p>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        <a className="button" href={pageUrl('users.html', props.language)}>
          More {siteConfig.title} Users
        </a>
      </div>
    </div>
  );
};

class Index extends React.Component {
  render() {
    let language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="aboutContainer">
          <Features />
          <HowTo language={language} />
          <Showcase language={language} />
          <Testimonials />
        </div>
      </div>
    );
  }
}

module.exports = Index;
