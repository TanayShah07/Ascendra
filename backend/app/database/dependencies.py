from sqlalchemy.orm import Session

from app.database.session import get_db


def get_database():
    yield from get_db()