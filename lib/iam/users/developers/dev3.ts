import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { DevelopersGroup } from '../../groups/devops_group';

export class Dev3 {
    public readonly user: iam.User;

    constructor(scope: Construct, passwordSecert: secretsmanager.ISecret) {
        this.user = new iam.User(scope, 'Dev3', {
            userName: 'dev3',
            password: passwordSecert.secretValue,
            passwordResetRequired: true,
        });

        const developerGroup = new DevelopersGroup(scope, 'DeveloperGroup');

        developerGroup.devopsGroup.addUser(this.user);

        cdk.Tags.of(this.user).add('Environment', 'Developers');
        cdk.Tags.of(this.user).add('Created', 'Jeff');
    }
}
