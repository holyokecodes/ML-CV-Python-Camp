import cv2

orangeLower = (-12, 158, 135)
orangeUpper = (28, 198, 215)

cap = cv2.VideoCapture(0)
cap.set(3, 640)
cap.set(4, 480)

while True:

    _, img = cap.read()

    img = cv2.flip(img, 1)

    blurred = cv2.GaussianBlur(img, (11, 11), 0)
    hsv = cv2.cvtColor(blurred, cv2.COLOR_BGR2HSV)

    mask = cv2.inRange(hsv, orangeLower, orangeUpper)
    mask = cv2.erode(mask, None, iterations=2)
    mask = cv2.dilate(mask, None, iterations=2)

    contours, hierarchy = cv2.findContours(
        mask.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # cv2.drawContours(img, contours, -1, (0,255,0), 3)

    if len(contours) > 0:
        c = max(contours, key=cv2.contourArea)
        # For circle
        # (x,y),radius = cv2.minEnclosingCircle(c)
        # center = (int(x),int(y))
        # radius = int(radius)
        # cv2.circle(img,center,radius,(0,255,0),2)

        x, y, w, h = cv2.boundingRect(c)
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0,), 2)

    cv2.imshow("Soccer", img)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        cap.release()
        cv2.destroyAllWindows()
        break
