## Introduction
This is a project for learning how to use AWS Interactive video Service, IVS and its SDK, as well as using AWS cognito identity pool and user pool to setup auth. This is not a optimal setup as it should be handled by a backend server, but due to the nature of this project, I did everything from the frontend

## Deployed DEMO
Current there is no sytling setup yet, but the core functionality and infrastructure is setup. the following is the cloudfront distribution url

[ivs ui app demo](d29gm9l5e6ckn5.cloudfront.net)

to use this demo, you will need to register and confirm through email

## Run locally
this project's infra is provisioned by terraform, it is already setup to run on github action workflow. However, if you decide to run locally, install terraform

then 

```
cd terraform-infra
terraform init
terraform plan
terraform apply
```

Afterward, collect all the important ids, keys and values from terraform outputs and replace them inside the [env.example](env.example) file 

```
REACT_APP_AWS_REGION=<region>
REACT_APP_COGNITO_USER_POOL_ID=<your user pool id>
REACT_APP_COGNITO_CLIENT_ID=<your client id>
REACT_APP_COGNITO_IDENTITY_POOL_ID=<your identity pool id>
REACT_APP_STREAM_KEY=<your stream key>
REACT_APP_INGEST_ENDPOINT=<your ingestion endpoint>
REACT_APP_PLAYBACK_URL=<Your playback url>
```
then run

```
npm install
```
and finally to start the react app run 

```
npm start
```

## Github Action CICD
There are currently 2 workflows, [IVS livestream app build and deploy](.github/workflows/react_app_build_deploy.yaml) and [Build and Deploy React App](.github/workflows/react_app_build_deploy.yaml). If there are infra changes, you need to run [IVS livestream app build and deploy](.github/workflows/react_app_build_deploy.yaml) or if there is only react UI code changes, you will need to run [Build and Deploy React App](.github/workflows/react_app_build_deploy.yaml).This decouple the infra from UI and save time during deployment. 

The CICD workflow is connected to AWS through OIDC so it does not require storing AWS credentials on the secrets in action. In order to use this in your own repo, you will need to create a role for github action to access your own AWS account. You can refer [this article](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) for further information

The workflows are configured to be manually run, so you will need to trigger the workflow after you merge the code to main branch. Be sure to provide the values of the required input fileds, such as aws account id, and your s3 backend bucket name and your dynamodb backend name for terraform from run workflow dropdown.

## Bugs and improvements
There are still quite a few bugs need to be fixed
1: the playback real time video does not always turn on
2: signup and login does not redirect properly
3: need to add tailwind styles
