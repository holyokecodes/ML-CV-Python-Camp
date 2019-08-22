import cv2

orangeLower = (-18, 148, 212)
orangeUpper = (22, 188, 292)
# 217°, 73%, 96%
blueLower = (83, 118, 138)
blueUpper = (123, 158, 218)

cap = cv2.VideoCapture(0)
cap.set(3, 640)
cap.set(4, 480)

def overlap(ballX, ballY, ballRadius, goalX, goalY, goalWidth, goalHeight):
    if(goalX < ballX - ballRadius < goalX + goalWidth):
        if(goalY < ballY - ballRadius < goalY + goalHeight):
            return True
    return False

scored = False
ready = True
while True:

    _, img = cap.read()

    img = cv2.flip(img, 1)

    blurred = cv2.GaussianBlur(img, (11, 11), 0)
    hsv = cv2.cvtColor(blurred, cv2.COLOR_BGR2HSV)

    orangeMask = cv2.inRange(hsv, orangeLower, orangeUpper)
    orangeMask = cv2.erode(orangeMask, None, iterations=2)
    orangeMask = cv2.dilate(orangeMask, None, iterations=2)

    blueMask = cv2.inRange(hsv, blueLower, blueUpper)
    blueMask = cv2.erode(blueMask, None, iterations=2)
    blueMask = cv2.dilate(blueMask, None, iterations=2)

    orangeContours, orangeHierarchy = cv2.findContours(
        orangeMask.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    blueContours, blueHierarchy = cv2.findContours(
        blueMask.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # cv2.drawContours(img, contours, -1, (0,255,0), 3)

    if len(orangeContours) > 0 and len(blueContours) > 0:
        cO = max(orangeContours, key=cv2.contourArea)
        # For circle
        (x,y),radius = cv2.minEnclosingCircle(cO)
        center = (int(x),int(y))
        radius = int(radius)
        cv2.circle(img,center,radius,(0,255,0),2)

        cB = max(blueContours, key=cv2.contourArea)
        xB, yB, wB, hB = cv2.boundingRect(cB)
        cv2.rectangle(img, (xB, yB), (xB + wB, yB + hB), (0, 255, 0,), 2)

        if(overlap(x, y, radius, xB, yB, wB, hB)):
            if not scored and ready:
                scored = True
                ready = False
            else:
                scored = False

    if cv2.waitKey(1) & 0xFF == ord('r'):
        ready = True


    if scored:
        print("Goal!")

    cv2.imshow("Soccer", img)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        cap.release()
        cv2.destroyAllWindows()
        break
