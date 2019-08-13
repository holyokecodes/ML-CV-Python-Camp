import re
import requests

responses = {
    "what": "Cattle — colloquially cows — are the most common type of large domesticated ungulates.",
    "use": "Cattle are commonly raised as livestock for meat (beef or veal, see beef cattle), for milk (see dairy cattle), and for hides, which are used to make leather.",
    "used": "Cattle are commonly raised as livestock for meat (beef or veal, see beef cattle), for milk (see dairy cattle), and for hides, which are used to make leather."
}

# This function will pass your text to the machine learning model
# and return the top result with the highest confidence
def classify(text):
    # Replace this with your API key for the Machine Learning for Kids website
    # This is a front end for the IBM Watson service
    key = "YOUR_KEY_HERE"
    url = "https://machinelearningforkids.co.uk/api/scratch/"+ key + "/classify"

    # API returns a list of matches
    # Each match is a dictionary containing the intent label 
    # and the confidence that this is the right intent.
    response = requests.get(url, params={ "data" : text })

    if response.ok:
        responseData = response.json()
        # Use the first match, which is the highest confidence level
        topMatch = responseData[0]
        return topMatch
    else:
        response.raise_for_status()

def processIntent(intent):
    label = intent["class_name"].lower()
    confidence = intent["confidence"]

    # This is helpful for debugging
    #print ("intent: '%s' with %d%% confidence" % (label, confidence))

    if confidence < 40:
        return "I don't know that."

    if label in responses:
        return responses[label]
    else:
        return "I don't know that"

def main():
    print("Welcome to Cow Facts! I can talk to you about cows!\n")
    print("Ask me a question or type quit\n")

    userInput = ""

    while userInput != "quit":
        userInput = input("Whats your question? ").lower()

        if userInput != "quit":
            intent = classify(userInput)
            response = processIntent(intent)
            print(response)
            print()

    print("It was good talking to you! Bye!")

main()