import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as secrectsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { AllPolicies } from './policies';
import { AllGroups } from './groups';
import { AllUsers } from './users';

export interface IamStackProps extends cdk.StackProps {

}

export class IamStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: IamStackProps) {
        super(scope, id, props);

    }
}
