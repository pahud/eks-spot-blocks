const { AwsCdkConstructLibrary, DependenciesUpgradeMechanism } = require('projen');

const PROJECT_NAME = 'eks-spot-blocks';
const PROJECT_DESCRIPTION = 'A sample JSII construct lib for AWS CDK';
const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new AwsCdkConstructLibrary({
  name: PROJECT_NAME,
  cdkVersion: '1.82.0',
  description: PROJECT_DESCRIPTION,
  repository: 'https://github.com/pahud/cdk-eks-spotblocks.git',
  authorName: 'Pahud Hsieh',
  authorEmail: 'pahudnet@gmail.com',
  defaultReleaseBranch: 'main',
  keywords: [
    'cdk',
    'aws',
    'eks',
    'spot',
    'spot-blocks',
  ],
  depsUpgrade: DependenciesUpgradeMechanism.githubWorkflow({
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      secret: AUTOMATION_TOKEN,
    },
  }),
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['pahud'],
  },
  catalog: {
    twitter: 'pahudnet',
    announce: false,
  },
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-eks',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-ssm',
  ],
  python: {
    distName: 'eks-spot-blocks',
    module: 'eks_spot_blocks',
  },
});

project.package.addField('resolutions', {
  'trim-newlines': '3.0.1',
});

const common_exclude = ['cdk.out', 'cdk.context.json', 'images', 'yarn-error.log'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);


project.synth();
