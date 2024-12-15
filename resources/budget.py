from flask_restful import Resource, reqparse
from models import Budget, db
from flask_jwt_extended import jwt_required, get_jwt_identity

budget_parser = reqparse.RequestParser()
budget_parser.add_argument('category', type=str, required=True)
budget_parser.add_argument('amount', type=float, required=True)

class BudgetResource(Resource):
    @jwt_required()
    def get(self):
        try:
            current_user_id = get_jwt_identity()
            budgets = Budget.query.filter_by(user_id=current_user_id).all()
            return [{"id": b.id, "category": b.category, "amount": b.amount} for b in budgets], 200
        except Exception as e:
            return {"message": "Error fetching budgets"}, 500

    @jwt_required()
    def post(self):
        try:
            current_user_id = get_jwt_identity()
            data = budget_parser.parse_args()
            new_budget = Budget(
                user_id=current_user_id,
                category=data['category'],
                amount=data['amount']
            )
            db.session.add(new_budget)
            db.session.commit()
            return {"message": "Budget added successfully"}, 201
        except Exception as e:
            db.session.rollback()
            return {"message": "Failed to add budget"}, 500

    @jwt_required()
    def delete(self, budget_id):
        try:
            current_user_id = get_jwt_identity()
            budget = Budget.query.filter_by(id=budget_id, user_id=current_user_id).first()
            if not budget:
                return {"message": "Budget not found"}, 404
            db.session.delete(budget)
            db.session.commit()
            return {"message": "Budget deleted successfully"}, 200
        except Exception as e:
            db.session.rollback()
            return {"message": "Failed to delete budget"}, 500
