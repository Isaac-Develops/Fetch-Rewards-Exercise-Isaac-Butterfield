<div id="top"></div>



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Isaac-Develops/Fetch-Rewards-Exercise-Isaac-Butterfield">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Points Web Service</h3>

  <p align="center">
    A Points Web Service API that allows you to store transactions, keep track of each payer balance, and spend those points.
    <br />
    <a href="https://github.com/Isaac-Develops/Fetch-Rewards-Exercise-Isaac-Butterfield"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Isaac-Develops/Fetch-Rewards-Exercise-Isaac-Butterfield">View Demo</a>
    ·
    <a href="https://github.com/Isaac-Develops/Fetch-Rewards-Exercise-Isaac-Butterfield/issues">Report Bug</a>
    ·
    <a href="https://github.com/Isaac-Develops/Fetch-Rewards-Exercise-Isaac-Butterfield/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#background">Background</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This is a exercise to create a Points Web Service that:
1. Adds transactions for a specific payer and date.
2. Spends points using the rules below and return a list of { "payer": <string>, "points": <integer> } for each call.
  Rule 1. Spend the oldest points first (oldest based on transaction timestamp, not the order they're received)
  Rule 2. None of the payer's points can go negative
3. Returns all payer point balances.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Mocha](https://mochajs.org/)
* [Node-Fetch](https://github.com/node-fetch/node-fetch)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Make sure you have both npm and Node.js installed. You can check if both are installed using the following commands:
  ```sh
  node -v
  npm -v
  ```
  
If they aren't installed, please follow the instructions on the [NPM Docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### Installation

Installation is pretty simple:

1. Clone the repo
   ```sh
   git clone https://github.com/Isaac-Develops/Fetch-Rewards-Exercise-Isaac-Butterfield.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the Service
   ```sh
   node index.js
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



## Background

Our users have points in their accounts. Users only see a single balance in their accounts. But for reporting purposes we actually track their
points per payer/partner. In our system, each transaction record contains: **payer** (string), **points** (integer), **timestamp** (date).
  
For earning points it is easy to assign a payer, we know which actions earned the points. And thus which partner should be paying for the points.
  
When a user spends points, they don't know or care which payer the points come from. But, our accounting team does care how the points are
spent. There are two rules for determining what points to "spend" first:
  - We want the oldest points to be spent first (oldest based on transaction timestamp, not the order they’re received)
  - We want no payer's points to go negative.
  
  
<!-- USAGE EXAMPLES -->
## Usage
  
There are three provided routes available:

  `/add`
  
  - Method: POST
  - Description: Adds a new transaction.
  
  `/spend`
  
  - Method: PATCH
  - Description: Spends points, starting with the oldest.
  
  `/balances`
  
  - Method: GET
  - Description: Gets all payer point balances.
  
For an example, suppose you call "/add" with the following sequence of calls:
  
  ```sh
  { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }
  { "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" }
  { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" }
  { "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" }
  { "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" }
  ```
  
Then you call "/spend" with the following request:
  ```sh
  { "points": 5000 }
  ```
  
The expected response from the spend call would be:
  ```sh
  [
    { "payer": "DANNON", "points": -100 },
    { "payer": "UNILEVER", "points": -200 },
    { "payer": "MILLER COORS", "points": -4,700 }
  ]
  ```
  
A subsequent call to "/balances", after the spend, should return the following results:
  ```sh
  {
    "DANNON": 1000,
    "UNILEVER": 0,
    "MILLER COORS": 5300
  }
  ```
  
## Unit Tests
  
There are unit tests available in the test folder. To run these tests, run the test script using npm:
  ```sh
  npm run test
  ```

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing
  
While this is an exercise and not an actual project, feel free to contribute!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>


  
<!-- CONTACT -->
## Contact

Isaac Butterfield - isaacben822@gmail.com

Project Link: [https://github.com/Isaac-Develops/Fetch-Rewards-Exercise-Isaac-Butterfield](https://github.com/Isaac-Develops/Fetch-Rewards-Exercise-Isaac-Butterfield)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Exercise details and background provided by [Fetch Rewards](https://www.fetchrewards.com/) as part of their hiring process.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Isaac-Develops/Fetch-Rewards-Exercise-Isaac-Butterfield.svg?style=for-the-badge
[contributors-url]: https://github.com/Isaac-Develops/Fetch-Rewards-Exercise-Isaac-Butterfield/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Isaac-Develops/Fetch-Rewards-Exercise-Isaac-Butterfield.svg?style=for-the-badge
[forks-url]: https://github.com/Isaac-Develops/Fetch-Rewards-Exercise-Isaac-Butterfield/network/members
[stars-shield]: https://img.shields.io/github/stars/Isaac-Develops/Fetch-Rewards-Exercise-Isaac-Butterfield.svg?style=for-the-badge
[stars-url]: https://github.com/Isaac-Develops/Fetch-Rewards-Exercise-Isaac-Butterfield/stargazers
[issues-shield]: https://img.shields.io/github/issues/Isaac-Develops/Fetch-Rewards-Exercise-Isaac-Butterfield.svg?style=for-the-badge
[issues-url]: https://github.com/Isaac-Develops/Fetch-Rewards-Exercise-Isaac-Butterfield/issues
[license-shield]: https://img.shields.io/github/license/Isaac-Develops/Fetch-Rewards-Exercise-Isaac-Butterfield.svg?style=for-the-badge
[license-url]: https://github.com/Isaac-Develops/Fetch-Rewards-Exercise-Isaac-Butterfield/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/isaac-butterfield/
[product-screenshot]: images/screenshot.png
