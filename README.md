<img align="center" src="https://user-images.githubusercontent.com/62233773/140636854-be8839c6-0fdb-4955-af45-01ec21556d25.png" alt="Logo" title="Shipment Log"/>

<h1>
<img src="client/public/favicon.png" alt="Logo" title="Shipment Log"/>
<strong>SHIPMENT LOG</strong>
</h1>

[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/Justinjdaniel/Shipment-Log)
<a href='/LICENSE' target='_blank'>
<img src="https://img.shields.io/apm/l/atomic-design-ui.svg" alt="Logo" title="MIT License"/></a>

**SHIPMENT LOG** is a platform for Blockchain integration in freight shipping infrastructure. This helps in 
  - Improving the security and traceability of shipments.
  - Can easily implement policies and contracts into the system.
  - Thus reduce the paperwork and will improve efficiency.
  - Widely reducing the clearance time.
  - Enables to know the progress of shipments.


## Table of contents

- [Table of contents](#table-of-contents)
- [What's included](#whats-included)
- [Features](#features)
- [Documentation](#documentation)
  - [Tech Stack](#tech-stack)
  - [Use Case](#use-case)
  - [WorkFlow Diagram](#workflow-diagram)
  - [Network](#network)
  - [Project Walk through](#project-walk-through)
  - [Run Locally](#run-locally)
    - [**Prerequisite**](#prerequisite)
    - [**Installation**](#installation)
  - [API Reference](#api-reference)
- [Running Tests](#running-tests)
  - [Used Environment](#used-environment)
  - [Testing Tool](#testing-tool)
  - [Testing Block Event](#testing-block-event)
- [Screenshots](#screenshots)
- [Authors](#authors)
- [License](#license)

## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```text
Shipment-Log/
├── client/(front-end data)
├── network/
│   ├── README.md
│   ├── requirements.yml
│   └── shipping.yml
├── server/
│   ├── lib/www
│   ├── public/(docs)
│   ├── routes/
│   |   ├── clientApp.js
│   |   ├── events.js
│   |   ├── index.js
│   |   └── profile.js
│   ├── app.js
│   ├── package-lock.json
│   └── package.json
├── smartcontract/
│   ├── lib/
│   |   └── shipment-contract.js
│   ├── private/
│   |   └── privateData.json
│   ├── test/
│   |   └── shipment-contract.js
│   ├── transaction_data/
│   |   └── shipment-transaction.txdata
│   ├── .editorconfig
│   ├── .eslintignore
│   ├── .eslintrc.js
│   ├── .gitignore
│   ├── .npmignore
│   ├── .prettierrc.js
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
├── .gitignore
├── LICENSE
└── README.md
```

## Features

- Fluid Design UI
- Animations
- Notifications
- Form Validations
- Block Events
- Tracking of Shipment
- Infotainment Tabs
- Private Data Collection 

## Documentation

### Tech Stack

  **Client:** React, NextJs, Bootstrap\
  **Server:** Node, Express

### Use Case
[Use Case Documentation](https://github.com/Justinjdaniel/Shipment-Log/files/7491926/Shipment.Log.pdf)

### WorkFlow Diagram
![Workflow](https://user-images.githubusercontent.com/62233773/140636870-f66f5d67-20bd-4bb2-8caa-1ba998df552d.png)

### Network
[Network Documentation](network/README.md)

### Project Walk through
![Walk-through](https://user-images.githubusercontent.com/62233773/140636868-89cbf788-6a95-4870-96c1-7c8aa4efaea2.png)

### Run Locally

#### **Prerequisite**

- Ansible v.2.8+
- Docker v.19.03x+
- Docker Compose
- Hyperledger Fabric Binaries And Docker Images v.1.4.7
- Golang v.1.13.3
- Node Js v.10.x
- npm v.6.x
- Visual Studio Code v.1.39
- IBM Blockchain Extension v.1.4
- Sponge
- jq

#### **Installation**

Clone the project

```bash
  git clone https://gitlab.com/Justinjdaniel/chfvb601_-shipping.git
```

Setup Network
refer [Network](#network)

| Instruction         | Server                        | Client                         |
| :------------------ | :---------------------------- | :----------------------------- |
| Go to the directory | `cd chfvb601_shipping/server` | ` cd chfvb601_shipping/client` |
| Install dependencies| `npm install`                 |`npm install`                   |
| Start               | `npm start`                   |`npm run dev`                     |

[Client Readme](client/README.md)

### API Reference

Detailed Documentations in 
```http
  http://localhost:5000/
```
| Method | API end point   | Description                   |
| :----- | :-------------- | :---------------------------- |
| POST   | `/create`       | Create a shipment             |
| GET    | `/read`         | Read shipment details         |
| POST   | `/approval`     | Add approval of shipment      |
| POST   | `/verification` | Add verification of shipment  |
| POST   | `/clearance`    | Add clearance of shipment     |
| POST   | `/receipt`      | Add receipt of shipment       |
| POST   | `/privateSend`  | Add private data of shipment  |
| GET    | `/privateCall`  | Read private data of shipment |

## Running Tests

### Used Environment

  - Machine : MacBook Pro M1
  - OS :  macOS Big Sur
  - Platforms :  x86-64, ARM64

### Testing Tool

- Visual Studio Code v.1.39
- Mocha Test Explorer

![Test](https://user-images.githubusercontent.com/62233773/140636863-a6bd395d-bcc3-490d-a9ce-8a8d096481b3.png)


### Testing Block Event

![Event](https://user-images.githubusercontent.com/62233773/140636848-30711d27-a962-40fa-b1bb-d71f8bf7fb48.png)

## Screenshots
![Welcome](https://user-images.githubusercontent.com/62233773/140636869-9bea5f2b-a2c6-4d96-b30d-dafa86adad6e.png)
![Login](https://user-images.githubusercontent.com/62233773/140636855-fc042d20-c38e-4079-b5f4-7d4ad7ca726e.png)
![Track](https://user-images.githubusercontent.com/62233773/140636867-73de2eb0-7991-4e2e-834e-beac2ae0a4e2.png)
![Info](https://user-images.githubusercontent.com/62233773/140636853-6ead350d-1e95-42bd-83ed-21604300914c.png)
![Receipt](https://user-images.githubusercontent.com/62233773/140636860-57110f48-46e6-4354-a632-0aed90e45de3.png)

## Authors

- [@Justinjdaniel](https://github.com/Justinjdaniel)

## License

[MIT](/LICENSE)
