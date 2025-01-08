import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DevelopersPolicy } from '../policies/devops_policies';

export class DevelopersGroup extends Construct {
    public readonly devopsGroup: iam.Group;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.devopsGroup = new iam.Group(this, 'DevopsGroup', {
        groupName: 'DevelopersGroup',
        });

        const developerPolicy = new DevelopersPolicy(this, 'DeveloperPolicy');

        developerPolicy.policy.attachToGroup(this.devopsGroup);

        cdk.Tags.of(this).add('Environment', 'Developers');
        cdk.Tags.of(this).add('Created', 'Jeff');
    }
}
