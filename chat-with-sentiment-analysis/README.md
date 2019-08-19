# Chat With Sentiment Analysis

Lets make a new file for this chat, e.g. chat-with-sentiment-analysis.py

This chatbot will be a little simpler as we are moving the logic out of our program and into IBM Cloud.

## Build a Sentiment Classification model
* Create a new Project at https://machinelearningforkids.co.uk/#!/projects
* Train your model with at least five examples of text for each intent label
* Go to Learn & Test, build the model, and test it with new phrases
* Go to Make, select Python, and copy your API key (and code snippet?)
* Add this code to the new file. You can either type it or copy and paste it from the ML for Kids website. This function will pass your text to the machine learning model and return the top result with the highest confidence.

```python
import requests

def classify(text):
    key = "YOUR_KEY_HERE"
    url = "https://machinelearningforkids.co.uk/api/scratch/"+ key + "/classify"

    response = requests.get(url, params={ "data" : text })

    if response.ok:
        responseData = response.json()
        # Use the first match, which is the highest confidence level
        topMatch = responseData[0]
        return topMatch
    else:
        response.raise_for_status()
```

* Test this:

```
response = classify("TEST_QUESTION")
print(response)
```

* Copy and paste your main() function into the new file.
* Change the main loop to use the new classify function.
* Pass the intent to a new function, e.g. processIntent(intent), which will determine which response to use.
* print that response

```python
def main():
    print("Welcome to Cow Facts! I can talk to you about cows!\n")
    print("Ask me a question or type quit\n")

    userInput = ""

    while userInput != "quit":
        userInput = input("Whats your question? ").lower()

        if userInput != "quit":
            intent = classify(userInput)       # Change these lines
            response = processIntent(intent)   # <<
            print(response)                    # <<
            print()

    print("It was good talking to you! Bye!")

main()
```

* Copy and paste your responses. You can remove any duplicate reponses. Make sure that there is a response for each intent that you trained.

```python
responses = {
    "what": "Cattle — colloquially cows — are the most common type of large domesticated ungulates.",
    "use": "Cattle are commonly raised as livestock for meat (beef or veal, see beef cattle), for milk (see dairy cattle), and for hides, which are used to make leather.",
}
```

* The API returns a list of matches. Each match is a dictionary containing the intent label and the confidence that this is the right intent.
* Choose a confidence level that seems appropriate for a correct assignation. If it's less confident than that, return a message that we are unsure. Otherwise, return the appropriate response.

```python
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
```
