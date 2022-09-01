<h2 align="center">DEDUCATION BACKEND</h3>
</div>

![dEducation-logo](https://user-images.githubusercontent.com/62663759/187912013-d1653a15-833a-4102-9091-0c9aa96b8505.png)

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
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>

  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Squirrel is an oracle powered bootstrapped node Website. It is a faithful copy of Rokomari.com. You'll find many features that is in the main site. We tried best of our ability to create something in this short time.

Youtube Demo: https://youtu.be/eeUI5hNmdYo

## Languages, Tools and Frameworks:<a name="tools"></a>

- Node.js
- Express.js (Routing)
- OracleDB (Database connection)
- JWT (Authentication)
- Bcrypt (Password encryption)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Follow the step by step installation procedure to install and run this on your machine

### Prerequisites

Make sure you have node and oracle installed in your device.

**`NodeJs`**: Install Nodejs from [here](https://nodejs.org/en/download/)

**`Oracle`**:Install Oracle from [here](http://www.oracle.com/index.html) and register for an account of your own

### Installation

#### Getting the repository

1. Clone the repo

   ```sh
   git clone https://github.com/mahirlabibdihan/dEducation-backend.git
   ```

2. If you don't have git installed in your device then download zip

3. After installation or download go to the repository and open command line.

4. Install NPM packages

   ```sh
   npm install
   ```

#### Setting up the environment variables

create a new file `.env` in the root directory. And the file should have the followings

```sh
DB_USER= YOUR_DB_USER
DB_PASS= YOUR_DB_PASS
DB_CONNECTSTRING=localhost/orcl
PORT=YOUR_FABOURITE_PORT
APP_SECRET=YOUR_DARKEST_SECRET
```

If you followed the above then the `.env` should look like this

```sh
DB_USER= c##deducation
DB_PASS= password
DB_CONNECTSTRING=localhost/orcl
PORT= 5000
APP_SECRET=kuddusmia
```

We are finally good to go

#### Run the project

Go to your favourite code editor and run

```sh
npm start
```

You should find that the project is working!

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Supervisor

- Khaled Mahmud Shahriar

  - **Assistant Professor**

    :arrow_forward: **Contact:**

    Department of Computer Science and Engineering
    Bangladesh University of Engineering and Technology
    Dhaka-1000, Bangladesh

<p align="right">(<a href="#top">back to top</a>)</p>
