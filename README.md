# Auto-Mart

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=plastic)](https://opensource.org/licenses/MIT)
[![Travis (.org) branch](https://img.shields.io/travis/chidoziegabriel/auto-mart/develop.svg?style=plastic)](https://travis-ci.org/ChidozieGabriel/auto-mart)
[![Coveralls github branch](https://img.shields.io/coveralls/github/ChidozieGabriel/auto-mart/develop.svg?style=plastic)](https://coveralls.io/github/ChidozieGabriel/auto-mart?branch=develop)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/ChidozieGabriel/auto-mart.svg?style=plastic)](https://codeclimate.com/github/ChidozieGabriel/auto-mart/maintainability)

Auto Mart is an online marketplace for automobiles of diverse makes, model or body type.
With Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers.
This repository contains the files for the **server** app.

# Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Test](#test)
- [Host](#host)
- [UI](#ui)
- [API Documentation](#api-documentation)
- [License](#license)

## Getting Started

Auto-Mart is built using [**Express**](https://expressjs.com/) on [**NodeJS**](https://nodejs.org/).
User is authenticated using [**JWT (JSON Web Token)**](https://jwt.io/).

## Installation

1. Install [**Node JS**](https://nodejs.org/).
2. Install [**Postgres**](https://www.postgresql.org/).

## Quick Start

```
# Clone this repository
git clone https://github.com/ChidozieGabriel/auto-mart.git

# Enter the directory
cd ./auto-mart

# Create environment variables
touch .env
```
fill the .env file using [.env.sample](.env.sample) file.
```

# Install dependencies
npm install

# Start development server
npm run start-dev

# Start production server
npm build && npm start

# Clone this repository
git clone https://github.com/ChidozieGabriel/auto-mart.git
```

## Test
Run `npm test` to test the project.

## Host

The server is hosted on [Heroku](https://automart-site.herokuapp.com/).

## UI

Click [here](https://chidoziegabriel.github.io/auto-mart-ui/ui/) to view the UI.
Click [here](https://github.com/ChidozieGabriel/auto-mart-ui) to view the UI repository.

## API Documentation

Click [here](https://automart-site.herokuapp.com/api-docs/) to view the API docs.

## License

This project is licensed under MIT License - see the [LICENSE.md](LICENSE.md) file for details.
