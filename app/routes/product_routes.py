from flask import Blueprint, jsonify, request
from app.models import Product

product_routes = Blueprint("products", __name__)

@product_routes.route("/")
def get_products():
    
    print("-------------------------------", "Hello")
    products = Product.query.all()
    return {"products": [product.to_dict() for product in products]}


@product_routes.route("/<int:id>")
def get_product_by_id(id):

    product = Product.query.get(id)
    return product.to_dict()