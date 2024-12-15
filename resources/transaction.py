from flask_restful import Resource, reqparse
from models import Transaction, db
from flask_jwt_extended import jwt_required, get_jwt_identity

# Parser for transaction input
transaction_parser = reqparse.RequestParser()
transaction_parser.add_argument('amount', type=float, required=True, help="Amount is required")
transaction_parser.add_argument('category', type=str, required=True, help="Category is required")
transaction_parser.add_argument('date', type=str, required=True, help="Date is required")
transaction_parser.add_argument('description', type=str, required=False)

class TransactionResource(Resource):
    @jwt_required()
    def get(self):
        try:
            current_user_id = get_jwt_identity()
            # Fetch all transactions for the logged-in user
            transactions = Transaction.query.filter_by(user_id=current_user_id).all()
            return [
                {
                    "id": t.id,
                    "amount": t.amount,
                    "category": t.category,
                    "date": t.date,
                    "description": t.description,
                }
                for t in transactions
            ], 200
        except Exception as e:
            print(f"Error fetching transactions: {str(e)}")
            return {"message": "Error fetching transactions"}, 500

    @jwt_required()
    def post(self):
        try:
            current_user_id = get_jwt_identity()
            data = transaction_parser.parse_args()
            # Create a new transaction
            new_transaction = Transaction(
                user_id=current_user_id,
                amount=data['amount'],
                category=data['category'],
                date=data['date'],
                description=data.get('description', '')
            )
            db.session.add(new_transaction)
            db.session.commit()
            return {"message": "Transaction added successfully"}, 201
        except Exception as e:
            db.session.rollback()
            print(f"Error adding transaction: {str(e)}")
            return {"message": "Failed to add transaction"}, 500

    @jwt_required()
    def delete(self, transaction_id):
        try:
            current_user_id = get_jwt_identity()
            transaction = Transaction.query.filter_by(id=transaction_id, user_id=current_user_id).first()
            if not transaction:
                return {"message": "Transaction not found"}, 404
            db.session.delete(transaction)
            db.session.commit()
            return {"message": "Transaction deleted successfully"}, 200
        except Exception as e:
            db.session.rollback()
            print(f"Error deleting transaction: {str(e)}")
            return {"message": "Failed to delete transaction"}, 500
