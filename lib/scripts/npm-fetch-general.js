const fetch = require('node-fetch');
const fs = require('fs');

const filename = process.argv[2];

function fetchMonths() {
  const daysPerMonth = [31,28,31,30,31,30,31,31,30,31,30,31,31,28]; 

  return daysPerMonth.map((numOfDays, index) => {
    const month = index % 12 + 1;
    const year = index < 12 ? 2017 : 2018;

    return `${year}-${month}-01:${year}-${month}-${numOfDays}`;
  });
}


function fetchData(url) {
 return fetch(url).then((res) => res.json()).then((res) => res);
}

function parseData(data) {
  return data.map((val) => { return { date: val.start, value: val.downloads }});
  // return data.map((val) => { return { date: val.start.substring(0, val.start.length - 3) + '-02', value: val.downloads }});
}

function fetchPckData(dates) {
  const dataFetches = dates.map((date) => {
    const regUrl = `https://api.npmjs.org/downloads/point/${date}/`;
    return fetchData(regUrl).then((data) => data);
  });

  return Promise.all(dataFetches).then((vals) => vals);
}

function writeFile(data, name) {
  fs.writeFile(name, JSON.stringify(data), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
  }); 
}

// fetchData(regUrl);
const months = fetchMonths();
fetchPckData(months).then((pckData) => {
  const parsedData = parseData(pckData);
  writeFile(parsedData, filename);
});

