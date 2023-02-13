#!/usr/bin/env sh

# abort on errors
set -e
# build
yarn build
# navigate into the build output directory
cd dist
# create git repo
git init
# commit the deploy build
git add -A
git commit -m 'deploy'
# push the deploy build to github pages branch
git push -f git@github.com:averywald/rps.git master:gh-pages
# return terminal session to calling directory
cd -