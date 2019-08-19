import face_recognition
import cv2
import numpy as np

cap = cv2.VideoCapture(0)
cap.set(3, 640)
cap.set(4, 480)

# Need to use another program/opencv script to get these images
# Maybe we should collect them all on Monday and preformat them for people to use
# So everyone has everyones faces
jacob_image = face_recognition.load_image_file("jacob.jpg")
jacob_face_encoding = face_recognition.face_encodings(jacob_image)[0]

andrew_image = face_recognition.load_image_file("andrew.jpg")
andrew_face_encoding = face_recognition.face_encodings(andrew_image)[0]

known_face_encodings = [
    jacob_face_encoding,
    andrew_face_encoding
]
known_face_names = [
    "Jacob",
    "Andrew"
]

face_locations = []
face_encodings = []
face_names = []
process_this_img = True

while True:
    # Grab a single img of video
    _, img = cap.read()

    # Resize img of video to 1/4 size for faster face recognition processing
    small_img = cv2.resize(img, (0, 0), fx=0.25, fy=0.25)

    # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
    rgb_small_img = small_img[:, :, ::-1]

    # Only process every other img of video to save time
    if process_this_img:
        # Find all the faces and face encodings in the current img of video
        face_locations = face_recognition.face_locations(rgb_small_img)
        face_encodings = face_recognition.face_encodings(rgb_small_img, face_locations)

        face_names = []
        for face_encoding in face_encodings:
            # See if the face is a match for the known face(s)
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            name = "Unknown"

            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = known_face_names[best_match_index]

            face_names.append(name)

    process_this_img = not process_this_img


    # Display the results
    for (top, right, bottom, left), name in zip(face_locations, face_names):
        # Scale back up face locations since the img we detected in was scaled to 1/4 size
        top *= 4
        right *= 4
        bottom *= 4
        left *= 4

        # Draw a box around the face
        cv2.rectangle(img, (left, top), (right, bottom), (0, 0, 255), 2)

        # Draw a label with a name below the face
        cv2.rectangle(img, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(img, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)

    # Display the resulting image
    cv2.imshow('Face Recognition', img)

    # Hit 'q' on the keyboard to quit!
    if cv2.waitKey(1) & 0xFF == ord('q'):
        cap.release()
        cv2.destroyAllWindows()
        break