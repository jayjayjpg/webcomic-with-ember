const fetch = require('node-fetch');
const assert = require('assert');
const fs = require('fs');
const API_TOKEN = process.env.VJS_API_TOKEN;

// var url = process.argv[2];
var headers = { 'Authorization': `token ${API_TOKEN}` };
var options = { method: 'GET', headers: headers };
// let fullData = [];

module.exports = function fetchAllPages(jobName, url) {
  assert(url, 'You did not provide an url to the fetch-releases method');
  console.log(`url ${url}`);
  fetch(url, options).then(function(response) {
    var link = response.headers.get('link');
    let lastNumSnippet = link.substr(link.indexOf('rel="last"')-12);
    let linkSnippetStart = lastNumSnippet.substr(lastNumSnippet.indexOf('page=') + 5);
    let linkSnippetEnd = linkSnippetStart.indexOf('>');
    let maxNumOfPages = linkSnippetStart.substr(0, linkSnippetEnd);
    fetchPages(maxNumOfPages);
  });

  function getPagesData(numOfPages) {
    let promises = [];
    for(var i = 1; i <= numOfPages; i += 1) {
      promises.push(fetchPage(i));
    }
    return Promise.all(promises);
  }

  function getTagData(urlList) {
    let promises = [];
    urlList.forEach((blob) => {
      let promise = fetch(blob.url, options).then(function(tagData) {
        return tagData.json();
      });
      promises.push(promise);
    });
    return Promise.all(promises);
  }

  function fetchPages(numOfPages) {
    console.log("Fetch Pages....✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨");
      getPagesData(numOfPages)
        .then(function(results) {
          let dataPoints = [];
          results.forEach((res) => {
            let filteredRes = res.filter((blob) => !blob.name.includes('beta') && blob.name.endsWith('0'))
              .map((data) =>  { return { url: data.commit.url, name: data.name }; });
            dataPoints.push(...filteredRes);
          });

            getTagData(dataPoints).then((tagData) => {
              let fullData = tagData.map((data) => {
                let tag = dataPoints.find((tag) => tag.url === data.url).name;
                return { y: tag, x: data.commit.author.date, url: data.url, author: data.commit.author.name };
              });

              fs.writeFile(`./data/${jobName}.json`, JSON.stringify(fullData, null, 4), function(err) {
                  if(err) {
                      return console.log(err);
                  }

                  console.log("The file was saved! ");
              });
          });
      });
    }

  function fetchPage(pageNum) {
    return fetch(`${url}?page=${pageNum}`, options).then(function(res) {
      return res.json();
    });
  }
}
