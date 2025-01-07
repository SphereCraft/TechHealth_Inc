import * as iam from 'aws-cdk-lib/aws-iam';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export class Dev1 {
    public readonly user: iam.User;

    constructor(scope: Construct, passwordSecert: secretsmanager.ISecret) {
        
    }
}
