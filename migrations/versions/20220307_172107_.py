"""empty message

Revision ID: 7c30cb29d73e
Revises: 1d8a554c7fd6
Create Date: 2022-03-07 17:21:07.931146

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7c30cb29d73e'
down_revision = '1d8a554c7fd6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'products', 'categories', ['category_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'products', type_='foreignkey')
    # ### end Alembic commands ###