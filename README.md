# Biola Styleguide
Styleguide for biola frontend websites. [View Docs](http://biola.github.io/styleguide)

NOTE: I'm still trying to figure out the best way to get the dependent assets like bootstrap into the docs without committing all the bower dependencies.

## Development

    # Clone project
    git clone git@github.com:biola/styleguide.git

    # Move into project folder
    cd styleguide

    # Install gulp packages that are needed for development
    npm install

    # Build assets, start server, and watch for changes
    gulp

The server should start at [http://localhost:8080](http://localhost:8080) by default. As long as gulp is running, it will automatically watch for changes in the `src` folder and recompile the changes into the `dist` folder.


## Gulp

To install new dev packages

    npm install gulp-something --save-dev

This will add the dependency to the devDependencies section in package.json.
