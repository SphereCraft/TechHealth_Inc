import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class RDSSecurityGroup extends ec2.SecurityGroup {
    constructor(scope: Construct, id: string, props: { vpc:ec2.Vpc, ec2SecurityGroup: ec2.ISecurityGroup }) {
        super(scope, id, {
            vpc: props.vpc,
            allowAllOutbound: true,
            securityGroupName: 'TechHealthInc-RDS-SecurityGroup',
        });
        this.addIngressRule(
            props.ec2SecurityGroup,
            ec2.Port.tcp(3306),
            'Allow connections from EC2 to RDS'
        );
    }
}
