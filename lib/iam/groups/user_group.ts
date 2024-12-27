import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface UserGroupProps extends cdk.StackProps {
    users: iam.User[];
}

export class UserGroupStack extends cdk.Stack {
    public readonly userGroup: iam.Group;

    constructor(scope: Construct, id: string, props?: UserGroupProps) {
        super(scope, id, props);

        this.userGroup = new iam.Group(this, 'UserGroup', {
            groupName: 'Users'
        });

        props?.users.forEach(user => this.userGroup.addUser(user));
    }
} 
