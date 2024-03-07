# BudgetApp

A budget application that users can use to track expenses through various categories. Information is fetched using a RESTful API and information is rendered using React. Data is stored using SQLAlchemy. Python and Flask backend and Javascript and React serving the frontend.

## Prerequisites

Make sure you have the following installed on your system:

- Python (version 3.6 or higher)
- pip (Python package installer)
- Git (optional, for cloning the repository)

## Getting Started

### 1. Clone the Repository

If you haven't already, clone the BudgetApp repository to your local machine using Git:

```bash
git clone https://github.com/andrenguyening/BudgetApp.git
```

### 2. Create Virtual Environment and install requirements.txt
Open a command prompt and cd to the location of which you cloned the project. Then cd into backend.

```cd backend```

Create a virtual environment:

 ``` python3 -m venv .venv```
 
 Activate the environment with:
 
 ```. .venv/bin/activate```
 
 Install all the requirements using pip:
 
 ```pip install -r requirements.txt```

### 3. Initialize the DB and start the application:
Set the FLASK_APP environment variable:
```export FLASK_APP=chat.py```

To initialize the database:
```flask initdb```

Start the flask server:
flask run

### 4. Run the Frontend
Move into the the frontend folder:

```cd frontend```

Run ```npm install```

Start the frontend server: ```npm start```
