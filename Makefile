.ONESHELL:

.PHONY: setup_backend
setup_backend:
	cd backend
	python3 -m venv venv
	. venv/bin/activate
	pip install -r requirements.txt
	export FLASK_APP=budget.py flask initdb

.PHONY: run_backend
run_backend:
	cd backend
	source venv/bin/activate
	FLASK_APP=budget.py flask run

.PHONY: setup_frontend
setup_frontend:
	cd frontend
	npm install

.PHONY: run_frontend
run_frontend:
	cd frontend
	npm start
