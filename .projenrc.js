const { awscdk } = require('projen');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'SoftChef',
  authorEmail: 'poke@softchef.com',
  authorUrl: 'https://www.softchef.com',
  authorOrganization: true,
  cdkVersion: '1.73.0',
  defaultReleaseBranch: 'main',
  name: '@softchef/cdk-restapi',
  description: 'Easy to manage Rest-API',
  repositoryUrl: 'https://github.com/softchef/cdk-restapi.git',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-apigateway',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-lambda-nodejs',
    '@aws-cdk/aws-cognito',
  ],
  depsUpgradeOptions: {
    ignoreProjen: true,
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      secret: AUTOMATION_TOKEN,
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['MinCheTsai'],
  },
  keywords: [
    'cdk',
    'restapi',
  ],
  testdir: 'src/__tests__',
  gitignore: [
    'src/**/dist',
  ],
});

project.synth();
