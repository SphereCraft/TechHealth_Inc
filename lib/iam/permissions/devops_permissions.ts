import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface DeveloperPermissionProps extends cdk.StackProps {
    group: iam.Group;
}

export class DeveloperPermissionStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: DeveloperPermissionProps) {
        super(scope, id, props);

        const devPolicy = new iam.ManagedPolicy(this, 'DevPolicy', {
            managedPolicyName: 'DeveloperAccessPolicy',
            statements: [
                new iam.PolicyStatement({
                    actions: [
                        's3:*',
                        'rds:*',
                    ],
                resources: ['*'],
                }),
            ],
        });

        cdk.Tags.of(devPolicy).add('Environment', 'Full Access');
        cdk.Tags.of(devPolicy).add('Created', 'Jeff');

        props.group.addManagedPolicy(devPolicy);
    }
}
