const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'data.json');

function getData() {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
}

function saveData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

module.exports = {
  getData,
  saveData
};
