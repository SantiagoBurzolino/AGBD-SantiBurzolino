from flask import Flask
from routes.inventario import inventario_bp
from routes.auth import auth_bp
from routes.miembros import miembros_bp
from routes.aportes.aportes import aportes_bp
from routes.aportes.tipoAportes import tipo_aporte_bp
from routes.borrarUsuario.delete import delete_user_bp
from routes.modificarUsuario.put import put
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Registramos los blueprints
    app.register_blueprint(inventario_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(miembros_bp)
    app.register_blueprint(aportes_bp)
    app.register_blueprint(tipo_aporte_bp)
    app.register_blueprint(delete_user_bp)
    app.register_blueprint(put)

    @app.route("/")
    def index():
        return "<h1>API Huertas funcionando</h1>"

    return app

if __name__ == "__main__":
    app = create_app()
    # En desarrollo debug=True, en producción quitá el debug
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)), debug=True)