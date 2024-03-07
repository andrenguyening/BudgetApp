from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True,nullable = False)
    name = db.Column(db.Text,nullable = False)
    budget = db.Column(db.Integer)
    def __init__(self, name, budget):
        self.name = name
        self.budget = budget
    def __repr__(self):
        return f'<Category: {self.name}>'
    
class Purchase(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    desc = db.Column(db.Text, nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Text, nullable=False)
    category = db.Column(db.Text,nullable=False)
def __init__(self, date, desc, amount,category):
    self.date = date
    self.desc = desc
    self.amount = amount
    self.category = category
def __repr__(self):
    return f'<Purchase: {self.desc}>'