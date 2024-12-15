from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from resources.user import UserRegister, UserLogin
from resources.transaction import TransactionResource
from resources.budget import BudgetResource
from models import db
from datetime import timedelta

app = Flask(__name__)

@app.route("/")
def home():
    return "Flask is running!"

# App Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

# Initialize Extensions
db.init_app(app)
api = Api(app)
jwt = JWTManager(app)
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# API Endpoints
api.add_resource(UserRegister, '/register')
api.add_resource(UserLogin, '/login')
api.add_resource(TransactionResource, '/transactions', '/transactions/<int:transaction_id>')
api.add_resource(BudgetResource, '/budgets', '/budgets/<int:budget_id>')

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        print("Database tables created.")
    app.run(host="127.0.0.1", port=5001, debug=True)
