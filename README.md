<h2 align="center">DEDUCATION BACKEND</h3>
</div>

![dEducation-logo](https://user-images.githubusercontent.com/62663759/187912013-d1653a15-833a-4102-9091-0c9aa96b8505.png)

## About The Project

dEducation is an ed-tech platform where tutors,students and coaching centers get connected to each other. Students can find their desired tutors and join coaching centers. On the other hand, tutors can get tuitions and create their own coaching centers.

## Languages, Tools and Frameworks:<a name="tools"></a>

- Node.js
- Express.js
- OracleDB
- JWT
- Bcrypt

## Getting Started

Follow the step by step installation procedure to install and run this on your machine

### Prerequisites

Make sure you have node installed in your device.

**`NodeJs`**: Install Nodejs from [here](https://nodejs.org/en/download/)

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
JWT_SECRET=YOUR_DARKEST_SECRET
EMAIL_USER = YOUR_EMAIL_ADDRESS
EMAIL_PASS = YOUR_EMAIL_PASSWORD
```

If you followed the above then the `.env` should look like this

```sh
DB_USER = c##deducation
DB_PASSWORD= password
DB_CONNECTSTRING= localhost/orcl
JWT_SECRET= kuddusmia
EMAIL_USER = "1905072@ugrad.cse.buet.ac.bd"
EMAIL_PASS = "password_bolbo_na"
```

We are finally good to go

#### Run the project

Go to your favourite code editor and run

```sh
npm start
```

You should find that the project is working!

## Supervisor

- Khaled Mahmud Shahriar

  - **Assistant Professor**

    :arrow_forward: **Contact:**

    Department of Computer Science and Engineering
    Bangladesh University of Engineering and Technology
    Dhaka-1000, Bangladesh

<p align="right">(<a href="#top">back to top</a>)</p>
