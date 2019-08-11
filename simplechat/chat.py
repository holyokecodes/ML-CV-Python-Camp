import random
import re

def processInput(userInput):

    responses = {
        "what": "Cattle — colloquially cows — are the most common type of large domesticated ungulates.",
        "use": "Cattle are commonly raised as livestock for meat (beef or veal, see beef cattle), for milk (see dairy cattle), and for hides, which are used to make leather.",
        "used": "Cattle are commonly raised as livestock for meat (beef or veal, see beef cattle), for milk (see dairy cattle), and for hides, which are used to make leather."
    }

    userInput = re.sub(r'[^\w\s]','', userInput)

    words = userInput.split(" ")

    matchingKeys = []

    for word in words:
        if word in responses.keys():
            matchingKeys.append(word)

    if len(matchingKeys) == 0:
        return "I don't know that"
    elif len(matchingKeys) <= 1:
        return responses[matchingKeys[0]]
    else:
        print("What would you like to know more about?")
        for key in matchingKeys:
            print(key + " ")
        valid = False
        key = ""
        while not valid:
            key = input("?: ").lower()
            if key in matchingKeys:
                break
            else:
                print("Please enter one of the above")
        return responses[key]

def main():
    print("Welcome to Cow Facts! I can talk to you about cows!\n")
    print("Ask me a question or type quit\n")

    while True:
        userInput = input("Whats your question? ").lower()

        if (userInput == "quit"):
            break
        else:
            response = processInput(userInput)
            print(response)

    print("It was good talking to you! Bye!")

main()
