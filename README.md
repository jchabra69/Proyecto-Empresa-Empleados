# Project: Company and Employee Management System

## Description
This project is a web application developed in JavaScript to manage **Companies** and their **Employees**. The application includes CRUD (Create, Read, Update, Delete) functionalities for both entities and is organized in a modular and scalable way, following best development practices.

## Objective
- Design and implement CRUD functionality for the **Company** and **Employee** entities, using a structure that makes the project easy to maintain and scale.
- Create an intuitive interface to manage both entities and their relationships.
- Enforce integrity constraints, such as preventing a company from being deleted if there are employees associated with it.

## Key Features
### Company Entity
- **Create Company Form**: A form to add new companies.
- **Company Listing**:
  - View all companies.
  - Options to edit and delete companies.
  - **Restriction**: A company cannot be deleted if it has employees associated with it.

### Employee Entity
- **Create Employee Form**: A form to add new employees, including a way to specify which company they belong to.
- **Employee Listing**:
  - View all employees.
  - View employees related to a specific company.
  - Options to edit and delete employees.

## Technologies Used
- **HTML5**: For structuring the web pages.
- **CSS3**: For designing and styling the pages.
- **JavaScript (ES6)**: For business logic and DOM manipulation.
- **JSON Files**: For initial data loading.

## Project Structure
The project follows a modular structure that helps keep it organized and scalable:

