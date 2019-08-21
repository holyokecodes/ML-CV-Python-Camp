import cv2
import numpy as np

image_hsv = None
pixel = (20,60,80)

cap = cv2.VideoCapture(0)
cap.set(3, 640)
cap.set(4, 480)

def pick_color(event,x,y,flags,param):
    if event == cv2.EVENT_LBUTTONDOWN:
        pixel = image_hsv[y,x]

        upper =  np.array([pixel[0] + 20, pixel[1] + 20, pixel[2] + 40])
        lower =  np.array([pixel[0] - 20, pixel[1] - 20, pixel[2] - 40])
        print("Lower: " + str(lower))
        print("Upper: " + str(upper))

        image_mask = cv2.inRange(image_hsv,lower,upper)
        cv2.imshow("mask",image_mask)

def main():
    import sys
    global image_hsv, pixel

    while True:

        _, img = cap.read()

        cv2.namedWindow('hsv')
        cv2.setMouseCallback('hsv', pick_color)
        blurred = cv2.GaussianBlur(img, (11, 11), 0)
        image_hsv = cv2.cvtColor(blurred,cv2.COLOR_BGR2HSV)
        cv2.imshow("hsv",image_hsv)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            cap.release()
            cv2.destroyAllWindows()
            break


main()