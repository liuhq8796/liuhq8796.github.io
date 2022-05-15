# liuhq8796.github.io

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### unplugin-vue-components

看 Issues 说 GlobalComponents 在 "@vue/runtime-core" 下才有效，但我这里不行，改回 "vue"

https://github.com/johnsoncodehk/volar/issues/807

https://github.com/antfu/unplugin-vue-components/issues/343

#### 20220425 更新：

过了这么久都没人发现，antfu 大神也正常地在用，没有我这个匹配不到的问题。思考了一下，好像在 antfu 直播的时候瞥到一眼他的 .npmrc 配置，里面只有一行配置，还有点眼熟，好像是 pnpm 的某项配置。于是上大神的项目上看一眼，在 vitesse 项目里的 .npmrc 中找到了这个：`shamefully-hoist=true`。把里面的配置拿到 pnpm 文档一查，是一种依赖提升相关的配置，描述是“如果某些工具仅在提升的依赖项位于根目录的 node_modules 时才有效，您可以将其设置为 true 来为您提升它们。”

于是在项目里新建了一个 .npmrc 文件，把这行配置抄上，重装一遍依赖，WDNMD 有效了！我哭了 5555

https://pnpm.io/zh/npmrc#shamefully-hoist

```sh
# .npmrc
shamefully-hoist=true
```
