#!/usr/bin/env python

from datetime import datetime, date
import feedparser
import json

extra_values = [
    'author_detail',
    'authors',
    'content',
    'guidislink',
    'id',
    'itunes_explicit',
    'itunes_keywords',
    'links',
    'published',
    'published_parsed',
    'summary',
    'summary_detail',
    'tags',
    'title_detail',
]

def extract_talk_id(entry):
    talk_id = None
    l = entry['link']
    raw_date = l[l.rfind('/')+1:l.rfind('/')+7]
    try:
        # this is a lazy format test
        datetime.strptime(raw_date, '%y%m%d')
        talk_id = "20" + raw_date
    except:
        talk_id = "20" + l[l.rfind('/')+1:l.rfind('/')+9]
    return talk_id
    
if __name__ == '__main__':
    feed_url = 'http://cdn.sibilly.com/dhammatalks/evening.xml'
    output_location = os.path.sep.join([os.path.dirname(__file__), 'eveningtalks.json'])

    feed = feedparser.parse(feed_url)
    entries = {}
    for entry in feed['entries']:
        for key in extra_values:
            del entry[key]

        entry['talk_id'] = extract_talk_id(entry)
        entries[entry['talk_id']] = entry

    with open(output_location, 'w') as output_file:
        output_file.write(json.dumps(entries, sort_keys=True, indent=1))


