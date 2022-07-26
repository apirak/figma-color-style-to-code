# Color Style to Code

## Development guide

### Pre-requisites

- [Node.js](https://nodejs.org) – v14
- [Figma desktop app](https://figma.com/downloads/)

### Build the plugin

To build the plugin:

```
$ npm run build
```

This will generate a [`manifest.json`](https://figma.com/plugin-docs/manifest/)
file and a `build/` directory containing the JavaScript bundle(s) for the
plugin.

To watch for code changes and rebuild the plugin automatically:

```
$ npm run watch
```

To test for code changes automatically:

```
$ npm run test
```

### Install plugin (development)

1. In the Figma desktop app, open a Figma document.
2. Search for and run `Import plugin from manifest…` via the Quick Actions
   search bar.
3. Select the `manifest.json` file that was generated by the `build` or `watch`
   script.

### Install plugin (production)

https://www.figma.com/community/plugin/1133786619016585355
