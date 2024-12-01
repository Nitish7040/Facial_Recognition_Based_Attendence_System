from flask import Blueprint, request, jsonify, Response
import cv2
import face_recognition
import os
import json

attendance_blueprint = Blueprint('attendance', __name__)

# OpenCV Video Capture
video_capture = cv2.VideoCapture(0)

# Load known faces
KNOWN_FACES_DIR = "data/known_faces"
known_faces = []
known_names = []

for name in os.listdir(KNOWN_FACES_DIR):
    person_dir = os.path.join(KNOWN_FACES_DIR, name)
    for filename in os.listdir(person_dir):
        filepath = os.path.join(person_dir, filename)
        image = face_recognition.load_image_file(filepath)
        encoding = face_recognition.face_encodings(image)[0]
        known_faces.append(encoding)
        known_names.append(name)

def generate_frames():
    while True:
        success, frame = video_capture.read()
        if not success:
            break

        # Resize frame for faster processing
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
        rgb_small_frame = small_frame[:, :, ::-1]

        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        face_names = []
        for face_encoding in face_encodings:
            matches = face_recognition.compare_faces(known_faces, face_encoding)
            name = "Unknown"

            face_distances = face_recognition.face_distance(known_faces, face_encoding)
            best_match_index = face_distances.argmin() if len(face_distances) > 0 else None
            if best_match_index is not None and matches[best_match_index]:
                name = known_names[best_match_index]

            face_names.append(name)

        for (top, right, bottom, left), name in zip(face_locations, face_names):
            top *= 4
            right *= 4
            bottom *= 4
            left *= 4

            cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
            cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 255, 0), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(frame, name, (left + 6, bottom - 6), font, 0.5, (255, 255, 255), 1)

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
