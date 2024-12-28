import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class VPCStack extends cdk.Stack {
    public readonly vpc: ec2.Vpc;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.vpc = new ec2.Vpc(this, 'TechHealthVpc', {
            maxAzs: 2,
            subnetConfiguration: [
                {
                    subnetType: ec2.SubnetType.PUBLIC,
                    name: 'PublicSubnet',
                    cidrMask: 24,
                },
                {
                    subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
                    name: 'PrivateIsolated',
                    cidrMask: 24,
                },
            ]
        });

        cdk.Tags.of(this).add('Purpose', 'VPC');
        cdk.Tags.of(this).add('ManagedBy', 'CDK');

        new cdk.CfnOutput(this, 'VpcId', {
            value: this.vpc.vpcId,
            description: 'The VPC ID'
        });
    }
}
