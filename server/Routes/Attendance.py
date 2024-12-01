from flask import Blueprint, request, jsonify, Response
import cv2
import os
import numpy as np

attendance_blueprint = Blueprint('attendance', __name__)

# Initialize Haar Cascade for face detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

# Load known faces and names
KNOWN_FACES_DIR = "data/known_faces"
known_faces = []
known_names = []

# Preprocess known faces
for name in os.listdir(KNOWN_FACES_DIR):
    person_dir = os.path.join(KNOWN_FACES_DIR, name)
    for filename in os.listdir(person_dir):
        filepath = os.path.join(person_dir, filename)
        image = cv2.imread(filepath, cv2.IMREAD_GRAYSCALE)
        known_faces.append(image)
        known_names.append(name)

def match_face(detected_face, known_faces, known_names):
    """
    Match the detected face with known faces using pixel-wise comparison.
    """
    detected_face = cv2.resize(detected_face, (100, 100))
    for idx, known_face in enumerate(known_faces):
        resized_known_face = cv2.resize(known_face, (100, 100))
        diff = np.linalg.norm(resized_known_face - detected_face)
        if diff < 3000:  # Threshold for recognition
            return known_names[idx]
    return "Unknown"

def generate_frames():
    video_capture = cv2.VideoCapture(0)
    while True:
        success, frame = video_capture.read()
        if not success:
            break

        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray_frame, scaleFactor=1.1, minNeighbors=5)

        face_name = "Unknown"
        for (x, y, w, h) in faces:
            detected_face = gray_frame[y:y + h, x:x + w]
            if detected_face.size != 0:
                face_name = match_face(detected_face, known_faces, known_names)

            # Draw bounding box and name
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
            cv2.putText(frame, face_name, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

        # Encode and yield the frame
        _, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@attendance_blueprint.route('/video_feed', methods=['GET'])
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@attendance_blueprint.route('/give-attendance', methods=['POST'])
def give_attendance():
    try:
        name = request.json.get("name")
        if name and name in known_names:
            return jsonify({"message": f"Attendance recorded for {name}!"}), 200
        else:
            return jsonify({"message": "Face not recognized or attendance not recorded."}), 403
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "An error occurred while processing attendance."}), 500
