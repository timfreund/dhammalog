# Dhammalog

This static site is so simple it doesn't even use a static site
generator.  There are three components:

1. index.html
2. eveningtalks.js
3. feedtrimmer.py: a python script that converts the original RSS feed to JSON

Run feedtrimmer.py, and you'll then get a file named
eveningtalks.json.  Now deploy, and you're done.

If feedtrimmer.py won't run, you're probably missing the feedparser
library.  If you're running linux, this is easy to solve:

    [apt-get|yum] install python-feedparser

## Notes and future plans

It would be nice to update the catalog.  Right now once the catalog
is saved in localstorage, it won't be updated.  That's a bug.

The javascript is probably terrible, and I'm open to suggestions.

It'd be nice to have a more responsive player UI.
