# We need to import the python version of the opencv library
import cv2
import time

# Open our webcam and set the resolution to 320x240
cap = cv2.VideoCapture(0) # 0 is default webcam
cap.set(3, 320) # 3 is width
cap.set(4, 240) # 4 is height

# Load our classifier provided by OpenCV, this one has been trained to find the front of a face
classifer = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

# Classifiers are large files so we need a sleep to make sure the file has been completely loaded
time.sleep(1)

# Run our program forever (until q pressed)
while(True):
    # We want to read the image from out camera - img is the image frame, _ can be ignored
    _, img = cap.read()
    # The classifier was trained on grayscale images we need to convert it to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # We can apply our classifier to the grayscale image, 1.3 and 5 set the min and max scales we should be looking for a face
    faces = classifer.detectMultiScale(gray, 1.3, 5)
    # faces contains a x, y, w, and h for each face detected
    for (x, y, w, h) in faces:
        # We can draw an opencv rectangle with the face locations provided, writing it to our original image
        cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2) # OpenCV uses BGR instead of RGB, the 2 is the line thickness

    # We can show our image in a window called 'Face Tracking'
    cv2.imshow('Face Tracking', img)
    
    # Only way to close window other than Ctrl+C
    if cv2.waitKey(1) & 0xFF == ord('q'):
        # Release the webcam
        cap.release()
        # Destory the window we created
        cv2.destroyAllWindows()
        break