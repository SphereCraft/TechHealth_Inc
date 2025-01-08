import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class OperationsPolicy extends Construct {
    public readonly policy: iam.ManagedPolicy;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.policy = new iam.ManagedPolicy(this, 'Policy', {
            managedPolicyName: 'OperationsPolicy',
            description: 'Policy granting general access to RDS resources',
            statements: [
                new iam.PolicyStatement({
                    actions: [
                        'rds:DescribeDBInstances',
                        'rds:DescribeDBClusters',
                        'rds:DescribeDBSnapshots',
                        'rds:DescribeDBClusterSnapshots',
                        'rds:ListTagsForResource'
                        ],
                    resources: ['*'],
                }),
            ],
        });

        cdk.Tags.of(this).add('Environment', 'Operations');
        cdk.Tags.of(this).add('Created', 'Jeff');

    }
}
