import pytest
from app import app as flask_app

@pytest.fixture
def client():
    flask_app.config.update(TESTING=True)
    with flask_app.test_client() as client:
        yield client

@pytest.fixture(scope="session", autouse=True)
def setup_before_all_tests():
    """
    This fixture runs once before all tests in the session.
    """
    print("\nSetting up resources before all tests...")
    eliminar_datos_de_prueba()
    crear_datos_de_prueba()
    # Perform setup operations here, e.g., database connection, data loading
    yield
    print("\nCleaning up resources after all tests...")
    eliminar_datos_de_prueba()
    # Perform teardown operations here, e.g., closing database connections

def eliminar_datos_de_prueba():
    print("Executing test_example_one")
    assert True

def crear_datos_de_prueba():
    print("Executing test_example_two")
    assert True