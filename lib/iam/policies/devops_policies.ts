import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class DevelopersPolicy extends Construct {
    public readonly policy: iam.IManagedPolicy;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.policy = new iam.ManagedPolicy(this, 'Policy', {
            managedPolicyName: 'DevelopersPolicy',
            description: 'Policy granting full access to resources',
            statements: [
                new iam.PolicyStatement({
                    actions: [
                        'ec2:*',
                        's3:*',
                        'rds:*'
                    ],
                    resources: ['*'],
                }),
            ],
        });

        cdk.Tags.of(this).add('Environment', 'Developers');
        cdk.Tags.of(this).add('Created', 'Jeff');
    }
}
