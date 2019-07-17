module.exports = {
  siteMetadata: {
    title: `BigTest`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@thefrontside`,
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-postcss",
      options: {
        postCssPlugins: [
          require("autoprefixer"),
          require("precss"),
          require("postcss-color-function"),
          require("postcss-calc"),
          require("postcss-functions")({
            functions: {
              z(layer) {
                /*
                  Single source-of-truth for custom z-indices.
                  If a z-index is needed on an element, define a string here that describes it
                  and place in the appropriate order.

                  Layers are ordered top to bottom.

                  To use in CSS:
                  .myComponent {
                    z-index: z('myComponentLayerString');
                  }

                  Elements shouldn't share a layer string, because there should always be an explicit
                  z priority between two elements. Stick to one usage per string.

                */
                const layers = [
                  'footer',
                  'navigation'
                ];

                const layerIndex = layers.indexOf(layer.replace(/^'(.*)'$/, '$1'));
                return (layerIndex > -1) ? (layers.length - layerIndex) : '1';
              }
            }
          })
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
