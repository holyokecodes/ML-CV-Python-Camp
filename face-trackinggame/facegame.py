# In this game, try to get the target boxes 
# with the box drawn around your head.
import cv2
import time
import random

CAPTURE_WIDTH = 1280
CAPTURE_HEIGHT = 720
cap = cv2.VideoCapture(0)
cap.set(3, CAPTURE_WIDTH)
cap.set(4, CAPTURE_HEIGHT)

classifer = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
time.sleep(1)

# Keep track of our points
points = 0
# If we have hit the target, defaulting to true
hitTarget = True
# target x and y position
tX = 0
tY = 0
# width of the target box
tW = 20

while(True):
    ret, img = cap.read()
    # Flip image on vertical axis so its easier to play, 0 would be horizontal axis
    img = cv2.flip(img, 1)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = classifer.detectMultiScale(gray, 1.3, 5)
    for (x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)

        # Check if our target square is within the bounds of a detected face
        if (x <= tX <= x + w) and (y <= tY <= y + h):
            # If so, flag that we have hit the target and add a point
            hitTarget = True
            points += 1

    # Check if we have hit the target, will also run the first time our game opens
    if hitTarget:
        # Choose a new x position, and subtract the target width so it doesn't appear offscreen
        tX = random.randint(tW, CAPTURE_WIDTH - tW)
        # Same goes with y
        tY = random.randint(tW, CAPTURE_HEIGHT - tW)
        # And reset if we have hit the target
        hitTarget = False

    # Draw our target to the screen with another rectangle
    cv2.rectangle(img, (tX,tY), (tX + tW, tY + tW), (0, 255, 0), 2)

    # Image, Text, Position of Bottom Left, Font, Font Size, Color, Line Type
    cv2.putText(img, "Points: " + str(points), (0,50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 2)

    cv2.imshow('Face Tracking', img)
    
    # Close the OpenCV window if you press 'q' key
    if cv2.waitKey(1) & 0xFF == ord('q'):
        cap.release()
        cv2.destroyAllWindows()
        break