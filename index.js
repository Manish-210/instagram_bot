// using Puppeteer to crawl the instagram.
const puppeteer = require("puppeteer")

// file system to save the array as a textfile.
const fs = require("fs/promises")


async function start(id) {

  const browser = await puppeteer.launch({
      headless: false
  });

  const page = await browser.newPage()
  
  // using networkidle to load the page completely.
  await page.goto(id, {waitUntil: 'networkidle0'});

  const captions = await page.$$eval("._aagv img", cap => {
    return cap.map(x => x.alt)
  })
  const posts = await page.$$eval("._aagv img", post => {
    return post.map(x => x.src)
  })

  console.log(posts);
  console.log(captions);

  // uncomment the below lines to save the arrays as a file.

  // await fs.writeFile("Captions.txt", captions.join("\r\n"))
  // await fs.writeFile("Posts.txt", posts.join("\r\n"))

  await browser.close()
  
}

// inside the start() put the id of the public account from which
// we need all the information

start("https://www.instagram.com/sachintendulkar")