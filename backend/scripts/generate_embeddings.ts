import 'dotenv/config';

import { readFile } from 'node:fs/promises';
import puppeteer, { Browser } from 'puppeteer';
// @ts-ignore
import TurndownService from 'turndown';
import { writeFile, mkdir, readdir } from 'fs/promises';
import { MarkdownTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores';
import { PineconeClient } from "@pinecone-database/pinecone";
import { sites_ref } from './sites-ref';

export type Page = {
  url: string,
  text: string,
  title: string,
}

const client = new PineconeClient();

let pineconeIndex;

const turndownService = new TurndownService();

// throw error if environment variables are not set
if (!process.env.PINECONE_API_KEY) {
  throw new Error('PINECONE_API_KEY is not set');
}
if (!process.env.PINECONE_ENVIRONMENT) {
  throw new Error('PINECONE_ENVIRONMENT is not set');
}
if (!process.env.PINECONE_INDEX) {
  throw new Error('PINECONE_INDEX is not set');
}


async function main() {
  await client.init({
    apiKey: process.env.PINECONE_API_KEY!,
    environment: process.env.PINECONE_ENVIRONMENT!,
  });

  pineconeIndex = client.Index(process.env.PINECONE_INDEX!);

  // delete all the embeddings in the pinecone index
  await pineconeIndex.delete1({
    deleteAll: true,
    namespace: "info-foraging-v1"
  });



  // const markdowns = await scrape_all_pages();
  const markdowns = await get_all_pages_from_cache();
  for (const markdown of markdowns) {
    await generate_embeddings(markdown.text, markdown.bias, markdown.topic);
  }
}

main();

async function get_all_pages_from_cache(): Promise<{ text: string, bias: number, topic: string }[]> {
  // read files from output_all folder and return the markdowns
  const data = sites_ref["docs"];
  const markdowns: { text: string, bias: number, topic: string }[] = [];
  for (const file of data) {
    const markdown = '# ' + file['title'] + '\n\n' + file['content'];
    markdowns.push({
      text: markdown,
      bias: file['bias'],
      topic: file['topic']
    });
  }
  console.log(`Got ${markdowns.length} markdowns ready to save`);
  return markdowns;

}

/**
 * Scrapes all researchr pages and saves them to a file
 *
 * @returns the markdowns of all researchr pages
 *
 */
async function scrape_all_pages(): Promise<string[]> {
  // get urls from json file
  const { urls } = JSON.parse(await readFile('scripts/pages.json', 'utf8'));
  console.log(`Got ${urls.length} urls ready to scrape`);

  const browser = await puppeteer.launch();
  const markdowns: string[] = [];
  for (const url of urls) {
    try {
      const markdown = await scrape_researchr_page(url, browser);
      markdowns.push(markdown);
    } catch (e) {
      console.log(`Error scraping ${url}`);
    }
  }
  await browser.close();

  console.log(`Got ${markdowns.length} markdowns ready to save`);

  // save all markdowns to a file in the generated folder. If the folder does not exist, create it
  try {
    await readdir('./generated');
  } catch (e) {
    await mkdir('./generated');
  }
  await writeFile('./generated/all.txt', markdowns.join('\n\n'));
  console.log(`Saved all markdowns to ./generated/all.txt`);

  return markdowns;
}

/**
 * Generates embeddings for the given markdowns and saves them to a pinecone index
 * @param markdowns the markdowns to generate embeddings for
 *
 */
async function generate_embeddings(markdowns: string, bias: number, topic: string) {
  const textSplitter = new MarkdownTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 20
  });
  const embeddings = await textSplitter.splitText(markdowns);
  console.log(`Got ${embeddings.length} embeddings ready to save`);

  const embeddingModel = new OpenAIEmbeddings({ maxConcurrency: 5, modelName: "text-embedding-ada-002" });

  await PineconeStore.fromTexts(embeddings, {
    bias,
    topic,
  }, embeddingModel, {
    pineconeIndex,
    namespace: 'info-foraging-v1'
  }
  );
  console.log(`Saved embeddings to pinecone index ${pineconeIndex}`);
}

/**
 * Scrapes the researchr page and returns the markdown
 *
 * @param url the url of the researchr page
 * @param browser the puppeteer browser
 * @returns the markdown of the researchr page
 */
async function scrape_researchr_page(url: string, browser: Browser): Promise<string> {
  const page = await browser.newPage();
  await page.setJavaScriptEnabled(false);
  await page.goto(url);

  const element = await page.waitForSelector('#content > div.row > div', {
    timeout: 100
  });

  if (!element) {
    throw new Error('Could not find element');
  }

  // keep only content elements (like p, h1, h2, h3, h4, h5, h6, li, blockquote, pre, code, table, dl, div)
  await element.evaluate((element) => {
    const elements = element.querySelectorAll(
      '*:not(p, h1, h2, h3, h4, h5, h6, li, blockquote, pre, code, table, dl, div)'
    );
    for (let i = 0; i < elements.length; i++) {
      elements[i].parentNode?.removeChild(elements[i]);
    }
  });

  const html_of_element = await element.evaluate((element) => element.innerHTML);

  return turndownService.turndown(html_of_element);
}
