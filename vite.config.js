import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import qiankun from 'vite-plugin-qiankun'
import { join } from 'path'

/** build 时静态资源根：来自 VITE_DEPLOY_CDN_HOST（主机名或完整 https:// 前缀） */
function resolveDeployCdnOrigin(env) {
  const raw = (env.VITE_DEPLOY_CDN_HOST || 'aigc.cuteshell.com').trim().replace(/\/$/, '')
  if (/^https?:\/\//i.test(raw)) return raw
  return `https://${raw}`
}

function stripEnvQuotes(v) {
  if (v == null || v === '') return ''
  const s = String(v).trim()
  if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
    return s.slice(1, -1).trim()
  }
  return s
}

/** Qiankun 子应用名 / 资源 base 路径段：优先 VITE_SUB_APP_NAME，否则 portal/rd/{VITE_OBAAS_INSTANCE_ID} */
function resolveQiankunAppName(env) {
  const explicit = stripEnvQuotes(env.VITE_SUB_APP_NAME)
  if (explicit) return explicit
  const instanceId = stripEnvQuotes(env.VITE_OBAAS_INSTANCE_ID)
  if (instanceId) return `portal/rd/${instanceId}`
  return require('./package.json').name
}

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const name = resolveQiankunAppName(env)
  const deployOrigin = resolveDeployCdnOrigin(env)
  const baseMap = {
    development: `/${name}/`,
    test: `${deployOrigin}/${name}/`,
    pre: `${deployOrigin}/${name}/`,
    prod: `${deployOrigin}/${name}/`
  }

  const default_config = {
    base: command === 'serve' ? './' : baseMap[env.VITE_NODE_ENV],
    define: {
      'process.env.COMMAND': `"${command}"`, // serve：本地(vite) build：打包(vite build)
      'import.meta.env.VITE_SUB_APP_NAME': JSON.stringify(name)
    },
    build: {
      sourcemap: false // 开启sourceMap
    },
    server: {
      // 须与平台 Traefik 一致：instances 将 preview-* 路由到 dev 容器 :5173（见 getDevSandboxTraefikLabels）
      host: '0.0.0.0',
      origin: 'http://localhost:5173',
      port: 5173,
      allowedHosts: true,
      // pnpm store-dir 若在项目下（如 .pnpm-store），文件极多；默认 watch 不忽略，会占满 inotify
      watch: { ignored: ['**/.pnpm-store/**'] },
      proxy: {
        '/api': {
          target: 'https://d-wbench.haier.net',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '/api'
          }
        }
      },
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    },
    resolve: {
      extensions: ['.vue', '.js', '.json', '.mjs'],
      alias: {
        '@': join(__dirname, 'src')
      }
    },
    plugins: [
      vue(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false // css in js
          })
        ]
      })
    ],
    optimizeDeps: {
      include: [
        'vue',
        'pinia',
        'echarts',
        'vue-router',
        'vite-plugin-qiankun',
        'lodash.clonedeep',
        'lodash.debounce',
        'lodash.get',
        'lodash.isequal',
        'lodash.throttle'
      ],
      exclude: ['cheerio']
    }
  }

  console.log('🔥🔥🔥')
  console.log('web_config')
  return { ...default_config, ...web_config(default_config, name) }
})

function web_config(default_config, name) {
  return {
    plugins: [
      ...default_config.plugins,
      ...[
        // 接入qiankun
        qiankun(name, {
          useDevMode: true
        })
      ]
    ],
    build: {
      ...default_config.build,
      rollupOptions: {
        ...default_config.build.rollupOptions
      }
    }
  }
}
