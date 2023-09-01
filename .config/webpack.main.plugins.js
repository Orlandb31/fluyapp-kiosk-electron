const CopyPlugin = require('copy-webpack-plugin')

module.exports = [
    new CopyPlugin({
        patterns: [
            { from: "node_modules/electron-pos-printer/dist/renderer/renderer.js", to: "./renderer/renderer.js" },
            { from: 'node_modules/electron-pos-printer/dist/renderer/index.html', to: './renderer/index.html' },
            { from: 'node_modules/electron-pos-printer/dist/renderer/renderer.min.css', to: './renderer/renderer.min.css' },
            { from: 'node_modules/qrcode/node_modules/', to: './renderer/node_modules/' },
            { from: 'node_modules/qrcode/', to: './renderer/node_modules/qrcode/' },
            { from: 'node_modules/encode-utf8/', to: './renderer/node_modules/encode-utf8/' },
            { from: 'node_modules/dijkstrajs/', to: './renderer/node_modules/dijkstrajs/' },
            { from: 'node_modules/jsbarcode/', to: './renderer/node_modules/jsbarcode/' },
        ]
    })];
