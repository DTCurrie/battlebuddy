const appPackage = require('./package.json');

const reactTransitionGroupVersion = appPackage.dependencies['react-transition-group'];

function readPackage(pkg, context) {
  const updatedPkg = pkg;

  if (updatedPkg.name === 'reactstrap' || updatedPkg.name === 'react-notifications') {
    const old = updatedPkg.dependencies['react-transition-group'];
    updatedPkg.dependencies['react-transition-group'] = reactTransitionGroupVersion;
    context.log(
      `react-transition-group@${old} => react-transtion-group@${reactTransitionGroupVersion} in dependencies of ${updatedPkg.name}`
    );
  }

  return updatedPkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
