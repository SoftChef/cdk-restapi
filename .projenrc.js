const { AwsCdkConstructLibrary, NpmAccess } = require('projen');

const project = new AwsCdkConstructLibrary({
  author: 'softchef-iot-lab',
  authorEmail: 'poke@softchef.com',
  npmAccess: NpmAccess.PUBLIC,
  cdkVersion: '1.114.0',
  projenVersion: '0.27.6',
  initialVersion: '1.0.0',
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
    '@aws-cdk/aws-cognito',
  ],
  keywords: [
    'cdk',
    'restapi',
  ],
  testdir: 'src/__tests__',
  gitignore: [
    'src/**/dist',
  ],
  mergify: false,
});

project.synth();
