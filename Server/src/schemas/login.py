from pydantic import BaseModel, Field, model_validator
import bcrypt

class AccountBase(BaseModel):
    name: str
    password: str = Field(min_length= 8)

    @model_validator(mode='after')
    def account_sanitize(self) -> 'AccountBase':
        self.name = self.name.lower().strip()
        self.password = self.password.strip()
        return self
    
class AccountLogin(AccountBase):
    pass
    
class AccountRegister(AccountBase):
    confirm_password: str

    # Se ejecuta despues de que se compruebe que los datos enviados cumplen con la estructura de la clase
    # y son transformados en python para ser leidos
    # NOTA: tambien esta before pero para acceder a los datos tienes que usar diccionarios (porque son formato Json)
    @model_validator(mode='after')  
    # Debido a que la clase aun se esta construyendo le estas prometiendo a python que la clase Account existe
    def check_password(self) -> 'AccountRegister': 
        name = self.name
        pw1 = self.password
        pw2 = self.confirm_password.strip()

        if(pw1 != pw2):
        # raise hace que el proceso se detenga y responde con un 422 (Unprocessable entity)
            raise ValueError("Invalid Password") 
        
        pw1 = pw1.encode()
        hashed = bcrypt.hashpw(pw1, bcrypt.gensalt(rounds=12)) # <-- Genera un salt y transforma todo en hash

        self.name = name
        self.password = hashed
        self.confirm_password = pw2

        # Devuelve ya los datos rellenados de la clase 
        return self 