const mongoose = require('mongoose');
const fs = require('fs');

const dbUrl = 'mongodb://127.0.0.1:27017/demo_es_vn';

const fileName = 'dumb_data.txt';

// splitData();
// getDumbData();

exports.connectDb = () => {
  mongoose.connect(dbUrl, {
    useMongoClient: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error'));
};

exports.getDumbData = (callback) => {
  fs.readFile(fileName, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    const splits= splitData(data);
    let i = 0;
    const blogs = splits.map((item) => {
      i = i + 1;
      return {
        author: i % 2 === 0 ? 'Tôn Quang Từ' : 'Nguyễn Thanh Tùng Bệnh',
        content: item
      }
    });
    console.log(blogs);
    return callback(blogs);
  });
};

function splitData(data) {
  const splits = data.split(/[,.;]+/);
  const results = [];
  splits.forEach((item) => {
    if (item && item !== '') {
      const trimItem = item.trim();
      if (trimItem && trimItem.length > 0) {
        results.push(trimItem);
      }
    }
  });
  // console.log(results);
  return results;
}