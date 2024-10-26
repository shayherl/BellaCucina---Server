# Recipe Management Web App

A recipe management web application designed to help users discover, search, and manage their favorite recipes.
It allows users to search for recipes, view details, register and log in, add recipes to favorites, and create new recipes.

## Project Overview

This project is structured into two main repositories:
- **Client:** Handles the frontend of the application, allowing users to interact with recipes and manage their collections.
- **Server:** Provides backend functionality, managing user data, interacting with a MySQL database, and serving as an API gateway to external recipe sources.

## Server: Recipe Management - Backend

This is the backend of the Recipe Management web app, developed to handle user management, data processing, and communication with external APIs.

### Key Features

- **API Gateway**: Acts as a mediator between the client and Spoonacular API, ensuring smooth data flow and handling requests/responses.
- **User Management**: Supports user registration, login, and session management.
- **Database Connectivity**: Connects to a MySQL database to manage user information, favorite recipes, and user-created recipes, ensuring data persistence and integrity.

### Tech Stack

- **Node.js**: JavaScript runtime environment for server-side code.
- **Express.js**: Framework for building RESTful APIs and handling server routes.
- **MySQL**: Relational database used to store user-related data, including favorites and custom recipes.
- **Axios**: Used for HTTP requests to the Spoonacular API for fetching recipe data.
