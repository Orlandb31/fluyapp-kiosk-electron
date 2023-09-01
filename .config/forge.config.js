const path = require("path");
const package = require("../package.json");
require("dotenv").config();

const packageAssetsPath = path.join(__dirname, "..", "assets", "package");

module.exports = {
  electronRebuildConfig: {
    forceABI: 89,
  },
  packagerConfig: {
    asar: true,
  },
  /* publishers: [
    {
      name: "@electron-forge/publisher-bitbucket",
      config: {
        owner: "orlando@getxplor.com",
        name: "fluyapp-kiosk-electron",
        branch: "orlando_dev", // Nombre de la rama de publicación
      },
      auth: {
        username: process.env.BITBUCKET_USERNAME,
        password: process.env.BITBUCKET_PASSWORD,
      },
    },
  ], */
   publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'Orlandb31',
          name: 'fluyapp-kiosk-electron'
        },
        prerelease: true
      }
    }
  ],


  makers: [
    // https://www.electronforge.io/config/makers

    {
      name: "@electron-forge/maker-squirrel",
      config: {
        // https://js.electronforge.io/maker/squirrel/interfaces/makersquirrelconfig
        setupExe: "Fluyapp-Kiosk.exe",
        iconUrl:
          "https://raw.githubusercontent.com/saucesteals/electron-typescript-react-tailwind-redux/main/assets/package/icons/win/icon.ico",
        setupIcon: path.join(packageAssetsPath, "icons", "win", "icon.ico"),
        authors: "saucesteals & fourwadu",
        loadingGif: path.join(packageAssetsPath, "loading.gif"),
        squirrelInstallerOptions: {
          "--installdir": "C:\\Program Files\\Fluyapp-Kiosk",
        },
        signingCertificateFile: "banconal3.pfx", // Ruta al certificado
        signingPassword: "6%03Iy4CgSznb*e!",
      },
    },
    // You can only build the DMG target on macOS machines.
    {
      name: "@electron-forge/maker-dmg",
      config: {
        // https://js.electronforge.io/maker/dmg/interfaces/makerdmgconfig
        icon: path.join(packageAssetsPath, "icons", "mac", "icon.icns"),
        background: path.join(packageAssetsPath, "source.png"),
        overwrite: true,
        name: "electron-boilerplate", // NEEDS TO BE SHORTER THAN 27 CHARACTERS
      },
    },

    {
      name: "@electron-forge/maker-deb",
      config: {
        // https://js.electronforge.io/maker/deb/interfaces/makerdebconfig
        icon: path.join(packageAssetsPath, "icons", "png", "1024x1024.png"),
      },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-webpack",
      config: {
        mainConfig: "./.config/webpack.main.config.js",
        renderer: {
          config: "./.config/webpack.renderer.config.js",
          entryPoints: [
            {
              html: "./src/render/index.html",
              js: "./src/renderer.ts",
              name: "main_window",
              preload: {
                js: "./src/preload.ts",
              },
            },
          ],
        },
      },
    },
  ],
};
