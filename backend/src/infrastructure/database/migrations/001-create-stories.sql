CREATE TABLE stories (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    situation TEXT NOT NULL,
    task TEXT NOT NULL,
    action TEXT NOT NULL,
    result TEXT NOT NULL,
    tags TEXT NOT NULL DEFAULT '[]'
) STRICT;