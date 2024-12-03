import face_recognition
import sys
import json
import cv2

def recognize_face(image_path):
    # Load the image file
    image = face_recognition.load_image_file(image_path)

    # Find all face encodings in the image
    face_encodings = face_recognition.face_encodings(image)

    if len(face_encodings) > 0:
        # Assume we only have one face per image, return the first face encoding
        return face_encodings[0].tolist()  # Convert numpy array to list for JSON compatibility
    else:
        return None

if __name__ == "__main__":
    image_path = sys.argv[1]  # Get image path passed from Node.js
    result = recognize_face(image_path)
    print(json.dumps(result))  # Print result in JSON format
