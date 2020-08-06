module.exports = {
  hooks: {
    readPackage,
  },
};

function readPackage(pkg, context) {
  if (pkg.name === 'reactstrap') {
    pkg.dependencies['react-transition-group'] = '4.4.1';
  }

  return pkg;
}
