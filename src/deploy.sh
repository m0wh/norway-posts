#!/usr/bin/env sh

set -e
yarn build
cd dist

git init
git add -A
git commit -m 'Update' --allow-empty
git push -f git@github.com:m0wh/norway-posts.git master:gh-pages

cd -
