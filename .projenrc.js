const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  author: 'MinCheTsai',
  authorAddress: 'minche@softchef.com',
  cdkVersion: '1.104.0',
  defaultReleaseBranch: 'main',
  jsiiFqn: 'projen.AwsCdkConstructLibrary',
  name: 'sccdk-restapi',
  repositoryUrl: 'https://github.com/softchef/sccdk-restapi.git',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-apigateway',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-lambda-nodejs',
  ],
  devDeps: [
    '@aws-cdk/assert',
  ],
  dependabot: false,
  testdir: 'src/__tests__',
  mergify: false,
});

project.synth();
