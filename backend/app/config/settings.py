from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    # --------------------------------------------------
    # DATABASE
    # --------------------------------------------------

    DATABASE_URL: str

    # --------------------------------------------------
    # AUTH
    # --------------------------------------------------

    SECRET_KEY: str

    ALGORITHM: str

    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # --------------------------------------------------
    # AI PROVIDERS
    # --------------------------------------------------

    GEMINI_API_KEY: str | None = None

    XAI_API_KEY: str | None = None

    ANTHROPIC_API_KEY: str | None = None

    # --------------------------------------------------
    # EMAIL
    # --------------------------------------------------

    SMTP_HOST: str

    SMTP_PORT: int

    SMTP_USERNAME: str

    SMTP_PASSWORD: str

    SMTP_FROM_EMAIL: str

    class Config:

        env_file = ".env"

        extra = "ignore"


settings = Settings()