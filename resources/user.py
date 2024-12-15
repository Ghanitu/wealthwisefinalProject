from flask_restful import Resource, reqparse
from models import User, db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token

# Request parser for user input
parser = reqparse.RequestParser()
parser.add_argument('name', type=str, help="Name is optional")
parser.add_argument('email', type=str, required=True, help="Email is required")
parser.add_argument('password', type=str, required=True, help="Password is required")

class UserRegister(Resource):
    def post(self):
        try:
            data = parser.parse_args()
            
            # Check if user already exists
            if User.query.filter_by(email=data['email']).first():
                return {"message": "User already exists"}, 400
            
            # Hash the password
            hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
            new_user = User(
                name=data.get('name', ''),
                email=data['email'],
                password=hashed_password
            )
            
            # Add and commit new user to the database
            db.session.add(new_user)
            db.session.commit()
            
            return {"message": "User registered successfully"}, 201
            
        except Exception as e:
            db.session.rollback()
            print(f"Registration error: {str(e)}")  # Debugging
            return {"message": "Registration failed"}, 500

class UserLogin(Resource):
    def post(self):
        try:
            data = parser.parse_args()
            print("Login attempt with:", data)  # Debug input data

            user = User.query.filter_by(email=data['email']).first()
            print("User fetched from DB:", user)  # Debug user object

            if user and check_password_hash(user.password, data['password']):
                print("Password matched")  # Debug successful password match
                token = create_access_token(identity=str(user.id))
                print("Generated Token:", token)  # Debug generated token
                return {"access_token": token}, 200
            
            print("Invalid credentials")  # Debug failed login
            return {"message": "Invalid email or password"}, 401

        except Exception as e:
            print(f"Login error: {str(e)}")  # Debug unexpected errors
            return {"message": "Login failed"}, 500
