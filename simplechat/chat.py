import random
import re

def processInput(userInput):

    responses = {
        "what": "Cattle — colloquially cows — are the most common type of large domesticated ungulates.",
        "use": "Cattle are commonly raised as livestock for meat (beef or veal, see beef cattle), for milk (see dairy cattle), and for hides, which are used to make leather.",
        "used": "Cattle are commonly raised as livestock for meat (beef or veal, see beef cattle), for milk (see dairy cattle), and for hides, which are used to make leather."
    }

    prompts = {
        "what": "What are cows?",
        "use": "What use is there for cows?",
        "used": "What are cows used for?"
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
        print("I am not quite sure about what you mean. Did you mean: ")
        index = 1
        for key in matchingKeys:
            print(str(index) + ": " + prompts[key] + " ")
            index += 1
        valid = False
        key = ""
        while not valid:
            selected = int(input("#: ").lower())
            if selected <= len(matchingKeys) and selected > 0:
                break
            else:
                print("Please enter one of the above")
        return responses[matchingKeys[selected - 1]]

def main():
    print("Welcome to Cow Facts! I can talk to you about cows!\n")
    print("Ask me a question or type quit\n")

    userInput = ""

    while userInput != "quit":
        userInput = input("Whats your question? ").lower()

        if userInput != "quit":
            response = processInput(userInput)
            print(response)

    print("It was good talking to you! Bye!")

main()
