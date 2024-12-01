import cv2
import numpy as np

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

def perform_facial_recognition(image_path, known_faces, known_names):
    """
    Perform facial recognition using OpenCV Haar Cascade.
    Returns the name of the recognized person or 'Unknown'.
    """
    try:
        # Load and preprocess the input image
        image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        if image is None:
            print("Error: Unable to read the image.")
            return "Unknown"

        faces = face_cascade.detectMultiScale(image, scaleFactor=1.1, minNeighbors=5)

        for (x, y, w, h) in faces:
            detected_face = image[y:y + h, x:x + w]
            if detected_face.size != 0:
                name = match_face(detected_face, known_faces, known_names)
                return name
        return "Unknown"
    except Exception as e:
        print(f"Facial Recognition Error: {e}")
        return "Unknown"

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
