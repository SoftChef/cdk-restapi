const { AwsCdkConstructLibrary, NpmAccess } = require('projen');

const project = new AwsCdkConstructLibrary({
  author: 'softchef-iot-lab',
  authorEmail: 'poke@softchef.com',
  npmAccess: NpmAccess.PUBLIC,
  cdkVersion: '1.107.0',
  projenVersion: '0.20.11',
  initialVersion: '1.0.0',
  releaseBranches: ['main'],
  defaultReleaseBranch: 'main',
  dependabot: false,
  jsiiFqn: 'projen.AwsCdkConstructLibrary',
  name: '@softchef/cdk-restapi',
  repositoryUrl: 'https://github.com/softchef/cdk-restapi.git',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-apigateway',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-lambda-nodejs',
  ],
  devDeps: [
    '@aws-cdk/assert',
  ],
  keywords: [
    'cdk',
    'restapi',
  ],
  testdir: 'src/__tests__',
  mergify: false,
});

project.synth();
