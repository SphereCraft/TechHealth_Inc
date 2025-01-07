import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface DevelopersGroupProps {
    developersPolicy: iam.IManagedPolicy;
}

export class DevelopersGroup extends Construct {
    public readonly devopsGroup: iam.IGroup;

    constructor(scope: Construct, id: string, props: DevelopersGroupProps) {
        super(scope, id);

        this.devopsGroup = new iam.Group(this, 'DevopsGroup', {
            groupName: 'DevelopersGroup',
            managedPolicies: [props.developersPolicy],
        });
    }
}
