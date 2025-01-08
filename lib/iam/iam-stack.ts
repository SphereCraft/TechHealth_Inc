import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { DevelopersGroup } from './groups/devops_group';
import { OperationsGroup } from './groups/operations_group';
import { Dev1 } from './users/developers/dev1';
import { Dev2 } from './users/developers/dev2';
import { Dev3 } from './users/developers/dev3';
import { Dev4 } from './users/developers/dev4';
import { Ops1 } from './users/operations/ops1';
import { Ops2 } from './users/operations/ops2';
import { Ops3 } from './users/operations/ops3';
import { Ops4 } from './users/operations/ops4';

export interface IamStackProps extends cdk.StackProps {
    appName: string;
}

export class IamStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: IamStackProps) {
        super(scope, id, props);

        const passwordSecret = new secretsmanager.Secret(this, 'passwordSecert', {
            secretName: 'user-passwords',
            generateSecretString: {
                secretStringTemplate: JSON.stringify({}),
                generateStringKey: 'password',
                passwordLength: 16,
                excludePunctuation: true,
            },
        });

        const developersGroup = new DevelopersGroup(this, 'DevelopersGroup');
        const operationsGroup = new OperationsGroup(this, 'OperationsGroup');

        const dev1 = new Dev1(this, passwordSecret);
        developersGroup.devopsGroup.addUser(dev1.user);
        const dev2 = new Dev2(this, passwordSecret);
        developersGroup.devopsGroup.addUser(dev2.user);
        const dev3 = new Dev3(this, passwordSecret);
        developersGroup.devopsGroup.addUser(dev3.user);
        const dev4 = new Dev4(this, passwordSecret);
        developersGroup.devopsGroup.addUser(dev4.user);

        const ops1 = new Ops1(this, passwordSecret);
        operationsGroup.opsGroup.addUser(ops1.user);
        const ops2 = new Ops2(this, passwordSecret);
        operationsGroup.opsGroup.addUser(ops2.user);
        const ops3 = new Ops3(this, passwordSecret);
        operationsGroup.opsGroup.addUser(ops3.user);
        const ops4 = new Ops4(this, passwordSecret);
        operationsGroup.opsGroup.addUser(ops4.user);

        cdk.Tags.of(this).add('Purpose', 'IAM');
        cdk.Tags.of(this).add('Created', 'Jeff');
    }
}
