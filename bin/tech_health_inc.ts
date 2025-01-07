#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { userNameStack } from '../lib/iam/users/user_stack';
import { UserGroupStack } from '../lib/iam/groups/user_group';
import { UserPermissionStack } from '../lib/iam/permissions/user_permissions';
import { DeveloperGroupStack } from '../lib/iam/groups/devops_group';
import { DeveloperPermissionStack } from '../lib/iam/permissions/devops_permissions';
import { VPCStack } from '../lib/constructs/vpc_stack';

const app = new cdk.App();
const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
};
const techUserStack = new userNameStack(app, 'TechUserStack', {
    env,
    users: ['user1', 'user2', 'user3', 'user4']
});
const techGroupStack = new UserGroupStack(app, 'UserGroupStack', {
    env,
    users: techUserStack.users
});
new UserPermissionStack(app, 'UserPermissionStack', {
    env,
    group: techGroupStack.userGroup
});
const devUserStack = new userNameStack(app, 'DevUserStack', {
    env,
    users: ['Developer1', 'Develpoer2', 'Develpoer3', 'Developer4']
}) ;
const devGroupStack = new DeveloperGroupStack(app, 'DevGroupStack', {
    env,
    users: devUserStack.users
});
new DeveloperPermissionStack(app, 'DevPermissionStack', {
    env,
    group: devGroupStack.devGroup
});
new VPCStack(app,'')
