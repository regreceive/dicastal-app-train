import fs from 'fs';
import path from 'path';
import { defineConfig } from 'umi';
import zhCN from 'antd/lib/locale/zh_CN';
import routes from './router';
import proxy from './proxy';

export default defineConfig({
  title: 'app',
  fastRefresh: {},
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {
    config: {
      locale: zhCN,
    },
  },
  base: '/app/',
  history: { type: 'hash' }, // 这里设置的同时，也要设置umi-plugins/k2-portal-history/historyContent.ts
  define: runtimeEnv(),
  publicPath: './', // 打包后./umi.js，而不是/umi.js
  hash: true,
  routes,
  externals: {
    echarts: 'window.echarts',
  },
  copy: [
    'headScript.js',
    'develop.js',
    'node_modules/echarts/dist/echarts.min.js',
  ],
  headScripts: [{ src: 'headScript.js' }, { src: 'echarts.min.js' }],
  plugins: ['./src/umi-plugins/k2-portal-history'],
  ignoreMomentLocale: true,
  proxy: proxy[(process.env.REACT_APP_ENV as 'dev') || 'dev'],
});

// 提取图朴引用的js库名称
function extractJS() {
  const set = new Set();
  const filePath = path.resolve(__dirname, '../ht/storage');
  try {
    const files = fs.readdirSync(filePath);

    files.forEach((filename) => {
      try {
        if (filename.endsWith('.html')) {
          const content = fs.readFileSync(
            path.join(filePath, filename),
            'utf-8',
          );
          const matches = content.match(/\.\.\/libs\/ht-\w+\.js/g);
          if (Array.isArray(matches)) {
            matches.forEach((row) => {
              set.add(row.match(/ht-\w+\.js/)?.[0]);
            });
          }
        }
      } catch (err) {
        console.warn('获取文件图朴html的stats失败');
      }
    });
  } catch (e) {
    console.warn('没有找到输出文件');
    return [];
  }
  const libs = Array.from(set);
  return libs.length > 0 ? ['ht.js', ...libs] : [];
}

function runtimeEnv() {
  const match = /^RUNTIME_/;
  return Object.keys(process.env)
    .filter((key) => match.test(key))
    .reduce(
      (prev, curr) => ({
        ...prev,
        ['window.env.' + curr]: process.env[curr],
      }),
      {},
    );
}
