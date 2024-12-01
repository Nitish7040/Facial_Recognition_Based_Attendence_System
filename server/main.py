from flask import Flask
from Routes.Attendance import attendance_blueprint

app = Flask(__name__)

# Register blueprint
app.register_blueprint(attendance_blueprint, url_prefix='/api')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
