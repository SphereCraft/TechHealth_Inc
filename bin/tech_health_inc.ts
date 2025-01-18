#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { IamStack } from '../lib/iam/iam-stack';
import { VPCStack } from '../lib/constructs/vpc/vpc_stack';
import { EC2Stack } from '../lib/constructs/ec2/ec2_stack';
import { RDSStack } from '../lib/constructs/rds/rds_stack';

const app = new cdk.App();

new IamStack(app, 'IamStack', {
    appName: 'TechHealthInc',
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
});

const vpcStack = new VPCStack(app, 'VPCStack');

const ec2Stack = new EC2Stack(app, 'EC2Stack', {
    vpc: vpcStack.vpc,
});

new RDSStack(app, 'RDSStack', {
    vpc: vpcStack.vpc,
    ec2SecurityGroup: ec2Stack.ec2SecurityGroup,
});

    app.synth();
