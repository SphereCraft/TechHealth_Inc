import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import { Construct } from 'constructs';
import { RDSSecurityGroup } from './rds_security_group';
import { EC2SecurityGroup } from '../ec2/ec2_security_group';

export class RDSStack extends cdk.Stack {
    public readonly rdsInstance: rds.DatabaseInstance;

    constructor(
        scope: Construct,
        id: string,
        props: cdk.StackProps & { vpc: ec2.Vpc; ec2SecurityGroup: ec2.ISecurityGroup }
    ) {
        super(scope, id, props);

        const rdsSecurityGroup = new RDSSecurityGroup(this, 'RDSSecurityGroup', {
            vpc: props.vpc,
            ec2SecurityGroup: props.ec2SecurityGroup,
        });

        this.rdsInstance = new rds.DatabaseInstance(this, 'TechHealthRDS', {
            vpc: props.vpc,
            engine: rds.DatabaseInstanceEngine.mysql({ version: rds.MysqlEngineVersion.VER_8_0_33 }),
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
            credentials: rds.Credentials.fromGeneratedSecret('admin'),
            multiAz: false,
            allocatedStorage: 20,
            storageType: rds.StorageType.GP2,
            vpcSubnets: {
                subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
            },
            securityGroups: [rdsSecurityGroup],
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });
        new cdk.CfnOutput(this, 'RDSInstanceEndPoint', {
            value: this.rdsInstance.dbInstanceEndpointAddress,
            description: 'The RDS instance endpoint address',
        });
        new cdk.CfnOutput(this, 'RDSInstanceSecret', {
            value: this.rdsInstance.secret!.secretName,
            description: 'The secret name for the RDS admin credentials',
        });

    }
}
