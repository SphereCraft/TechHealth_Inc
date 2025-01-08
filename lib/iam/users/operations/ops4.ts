import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { OperationsGroup } from '../../groups/operations_group';

export class Ops4 {
    public readonly user: iam.User;

    constructor(scope: Construct, passwordSecert: secretsmanager.ISecret) {
        this.user = new iam.User(scope, 'Ops4', {
            userName: 'ops4',
            password: passwordSecert.secretValue,
            passwordResetRequired: true,
        });

        const operationsGroup = new OperationsGroup(scope, 'OperationsGroup');

        operationsGroup.opsGroup.addUser(this.user);

        cdk.Tags.of(this.user).add('Environment', 'Operations');
        cdk.Tags.of(this.user).add('Created', 'Jeff');
    }
}
