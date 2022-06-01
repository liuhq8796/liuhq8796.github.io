"use strict";

console.log();
process.on("exit", () => {
  console.log();
});

// 第一个参数没传递报错，退出进程
if (!process.argv[2]) {
  console.error("[模块名]必填 - Please enter new title name");
  process.exit(1);
}

// 路径模块
const path = require("path");
// 保存文件
const fileSave = require("file-save");
// 转驼峰
const upperCamelCase = require("uppercamelcase");
// 第一个参数 标题
const title = process.argv.slice(2).join(" ");
// 驼峰标题
const upperTitle = upperCamelCase(title);
// 第二个参数 url 标题转连字符
const url =
  "/" +
  upperTitle.substring(0, 1).toLowerCase() +
  upperTitle
    .substring(1)
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase();
// 页面组件名
const viewName = upperTitle + "View.vue";
// 页面组件路径
const pagePath = path.resolve(__dirname, "../../src/views");

const files = [
  {
    fileName: viewName,
    content: `<script setup lang="ts"></script>

<template>
  <div></div>
</template>`,
  },
];

// 添加到 something-interesting.json
const somethingInteresting = require("../../src/json/something-interesting.json");
if (somethingInteresting[title]) {
  console.error(`[${title}]已存在 - ${title} already exists`);
  process.exit(1);
}
somethingInteresting[title] = url;
fileSave(path.join(__dirname, "../../src/json/something-interesting.json"))
  .write(JSON.stringify(somethingInteresting, null, 2), "utf8")
  .end("\n");

files.forEach((file) => {
  fileSave(path.join(pagePath, file.fileName))
    .write(file.content, "utf8")
    .end("\n");
});
