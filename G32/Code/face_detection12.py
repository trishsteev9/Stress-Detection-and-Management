import cv2
from deepface import DeepFace
from tkinter import Tk, filedialog

# Function to upload an image file
def upload_image():
    """Allows the user to select an image file for emotion detection."""
    root = Tk()
    root.withdraw()  # Hide the root window
    file_path = filedialog.askopenfilename(title="Select an image file", filetypes=[("Image files", "*.jpg *.jpeg *.png *.bmp")])
    if not file_path:
        print("No file selected.")
        return None
    return file_path

# Function to preprocess the image, detect the face, and predict emotion
def preprocess_and_predict(image_path):
    """Uses DeepFace for face detection, resizes the face, and predicts emotion."""
    try:
        # Read the image
        image = cv2.imread(image_path)
        
        # Convert image to grayscale
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        # Load face cascade classifier
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

        # Detect faces in the image
        faces = face_cascade.detectMultiScale(gray_image, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

        if len(faces) == 0:
            print("No face detected in the image.")
            return None, None

        for (x, y, w, h) in faces:
            # Extract the face ROI (Region of Interest)
            face_roi = image[y:y + h, x:x + w]

            # Perform emotion analysis on the face ROI using DeepFace
            result = DeepFace.analyze(face_roi, actions=['emotion'], enforce_detection=False)

            # Determine the dominant emotion
            emotion = result[0]['dominant_emotion']

            # Map only 'angry' and 'sad' to 'stress'
            if emotion == 'angry' or emotion == 'sad':
                emotion = 'stress'

            # Draw rectangle around face and label with predicted emotion
            cv2.rectangle(image, (x, y), (x + w, y + h), (0, 0, 255), 2)
            cv2.putText(image, emotion, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)

        return emotion, image

    except Exception as e:
        print(f"Error during image preprocessing: {e}")
        return None, None

def main():
    """Main function to upload an image and detect emotion."""
    # Upload an image
    image_path = upload_image()
    if not image_path:
        return
    
    # Preprocess the image and predict emotion
    predicted_emotion, processed_image = preprocess_and_predict(image_path)
    
    if predicted_emotion:
        print(f"Predicted Emotion: {predicted_emotion}")

        # Display the processed image with the face rectangle and emotion label
        cv2.imshow("Emotion Detection", processed_image)
        cv2.waitKey(0)
        cv2.destroyAllWindows()
    else:
        print("Error: Could not process the image for emotion detection.")

if __name__ == "__main__":
    main()
