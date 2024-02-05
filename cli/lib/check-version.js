const { pkgRaw, versionCompare } = require('./utils')
const pkg = require('../package.json')

const registry='https://registry.npmjs.org/';

module.exports = () => pkgRaw( pkg.name, registry ).then(raw => {

  const latest = raw['dist-tags'] && raw['dist-tags'].latest
  if (latest && versionCompare(pkg.version, '>=', latest)) return

  console.log(`
    New version of diudiu-cli available ${pkg.version} -> ${latest}
    Run the following command to update
    > npm i ${pkg.name} -g --registry=${registry}
  `)
}).catch( err => console.log(err) )