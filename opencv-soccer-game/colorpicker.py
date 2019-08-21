import cv2
import numpy as np

pixel = (0,0,0)
imageHSV = None

cap = cv2.VideoCapture(0)
cap.set(3, 640)
cap.set(4, 480)

def pickColor(event,x,y,flags,param):
    if event == cv2.EVENT_LBUTTONDOWN:
        pixel = imageHSV[y,x]

        upper =  np.array([pixel[0] + 20, pixel[1] + 20, pixel[2] + 40])
        lower =  np.array([pixel[0] - 20, pixel[1] - 20, pixel[2] - 40])
        print("Lower: " + str(lower))
        print("Upper: " + str(upper))

        image_mask = cv2.inRange(imageHSV,lower,upper)
        cv2.imshow("mask",image_mask)

while True:
    _, img = cap.read()

    cv2.namedWindow('hsv')
    cv2.setMouseCallback('hsv', pickColor)
    blurred = cv2.GaussianBlur(img, (11, 11), 0)
    imageHSV = cv2.cvtColor(blurred,cv2.COLOR_BGR2HSV)
    cv2.imshow("hsv",imageHSV)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        cap.release()
        cv2.destroyAllWindows()
        break