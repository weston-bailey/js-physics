rm -rf ./dist
npm run build
git push --delete origin gh-pages
git subtree push --prefix dist origin gh-pages