import cv2

def perform_facial_recognition(image_path):
    """
    Perform facial recognition on the provided image.
    Returns True if the face is recognized, False otherwise.
    """
    try:
        # Load the saved image
        frame = cv2.imread(image_path)

        if frame is None:
            print("Error: Unable to read the image.")
            return False

        # Load the Haar cascade for face detection
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

        # Convert image to grayscale for processing
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

        # If a face is detected
        if len(faces) > 0:
            return True
        else:
            return False
    except Exception as e:
        print(f"Facial Recognition Error: {e}")
        return False
