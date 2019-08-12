import cv2
import time

cap = cv2.VideoCapture(0)
cap.set(3, 320)
cap.set(4, 240)

classifer = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
time.sleep(1)

while(True):
    ret, img = cap.read()
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = classifer.detectMultiScale(gray, 1.3, 5)
    for (x, y, w, h) in faces:
        # OpenCV uses BGR instead of RGB
        cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)

    cv2.imshow('Face Tracking', img)
    
    # Only way to close window other than Ctrl+C
    if cv2.waitKey(1) & 0xFF == ord('q'):
        cap.release()
        cv2.destroyAllWindows()
        break