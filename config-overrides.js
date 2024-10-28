const { override, addWebpackPlugin } = require('customize-cra');
const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dayjs = require('dayjs');

const json = require('./aJson.json');

class ExtractFile {
  constructor(path) {
    this.path = path;
  }

  // 获取文件内容
  getContent() {
    console.log('文章内容读取中...');
    try {
      const content = fs.readFileSync(
        path.resolve(__dirname, this.path),
        'utf8'
      );
      console.log('文章内容读取结束...');
      return content;
    } catch (err) {
      console.error('Error reading file:', err);
      return;
    }
  }

  // 获取文件时间信息
  getFileTimes() {
    try {
      const stats = fs.statSync(path.resolve(__dirname, this.path));
      return {
        create_at: stats.ctime, // 创建时间
        update_at: stats.mtime, // 修改时间
      };
    } catch (error) {
      console.error('Error reading file:', error);
    }
  }
}

function addImportArticleInfo(json) {
  return json.article.map((item, index) => {
    const article = new ExtractFile(item.path);
    item.id = index;
    item.create_at = dayjs(article.getFileTimes().create_at).format(
      'YYYY-MM-DD'
    );
    item.update_at = dayjs(article.getFileTimes().update_at).format(
      'YYYY-MM-DD'
    );
    item.content = article.getContent();
    return item;
  });
}

const data = { article: addImportArticleInfo(json) };
try {
  fs.writeFileSync(path.resolve(__dirname, 'aJson.json'), JSON.stringify(data));
  console.log('文件写入成功');
} catch (err) {
  console.error(err);
}

module.exports = override(
  addWebpackPlugin(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'aJson.json'),
          to: path.resolve(__dirname, 'build'),
        },
      ],
    })
  )
);
