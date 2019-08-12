import cv2
import time
import random

cap = cv2.VideoCapture(0)
cap.set(3, 320)
cap.set(4, 240)

classifer = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
time.sleep(1)

points = 0
hitTarget = True
tX = 0
tY = 0
tW = 20

while(True):
    ret, img = cap.read()
    # Flip image on vertical axis so its easier to play
    img = cv2.flip(img, 1)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = classifer.detectMultiScale(gray, 1.3, 5)
    for (x, y, w, h) in faces:
        # OpenCV uses BGR instead of RGB
        cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)

        if (tX >= x and tX <= x + w) and (tY >= y and tY <= y + h):
            hitTarget = True
            points += 1


    if hitTarget:
        tX = random.randint(tW, 640 - tW)
        tY = random.randint(tW, 480 - tW)
        hitTarget = False

    cv2.rectangle(img, (tX,tY), (tX + tW, tY + tW), (0, 255, 0), 2)

    # Image, Text, Position of Bottom Left, Font, Font Size, Color, Line Type
    cv2.putText(img, "Points: " + str(points), (0,50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 2)

    cv2.imshow('Face Tracking', img)
    
    # Only way to close window other than Ctrl+C
    if cv2.waitKey(1) & 0xFF == ord('q'):
        cap.release()
        cv2.destroyAllWindows()
        break