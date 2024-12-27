import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface UserPermissionProps extends cdk.StackProps {
    group: iam.Group;
}

export class UserPermissionStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: UserPermissionProps) {
        super(scope, id, props);

        const userPolicy = new iam.ManagedPolicy(this, 'UserPolicy', {
            managedPolicyName: 'UserAccessPolicy',
            statements: [
                new iam.PolicyStatement({
                    actions: [
                        "rds:DescribeDBInstances",
                        "rds:DescribeDBClusters",
                        "rds:DescribeDBSnapshots",
                        "rds:DescribeDBClusterSnapshots",
                        "rds:ListTagsForResource"
                        ],
                    resources: ['*'],
                }),
            ],
        });

        cdk.Tags.of(userPolicy).add('Environment', 'Users');
        cdk.Tags.of(userPolicy).add('Created', 'Jeff');

        props.group.addManagedPolicy(userPolicy);
    }
}
