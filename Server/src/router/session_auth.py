from fastapi import APIRouter, HTTPException
import bcrypt
from ..schemas.login import AccountLogin, AccountRegister
from ..database.database import db_accounts

app = APIRouter()


@app.get('/db_accounts/')
def read_item():
    return {"Total": len(db_accounts), "Account": db_accounts} # Asi se obtienen todas las cuentas 

@app.post('/db_accounts/Register')
async def write_root(account: AccountRegister):

    name = account.name
    pw = account.password

    # for user in db_accounts:
    #     if user["name"] == name:
    #         return user 

    # El primer user es el equivalente al return user de arriba
    user_afound = next((user for user in db_accounts if user["name"] == name), None)
    if user_afound:
        raise HTTPException(status_code=404, detail="Este usuario ya existe")
    
    data_for_db = account.model_dump(exclude={"confirm_password"})

    db_accounts.append(data_for_db) # Para manter persistencia si la pagina se reinicia 
    return {"Cuenta creada": account}

@app.post('/db_account/login')
async def write_login(account: AccountLogin):
    name = account.name
    password = account.password.encode()

    # Obtiene el primer objeto que coincida con el nombre (el none es el valor que tendra si no coincide con algo)
    user_afound = next((user for user in db_accounts if user["name"] == name), None)

    if not user_afound:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    if not (bcrypt.checkpw(password ,user_afound["password"])):
        raise HTTPException(status_code=404, detail="Las contraseñas no coinciden")

    return {"Message": "Se inicio sesion", "User": user_afound["name"]}