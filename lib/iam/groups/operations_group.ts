import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface OperationsGroupProps {
    operationsPolicy: iam.IManagedPolicy;
}

export class OperationsGroup extends Construct {
    public readonly opsGroup: iam.IGroup;

    constructor(scope: Construct, id: string, props: OperationsGroupProps) {
        super(scope, id);

        this.opsGroup = new iam.Group(this, 'OpsGroup', {
            groupName: 'OperationsGroup',
            managedPolicies: [props.operationsPolicy],
        });
    }
} 
