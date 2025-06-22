---
title: 'Git 清空分支内容'
author: 'Lucas Liu'
description: '老项目不想要了，想重头来过但又不想另起项目怎么办'
pubDate: 2025-06-23
tags: ['git']
---

## 前言

当你想要推倒项目重头开始，但是不想新建项目，只想清空分支内容时，可以使用以下方法。

## 步骤

1. 首先，创建并切换到新的分支。使用命令 `git checkout -b 新分支名` 创建并切换到新分支，例如 `git checkout -b new_branch`。
2. 然后，使用命令 `rm -rf 目录名` 删除 `node_modules` 文件夹和 `dist` 等被git忽略的文件夹或文件，否则接下来的删除操作会删除 .gitignore 文件并会把它们遗留下来，导致 git 开始追踪这些文件。
3. 接下来，使用命令 `git rm -rf .` 删除当前分支下的所有文件。这个命令会删除当前分支下的所有被追踪的文件，但是历史提交记录不会被删除。
4. 然后，使用命令 `git commit -m "清空分支内容"` 将删除操作提交到 Git 中。
5. 最后，使用命令 `git push origin new_branch` 将新分支推送到远程仓库。

当新分支中的项目重建完成后，就可以使用 `git merge` 命令将新分支合并到主分支中。
