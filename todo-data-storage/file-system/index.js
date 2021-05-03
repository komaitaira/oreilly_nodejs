'use strict';
const { exname, extname } = require('path');
const { readdir, readFile, writeFile } = require('fs').promises;

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

exports.fetchByCompleted = completed => exports.fetchAll()
  .then(all => all.filter(todo => todo.completed === completed))

exports.create = todo =>
  writeFile(`${__dirname}/${todo.id}.json`, JSON.stringify(todo));

