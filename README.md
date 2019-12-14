1.  **Install newest node.js**

2.  **Install Gatsby**

    ```shell
    npm install --global gatsby-cli
    ```

3.  **Create new gatsby site**

    ```shell
    # create a new Gatsby site using the default starter
    # my project directory: basic-gatsby-pwa
    gatsby new basic-gatsby-pwa
    ```

4.  **Create new git repository**
    https://github.com/robertSefman/basic-gatsby-pwa

5.  **Set git**
    ```shell
    cd basic-gatsby-pwa
      git init
    git remote add origin https://github.com/robertSefman/basic-gatsby-pwa.git
    git add .
    git commit -a -m \"adding base Gatsby install to our repo\"
    #set origin for push
    git push --set-upstream origin master
    ```
6.  **Install plugins**

    ```shell
    yarn add gatsby-plugin-manifest
    yarn add gatsby-plugin-offline
    ```

    start url
    icon

7.  **Change `gatsby-config.js`**
    ```shell
    module.exports = {
      siteMetadata: {
        title: 'Gatsby Default Starter',
        description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
        author: `@gatsbyjs`,
      },
      plugins: [
        "gatsby-plugin-react-helmet",
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
            name: "GatsbyJS",
            short_name: "GatsbyJS",
            start_url: "/basic-gatsby-pwa",
            background_color: "#6b37bf",
            theme_color: "#6b37bf",
            display: "minimal-ui",
            icon: "src/images/pwa-icon.png", // This path is relative to the root of the site.
          },
        },
        "gatsby-plugin-offline",
      ],
    }
    ```

yarn add gh-pages --dev

package.json

update scripts section - add deploy:

     "deploy": "gatsby build --prefix-paths && gh-pages -d public",

change repository and bugs url-s

"scripts": {
"deploy": "gatsby build --prefix-paths && gh-pages -d public",
"build": "gatsby build",
"develop": "gatsby develop",
"format": "prettier --write \"\*_/_.{js,jsx,json,md}\"",
"start": "npm run develop",
"serve": "gatsby serve",
"clean": "gatsby clean",
"test": "echo \"Error: no test specified\" && exit 1"
},
"repository": {
"type": "git",
"url": "https://github.com/robertSefman/basic-gatsby-pwa"
},
"bugs": {
"url": "https://github.com/robertSefman/basic-gatsby-pwa/issues"
}

yarn deploy
