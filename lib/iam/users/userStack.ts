import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export interface UserNameProps extends cdk.StackProps {
    users: string[];
    group?: iam.Group;
}

export class userNameStack extends cdk.Stack {
    public readonly users: iam.User[];

    constructor(scope: Construct, id: string, props: UserNameProps) {
        super(scope, id, props);

        const { users: userNames, group } = props;

        const passwordSecret = new secretsmanager.Secret(this, 'PasswordSecret', {
            secretName: 'user-passwords',
            generateSecretString: {
                secretStringTemplate: JSON.stringify({}),
                generateStringKey: 'password',
                passwordLength: 16,
                excludePunctuation: true,
            },
        });

        this.users = userNames.map((userName) => {
            const user = new iam.User(this, `User-${userName}`, {
                userName,
                password: passwordSecret.secretValueFromJson('password'),
                passwordResetRequired: true,
            });

            if (group) {
                group.addUser(user);
            }

            cdk.Tags.of(user).add('Environment', 'Development');
            cdk.Tags.of(user).add('CreatedBy', 'UserNameStack');

            return user;
        });
    }
}
