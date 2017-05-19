# Health Blockchain

:warning: WORK IN PROGRESS

## Overview

A blockchain for fitness data demo.

Blockchain is first and foremost about a peer to peer exchange of value. The following demonstration reviews the exchange of an individual's fitness/workout data for various rewards from organizations they interact with.

In the demo, the workout/health data never leaves the person's phone. The person accepts a fitness challenge from an organization, and each time their workout matches the challenge criteria, it is recorded as a transaction in a block. 

During the demo, we will view what the individual sees, what a network administrator sees, and what the organization sees. We look behind the scenes at the blockchain fabric where fitness challenge data exists and explore the tenets of: 

    * Shared ledger [ participants only see transactions they're entitled to see ]
    * Trust [ endorsements, assets ]
    * Privacy [ anonymity ]
    * Smart contract [ verifiable, queryable, searchable, encrypted ]

## Prerequisites

* IBM Bluemix account. [Sign up][bluemix_signup_url] for Bluemix, or use an existing account.
* Node.js >= 6.9.1

## Deploying the app automatically in Bluemix

The app comes with a toolchain you can use to deploy the solution with few clicks. If you want to deploy it manually, you can skip this section.

1. **Ensure your organization has enough quota for one web application using 256MB of memory and 2 services.**

1. Click ***Deploy to Bluemix*** to start the Bluemix DevOps wizard:

   [![Deploy To Bluemix](https://console.ng.bluemix.net/devops/graphics/create_toolchain_button.png)](https://console.ng.bluemix.net/devops/setup/deploy/?repository=https://github.com/IBM-Bluemix/health-blockchain&branch=master)

1. Select the **GitHub** box.

1. Decide whether you want to fork/clone the app repository.

1. If you decide to Clone, set a name for your GitHub repository.

1. Select the **Delivery Pipeline** box.

1. Select the region, organization and space where you want to deploy the app.

1. Click **Create**.

1. Select the Delivery Pipeline.

1. Wait for the Deploy job to complete.

1. Access the app when it's ready and start uploading videos and images!

## Run the app locally

1. [Install Node.js][]
+ cd into this project's root directory
+ Run `npm install` to install the app's dependencies
+ Run `npm start` to start the app
+ Access the running app in a browser at <http://localhost:6001>

[Install Node.js]: https://nodejs.org/en/download/

## License

See [License.txt](License.txt) for license information.

[bluemix_signup_url]: https://console.ng.bluemix.net/?cm_mmc=GitHubReadMe
