---
title: '替换历史提交中的用户名和邮箱'
author: 'Lucas Liu'
description: '不小心把工作邮箱提交到GitHub怎么办'
pubDate: 2025-06-11
tags: ['git']
---

在代码目录创建 replace.sh 并复制下面的脚本：

```bash
# !/bin/sh

git filter-branch --env-filter '

OLD_EMAIL="旧邮箱"
CORRECT_NAME="新用户名"
CORRECT_EMAIL="新邮箱"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]

then

    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"

fi

if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]

then

    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"

fi

' --tag-name-filter cat -- --branches --tags
```

修改其中的 `旧邮箱`、`新用户名`、`新邮箱` 为你想要替换的内容，执行 `sh replace.sh` 完成替换

最后检查是否还有旧邮箱：

```bash
# 先清理本地原始备份引用
git for-each-ref --format="%(refname)" refs/original/ | xargs -n 1 git update-ref -d

# 检查是否还有旧用户名
git log --all --pretty=format:"%h %an %ae" | grep "$OLD_EMAIL"
```