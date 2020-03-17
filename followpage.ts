import { ElementHandle } from "puppeteer";
import * as request from "request";
import * as fs from "fs"
import * as csv from "csv-parser"
// manager imports
import { MasterManager } from "../managers";
import { MouseManager } from "../managers/mouse";
import { ScrollManager } from "../managers/scroll";
import {KeyboardManager} from "../managers/keyboard"

// utility imports
import { sleep, random } from "../utils";

const createManagers = (master: MasterManager): void => {
  // Common managers.
  master.createManager("mouse", MouseManager);
  master.createManager("scroll", ScrollManager);
  master.createManager("keyboard", KeyboardManager);
};


export default async (master: MasterManager): Promise<void> => {
    createManagers(master);

    const mouseManager = master.getManager<MouseManager>("mouse");
    const scrollManager = master.getManager<ScrollManager>("scroll");
    const keyboardManager = master.getManager<KeyboardManager>("write")

    const page = await master.newPage();


    const url ='https://www.google.com/'

    await page.goto(url);
    await sleep(random(1000, 2000));


    // google searchbox xpath
    const xpath ='//*[@id="tsf"]/div[2]/div[1]/div[1]/div/div[2]/input'
    // google search result selector
    const fbSelector='#rso > div:nth-child(1) > div > div > div.r > a > h3'
    // fb searchbar selector
    const fbSearch ='input._1frb'
    // fb search button
    const fb_searchButton ='form > button'
    //go to pages category
    const pages = '/html/body/div[1]/div[3]/div[1]/div/div[2]/div/div/div/div/div/div/div/div/ul/li[6]/a/div/div[1]'
    // official page
    const official = '/html/body/div[1]/div[3]/div[1]/div/div[3]/div[2]/div/div/div[2]/div/div/div/div[1]/div[1]/div/div/div[2]/div/div[1]/div[1]/div/div/div/div/a/span'
    //like button selector
    const like = '/html/body/div[1]/div[3]/div[1]/div/div/div[2]/div[1]/div/div[2]/div/div[1]/div/div/div[1]/div/span/button'
    //follow button selector
    //const follow = '#u_0_z > div > div > div:nth-child(2) > button'
    //home page selector
    const home = '/html/body/div[1]/div[2]/div/div[1]/div/div/div/div[2]/div[1]/div[2]/div/a'


    // clicks on the google search box
    const commonsLink = await page.waitForXPath(xpath);
    await scrollManager.scrollToElement(commonsLink);
    await mouseManager.moveToElement(commonsLink);
    await mouseManager.click();
    console.log('clicked on searchbar');
    await sleep(random(1000, 2000));


    // enter the input in google search box
    await page.keyboard.type('https://www.facebook.com/');
    await sleep(random(1000,1200));
    await page.keyboard.press("Enter")
    console.log('entered the input for search');


    // clicks on the search result
    await sleep(random(1000,1500));
    const linkselector = await page.waitForSelector(fbSelector);
    await mouseManager.moveToElement(linkselector);
    await mouseManager.click();
    console.log('clicked on search result');
    await sleep(random(2000,3000));


    // clicks on fb search box
    const fbSearch_selector = await page.waitForSelector(fbSearch);
    await mouseManager.moveToElement(fbSearch_selector);
    await mouseManager.click();
    console.log('clicked on fb search box')


    // reading file from dir and writing the keyword in fb search box
    var data =fs.readFileSync('/home/sanjeet/Desktop/read/pages.txt', 'utf-8')
    var array = data.toString().split('\n');
    function random_item(array)
    {

      return array[Math.floor(Math.random()*array.length)];

    }
    await sleep(random(2000,3000));
    await page.keyboard.type(random_item(array), {delay: 100});
    await sleep(random(1000,1500));

    // clicks on fb search button
    const searchButton = await page.waitForSelector(fb_searchButton);
    await mouseManager.moveToElement(searchButton);
    await mouseManager.click();
    console.log('clicked on fb search button')
    await sleep(random(1000,2000));


    //clicks on pages on top
    const pageFullXpath = await page.waitForXPath(pages);
    await mouseManager.moveToElement(pageFullXpath);
    await mouseManager.click();
    console.log('clicked on page')
    await sleep(random(2000,3000));


    // follows the official page which has blue tick
    const officialPage = await page.waitForXPath(official);
    await mouseManager.moveToElement(officialPage);
    await mouseManager.click();
    console.log('clicked on searched page');
    await sleep(random(1500,2000));


    //clicks on like
    const likeButton = await page.waitForXPath(like);
    await mouseManager.moveToElement(likeButton);
    await mouseManager.click();
    console.log('liked the page');
    await sleep(random(3000,4000));


    //back to homepage
    const homePage = await page.waitForXPath(home);
    await mouseManager.moveToElement(homePage);
    await mouseManager.click();
    console.log('back to homepage');

}



