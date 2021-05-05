"""empty message

Revision ID: 0c3ac76b8312
Revises: 
Create Date: 2021-05-05 10:12:01.259392

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0c3ac76b8312'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('firstName', sa.String(length=40), nullable=False),
    sa.Column('lastName', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('city', sa.String(length=50), nullable=False),
    sa.Column('state', sa.String(length=50), nullable=False),
    sa.Column('bio', sa.String(length=2000), nullable=True),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('firstName'),
    sa.UniqueConstraint('lastName')
    )
    op.create_table('DMs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('campaign', sa.String(length=255), nullable=False),
    sa.Column('resources', sa.String(length=3000), nullable=False),
    sa.Column('experience', sa.String(length=25), nullable=False),
    sa.Column('partySize', sa.String(length=25), nullable=False),
    sa.Column('groupType', sa.String(length=25), nullable=False),
    sa.Column('description', sa.String(length=2000), nullable=True),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('PCs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('pcClass', sa.String(length=40), nullable=False),
    sa.Column('experience', sa.String(length=25), nullable=False),
    sa.Column('description', sa.String(length=2000), nullable=True),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('party',
    sa.Column('dmId', sa.Integer(), nullable=False),
    sa.Column('pcId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['dmId'], ['DMs.id'], ),
    sa.ForeignKeyConstraint(['pcId'], ['PCs.id'], ),
    sa.PrimaryKeyConstraint('dmId', 'pcId')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('party')
    op.drop_table('PCs')
    op.drop_table('DMs')
    op.drop_table('users')
    # ### end Alembic commands ###
