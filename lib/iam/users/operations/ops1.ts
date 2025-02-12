import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { OperationsGroup } from '../../groups/operations_group';

export class Ops1 {
    public readonly user: iam.User;

    constructor(scope: Construct, passwordSecert: secretsmanager.ISecret) {
        this.user = new iam.User(scope, 'Ops1', {
            userName: 'ops1',
            password: passwordSecert.secretValue,
            passwordResetRequired: true,
        });

        const operationsGroup = new OperationsGroup(scope, 'OperationsGroupOps1');

        operationsGroup.opsGroup.addUser(this.user);

        cdk.Tags.of(this.user).add('Environment', 'Operations');
        cdk.Tags.of(this.user).add('Created', 'Jeff');
    }
}
