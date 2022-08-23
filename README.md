# An application for tracking transactions and other financial data

### using Mono as the service provider

## Overview

The application is a mono repo of three essentail parts
> Backend Server - This is the api that communicates with mono
> Cron Job - To update application general application state - transactions etc...
> client app - Customer facing application to atualize the objectives

## Installation

First add the env in the root directory; check the `.env.example` for needed variables

run `npm run start-server` to install dependecies and start the server; default port is 3001

run `npm run start-client` to insatll dependencies and start the client; default port is 4173

## API DOCS
Click the link below to view the API docs
[![Postman Docs](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/22955437/VUqrMGPq)