import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { DevelopersPolicy } from './devops_policies';
import { OperationsPolicy } from './operation_policies';

export interface AllPoliciesProps {

}

export class AllPolicies extends Construct {
    public readonly developersPolicy: iam.IManagedPolicy;
    public readonly operationsPolicy: iam.IManagedPolicy;

    constructor(scope: Construct, id: string, props?: AllPoliciesProps) {
        super(scope, id);

        this.developersPolicy = new DevelopersPolicy(this, 'DevelopersPolicy').policy;
        this.operationsPolicy = new OperationsPolicy(this, 'OperationsPolicy').policy;
    }
}
