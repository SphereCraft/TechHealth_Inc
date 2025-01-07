import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { AllGroups } from '../groups';

export interface AllUsersProps {
    groups: AllGroups;
    passwordSecret: secretsmanager.Secret;
}

export class AllUsers extends Construct {
    public readonly users: Map<string, iam.User>;

    constructor(scope: Construct, id: string, props: AllUsersProps) {
        super(scope, id)

        this.users = new Map();
    }
}
