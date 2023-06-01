# ReciPlease

Welcome to ReciPlease, a recipe web app designed to be a space where users can share and search for recipes. ReciPlease was my final capstone project for my [Coding Temple](https://www.codingtemple.com/software-engineering/part-time/) Software Engineering bootcamp . It's important to note that this project is solely intended for educational purposes, and I have no plans to create a recipe website that competes with existing mainstream platforms.

## Core Technologies Used

- Frontend: React
- Backend: Flask
- Database: [ElephantSQL](https://www.elephantsql.com/)

### Core Libraries Used

- Material UI: Used for frontend components
- React Router: Used for frontend routing
- Flask-HTTP-Auth: Used for user authentication
- requests: Used for handling HTTP requests in Python
- Flask-SQLAlchemy: Used to connect with the database
- Werkzeug: Used for password security

## Installation and Setup

### Frontend Installation

1. Clone the frontend repository:

```
git clone https://github.com/tylerob65/ReciPlease.git
```
2. Navigate to the frontend directory:
```
cd ReciPlease
```
3. Install the dependencies:
```
npm install
```
4. Start the development server:
```
npm start
```

### Backend Installation

1. Clone the backend repository:
```
git clone https://github.com/tylerob65/ReciPlease-Backend.git
```
2. Navigate to the backend directory:
```
cd ReciPlease-Backend
```
3. Create virtual environment:
```
(on mac)
python3 -m venv my_venv
(on pc)
python -m venv my_venv
```
4. Activate virtual environment:
```
(on mac)
source my_venv/bin/activate
(on pc)
my_venv\Scripts\activate
```
5. Install the required packages:
```
(on mac)
pip3 install -r requirements.txt
(on pc)
pip install -r requirements.txt
```
### Backend .env file
```
FLASK_APP = run.py
FLASK_DEBUG = on

# Pick A secret key
SECRET_KEY = 

# List database url from elephantSQL. The url will start with 
# postgres:// but should be changed to postgresql://
DATABASE_URL = 

# Put API key and host below for using Spoonacular API
RAPID_API_KEY = 
RAPID_API_HOST = 
```
### Backend - Flask-Migrate setup
Enter following commands into command line to migrate database
```
flask db init
flask db migrate
flask db upgrade
```

## Spoonacular API Usage

ReciPlease leverages the power of the [Spoonacular API](https://spoonacular.com/food-api) to provide users with access to a wide range of recipe information. It's important to note that the terms of the Spoonacular API state that websites utilizing their API should not compete with the Spoonacular site or store any data obtained from the API. However, I had obtained special permission from Spoonacular to temporarily store data as I developed this web app for educational purposes only. Please be aware that I have no intentions of hosting this web app or using the stored data for any commercial purposes.

I am grateful to Spoonacular for granting me temporary permission to store API data, enabling me to create this educational project.

## Acknowledgements

- Some of the code used in this project was adapted from demonstrations in my bootcamp class by my instructors. You can find my instructors' GitHub pages [here](https://github.com/smtsuchi) and [here](https://github.com/Sarah-Stodder).

## Additional Information

- This Repo is just for the frontend of my web app. The backend can be found [here](https://github.com/tylerob65/ReciPlease-Backend).

- [ChatGPT](https://openai.com/) was used to help organize content of this README.

- The favicon for this web app was designed using [favicon.io](https://favicon.io/).

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).