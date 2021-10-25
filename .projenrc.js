const { AwsCdkConstructLibrary, NpmAccess } = require('projen');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new AwsCdkConstructLibrary({
  author: 'SoftChef',
  authorEmail: 'poke@softchef.com',
  authorUrl: 'https://www.softchef.com',
  authorOrganization: true,
  npmAccess: NpmAccess.PUBLIC,
  cdkVersion: '1.95.2',
  defaultReleaseBranch: 'main',
  name: '@softchef/cdk-restapi',
  description: 'Easy to manage Rest-API',
  repositoryUrl: 'https://github.com/softchef/cdk-restapi.git',
  minNodeVersion: '12.7.0',
  workflowNodeVersion: '12.13.0',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-apigateway',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-lambda-nodejs',
    '@aws-cdk/aws-cognito',
  ],
  depsUpgradeOptions: {
    ignoreProjen: false,
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
