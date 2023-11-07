# SQL Business Manager

## Repository

In this repository you will find the application code for an SQL Business Manager. The purpose of this application is for a business owner to track their employees in a MySql database. Iniquirer is used to prompt for user input and prepared statements are used to query the database to retrieve the information or update information based on the results from the inquirer prompts. 

## Installation

- Follow the link in the Contribute section of this README to access the repository for this application. 
- Use the link with instructions on how to clone a repository if you need help with this.
- Clone the repository.
- In the intergrated terminal in your code editor, type npm install to install all the dependencies for this project.
- Make sure to create a .env file in the root of your directory.
- Inside the .env file type your database password after the = symbol like this: DB_PASSWORD=yourpassword
- There is a db folder that contains a seed.sql and a schema.sql file. 
- Open an integrated terminal and source in the schema followed by the seeds in order to input dummy information to use this application, otherwise create your own information by only sourcing the schema and not the seeds.
- After all dependencies are installed simply type node index.js to start the application.

## Table of Contents

- [Contribute](#contribute)
- [Functionality](#functionality)
- [Changes](#changes)
- [Features](#features)
- [License](#license)

## Contribute

To view the repository of this application and contribute to this application click the following link:  [SQL Business Manager](https://github.com/lmansilla92/sql-business-manager)

If you need help on how to clone a GitHub repository into your local repository, visit the following GitHub link: [Cloning a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) 

## Functionality

This is a screen recording showing the functionality of this application:

[Screen Recording Showing Functionality](https://drive.google.com/file/d/1HF5g3IxDvyTe70bxJb_G2qlb2yNDLKOv/view)

## Changes

I would like to make the following changes to this application:

- Add some bonus features like updating an employee's manager, deleting employees, departments, roles, etc...
- Add some ASCII art to display before the inquirer prompts when the application is initialized.

## Features

Some of the features in this application include:

- Use of inquirer to prompt user with questions
- Use of MySql database
- Use of console.table to display the database information in the terminal
- Use of dotenv to hide database password

## License

Link to [The MIT License (MIT)](https://github.com/lmansilla92/sql-business-manager/blob/main/LICENSE)