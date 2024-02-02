export default {
  // 对于 js、ts 脚本文件，应用 eslint
  '**/*.{js,jsx,tsx,ts}': [
    'eslint --fix',
  ],
  // Vue 文件由于同时包含模板、样式、脚本，因此将来 eslint、stylelint 可能都要使用
  '**/*.vue': [
    'eslint --fix',
  ],
}
