const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = function() {
  return {
    supportTS: false,
    boot: ["axios"],
    css: ["app.scss"],
    extras: ["fontawesome-v5", "roboto-font", "material-icons"],
    build: {
      vueRouterMode: "hash",
      showProgress: true,
      chainWebpack(chain) {
        chain
          .plugin("eslint-webpack-plugin")
          .use(ESLintPlugin, [{ extensions: ["js", "vue"] }]);
      }
    },
    devServer: {
      https: false,
      port: 4000,
      open: true
    },
    framework: {
      iconSet: "fontawesome-v5",
      lang: "pt-br",
      config: {},
      importStrategy: "auto",
      plugins: []
    },
    animations: "all",
    ssr: {
      pwa: false
    },
    pwa: {
      workboxPluginMode: "GenerateSW",
      workboxOptions: {},
      manifest: {
        name: `Teste prático Deliver App versão 1`,
        short_name: `Teste prático Deliver App versão 1`,
        description: `Teste prático Deliver App versão 1`,
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#027be3",
        icons: [
          {
            src: "icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    },
    cordova: {},
    capacitor: {
      hideSplashscreen: true
    },
    electron: {
      bundler: "packager",
      packager: {},
      builder: {
        appId: "deliver-app-v1"
      },
      nodeIntegration: true,
      extendWebpack() {}
    }
  };
};
