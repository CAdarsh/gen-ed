//@ts-ignore
import * as Spider from 'node-spider'
//@ts-ignore
import * as  TurndownService from 'turndown'
import * as cheerio from 'cheerio'
import parse from 'url-parse'
const turndownService = new TurndownService();

export type Page = {
  url: string,
  text: string,
  title: string,
}
class Crawler {
  pages: Page[] = [];
  limit: number = 1000;
  urls: string[] = [];
  spider: Spider | null = {};
  count: number = 0;
  textLengthMinimum: number = 200;

  constructor(urls: string[], limit: number = 1000, textLengthMinimum: number = 200) {
    this.urls = urls;
    this.limit = limit
    this.textLengthMinimum = textLengthMinimum

    this.count = 0
    this.pages = [];
    this.spider = {}
  }

  handleRequest = (doc: any) => {
    const $ = cheerio.load(doc.res.body);
    $("script").remove();
    $("#hub-sidebar").remove();
    $("header").remove();
    $("nav").remove();
    $("img").remove();
    const title = $("title").text() || $(".article-title").text();
    const html = $("body").html();
    const text = turndownService.turndown(html);
    console.log("crawling ", doc.url)
    const page: Page = {
      url: doc.url,
      text,
      title,
    };
    if (text.length > this.textLengthMinimum) {
      this.pages.push(page);
    }


    doc.$("a").each((i: number, elem: any) => {
      var href = doc.$(elem).attr("href")?.split("#")[0];
      var targetUrl = href && doc.resolve(href);
      // crawl more
      if (targetUrl && this.urls.some(u => {
        const targetUrlParts = parse(targetUrl);
        const uParts = parse(u);
        return targetUrlParts.hostname === uParts.hostname
      }) && this.count < this.limit) {
        this.spider.queue(targetUrl, this.handleRequest);
        this.count = this.count + 1
      }
    });
  };

  start = async () => {
    this.pages = []
    return new Promise((resolve, reject) => {
      this.spider = new Spider({
        concurrent: 5,
        delay: 0,
        allowDuplicates: false,
        catchErrors: true,
        addReferrer: false,
        xhr: false,
        keepAlive: false,
        error: (err: any, url: string) => {
          console.log(err, url);
          reject(err)
        },
        // Called when there are no more requests
        done: () => {
          resolve(this.pages)
        },
        headers: { "user-agent": "node-spider" },
        encoding: "utf8",
      });
      this.urls.forEach((url) => {
        this.spider.queue(url, this.handleRequest);
      });
    })
  }
}

export { Crawler };

/*

Documentation for this file:

This file contains the Crawler class. The Crawler class is responsible for crawling the web for documents. It contains the following fields:

pages: A list of pages that have been crawled
limit: The maximum number of pages to crawl
urls: A list of urls to crawl
spider: The spider object that is used to crawl the web
count: The number of pages that have been crawled

The Crawler class contains the following methods:

handleRequest: This method is called when a page is crawled. It extracts the title and text from the page and adds it to the list of pages.
start: This method starts the crawling process. It returns a promise that resolves to the list of pages that have been crawled.
Compare this snippet from src\services\documents\crawler.js:
*/