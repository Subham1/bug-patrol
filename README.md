# Citizen-Driven Bug Reporting and Monitoring Platform

## Description
A comprehensive system that enables citizens to report bugs on government websites, fosters a community of like-minded individuals dedicated to improving these platforms, and provides higher authorities like the Prime Minister, Chief Ministers, and the President with tools to monitor and ensure the proper functioning of these websites.

## Problem Statement
Develop a system to allow citizens to report bugs on government websites, create a community forum for discussion, provide login functionality for users and authorities, and offer a monitoring dashboard for authorities to oversee the status and resolution of reported bugs.

## Features
- **Bug Reporting**: Users can report bugs they encounter on government websites.
- **View Bugs by Department**: Users can view reported bugs from different government departments.
- **Comment on Bugs**: Users can comment on reported bugs to provide additional information or suggestions.
- **Community Forum**: A platform for users to discuss and share insights about reported bugs.
- **User Login**: Secure login functionality for users to report and track bugs.
- **Authority Login**: Separate login for authorities with access to monitoring tools.
- **Monitoring Dashboard**: Real-time monitoring dashboard for authorities to oversee bug reports and their resolution status.

## Technologies Used
- **Frontend**: HTML, CSS, Bootstrap
- **Backend**: Node.js, Express
- **Template Engine**: EJS
- **Database**: MySQL

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up the database:
    - Create a MySQL database.
    - Import the provided SQL script to set up the necessary tables.
    - Update the database configuration in the project. Edit the `app.js` (or equivalent configuration file) and set your database host, name, user, and password:
    ```javascript
    // app.js
    var con = mysql.createConnection({
    host: "your server",
    user: "your-username",
    password: " yourpassword",
    database: "database",
    });
    

    ```


## Usage
- Access the application at `http://localhost:3000`.
- Register as a user to report bugs.
- View bugs reported by department and comment on them.
- Authorities can log in to access the monitoring dashboard.



