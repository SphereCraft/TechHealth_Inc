![Project brief](./lib/docs/brief.md)

![Basic architecture for this project.](./lib/docs/TechHealth_Inc.drawio.png)

We will also implement an IAM infrastructure with security protocols in place for adding and removing staff
as and when needed. There is no information who or how many staff are required within this infrastructure, so for now will give principle of least
privilege to one group with read only access and one group with full access to the RDS for addition of client details and full S3 access for adding the main
app and any developments. After this discussions can be made with the company during and after implementation of what requirements are needed.

# Initial Steps
    Secure AWS account and make secure 'admim' account via console
    Using CDK with Typescript to implement the following
        Set up IAM groups and permissions
        Create VPC
        Create Private and public subnets in 2 Available Zones
        Add S3 to public subnets
        RDS to private subnets
        Allow connections from RDS to S3
