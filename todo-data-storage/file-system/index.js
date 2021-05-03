'use strict';
const { exname, extname } = require('path');
const { readdir, readFile } = require('fs').promises;

exports.fetchAll = async () => {
  // 同一ディレクトリ内に存在するJSONファイルを全て取得
  const files = (await readdir(__dirname))
    .filter(file => extname(file) === '.json');
  return Promise.all(
    files.map(file => 
      readFile(`${__dirname}/${file}`, 'utf8').then(JSON.parse)
    )
  )
}