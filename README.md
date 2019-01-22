# Mongoosenewsscraper
Mongoosenewsscraper is a scraper app which captures the title, summary and image of articles of The New York Times. In this app, users are able to scrape new articles,save their preferred articles, add notes and edit notes to one or multiple articles. 

# Demo
https://ilikescraping.herokuapp.com/

Key Dependencies
request: enables cheerio to get access to front-end code of https://www.nytimes.com/

cheerio: scrapes front-end code from https://www.nytimes.com/

mongoose: be in charge of database of NYT Scraper

express: builds server-side routes and functions

morgan: logs server-side requests, helping debugging

# Installation

To run the application locally, first clone this repository with the following command.

git@github.com:git@github.com:bssheetal/Mongoosenewsscraper.git
Next, install the application dependencies.

npm install
Finally, run the node server locally.

node server.js
Now, open the local application on port 8080 at the URL: http://localhost:8080/
