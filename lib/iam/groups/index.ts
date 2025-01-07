import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AllPolicies } from '../policies';
import { DevelopersGroup } from './devops_group';
import { OperationsGroup } from './operations_group';

export interface AllGroupProps {
    policies: AllPolicies;
}

export class AllGroups extends Construct {
    public readonly developersGroup: iam.IGroup;
    public readonly operationsGroup: iam.IGroup;

    constructor(scope: Construct, id: string, props: AllGroupProps){
        super(scope, id);

        this.developersGroup = new DevelopersGroup(this, 'DevelopersGroup', {
            developersPolicy: props.policies.developersPolicy,
        }).devopsGroup;
        this.operationsGroup = new OperationsGroup(this, 'OperationsGroup', {
            operationsPolicy: props.policies.operationsPolicy,
        }).opsGroup;
    }
}
