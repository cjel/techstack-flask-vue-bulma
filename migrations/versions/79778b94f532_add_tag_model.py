"""Add tag model

Revision ID: 79778b94f532
Revises: 3be96cae3b6b
Create Date: 2024-03-11 23:44:01.820037

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '79778b94f532'
down_revision = '3be96cae3b6b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tag_model',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_model',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('user')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', mysql.INTEGER(display_width=11), autoincrement=True, nullable=False),
    sa.Column('name', mysql.VARCHAR(collation='utf8_bin', length=128), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8_bin',
    mysql_default_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.drop_table('user_model')
    op.drop_table('tag_model')
    # ### end Alembic commands ###
