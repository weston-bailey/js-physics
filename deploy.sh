rm -rf ./dist
npm run build
git add ./dist
git commit -m 'pushing ./dist to be deployed on gh-pages'
git push --delete origin gh-pages
git subtree push --prefix dist origin gh-pages
rm -rf ./dist
git add .
git commit -m 'removing build'
