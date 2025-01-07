import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class s3BucketStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const timeStamp = new Date().getTime();

        const bucket = new s3.Bucket(this, 'TechHealthBucket', {
            bucketName: `tech-health-data-${timeStamp}`,
            versioned: true,
            
        })

    }
}
