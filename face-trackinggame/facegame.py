import cv2
import time
# Will need random to choose our box positions
import random

cap = cv2.VideoCapture(0)
cap.set(3, 320)
cap.set(4, 240)

classifer = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
time.sleep(1)

# We need to keep track of our points
points = 0
# If we have hit the target, defaulting to true
hitTarget = True
# And the targets x, y and width
tX = 0
tY = 0
# Set the width to 20 for now, we can change this to best suit your game
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
        if (tX >= x and tX <= x + w) and (tY >= y and tY <= y + h):
            # If so, flag that we have hit the target and add a point
            hitTarget = True
            points += 1

    # Check if we have hit the target, will also run the first time our game opens
    if hitTarget:
        # Choose a new x position, the 640 is our width * 2, and we subtract the width so it doesn't appear offscreen
        tX = random.randint(tW, 640 - tW)
        # Same goes with y but the 480 is our width * 2
        tY = random.randint(tW, 480 - tW)
        # And reset if we have hit the target
        hitTarget = False

    # Draw our target to the screen with another rectangle
    cv2.rectangle(img, (tX,tY), (tX + tW, tY + tW), (0, 255, 0), 2)

    # Image, Text, Position of Bottom Left, Font, Font Size, Color, Line Type
    cv2.putText(img, "Points: " + str(points), (0,50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 2)

    cv2.imshow('Face Tracking', img)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        cap.release()
        cv2.destroyAllWindows()
        break