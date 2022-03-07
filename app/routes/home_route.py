import imp
from flask import Blueprint, jsonify, request
from app.models import Product, Category
from app.forms import search_form

home_route = Blueprint("home", __name__)

@home_route.route("")
def products():
  home_products = Product.query.all()
  return {"products": [product.to_dict() for product in products]}

def categories():
  home_categories = Category.query.all()
  return {"categories": [category.to_dict() for category in categories]}