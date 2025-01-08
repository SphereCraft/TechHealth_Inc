import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { OperationsPolicy } from '../policies/operation_policies';

export class OperationsGroup extends Construct {
    public readonly opsGroup: iam.Group;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this .opsGroup = new iam.Group(this, 'OpsGroup', {
            groupName: 'OperationsGroup',
        });

        const opsPolicy = new OperationsPolicy(this, 'OperationsPolicy');

        opsPolicy.policy.attachToGroup(this.opsGroup);

        cdk.Tags.of(this).add('Environment', 'Operations');
        cdk.Tags.of(this).add('Created', 'Jeff');

    }
} 
