from flask import Blueprint, request
from flask_login import current_user
from datetime import datetime

from app.models import Order, db

order_routes = Blueprint('orders', __name__)


@order_routes.route('', methods=['POST'])
def submit_order():
    print('requestttttttttttt', request.json)
    new_order = Order(
        order_number = request.json['order_number'],
        buyer_id = current_user.id,
        product_id = request.json['product_id'],
        quantity = request.json['quantity'],
        created_at = datetime.now(),
        updated_at = datetime.now()
    )
    db.session.add(new_order)
    db.session.commit()
    return new_order.to_dict()
