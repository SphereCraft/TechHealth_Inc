import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class EC2SecurityGroup extends Construct {
    public readonly ec2SecurityGroup: ec2.SecurityGroup;

    constructor(scope: Construct, id: string, props: {vpc: ec2.Vpc}) {
        super(scope, id),

        this.ec2SecurityGroup = new ec2.SecurityGroup(this, 'EC2SecurityGroup', {
            vpc: props.vpc,
            allowAllOutbound: true,
            securityGroupName: 'TechHealthInc-EC2-SecurityGroup',
            description: 'Security group for EC2 instance',
        });

        this.ec2SecurityGroup.addIngressRule(
            ec2.Peer.anyIpv4(),
            ec2.Port.tcp(22),
        );

    }
}

