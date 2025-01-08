#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { IamStack } from '../lib/iam/iam-stack';

const app = new cdk.App();

new IamStack(app, 'IamStack', {
    appName: 'TechHealthInc',
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
});
    app.synth();
