build:
	@npm run build

ship:
	@git subtree push --prefix build origin gh-pages
