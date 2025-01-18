import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { EC2SecurityGroup } from './ec2_security_group';

export class EC2Stack extends cdk.Stack {
    public readonly ec2SecurityGroup: ec2.SecurityGroup;

    constructor(scope: Construct, id: string, props: cdk.StackProps & { vpc: ec2.Vpc }) {
        super(scope, id, props);

        this.ec2SecurityGroup = new EC2SecurityGroup(this, 'EC2SecurityGroup', {
            vpc: props.vpc,
        }).ec2SecurityGroup;


        const ec2Instance = new ec2.Instance(this, 'TechHealthEC2', {
            vpc: props.vpc,
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
            machineImage: ec2.MachineImage.latestAmazonLinux2(),
            vpcSubnets: {
                subnetType: ec2.SubnetType.PUBLIC,
            },
            securityGroup: this.ec2SecurityGroup,
        });
        new cdk.CfnOutput(this, 'EC2InstanceId', {
            value: ec2Instance.instanceId,
            description: 'The EC2 instance ID'
        });
    }
}

