# Building a Basic Chatbot

Our first step will be setting up the structure of our project.

Lets make a new file and call it chat.py

We need to `import re` which will enable use to use regex to do some cleanup of our inputs.

And we need to make the basic structure of our program

```python
def processInput(userInput):
  pass

def main():
  pass
  
main()
```

Now we have our framework we can start filling it in.

Our chatbot is going to be an expert on a wikipedia article so you should find one now

I am going to use https://en.wikipedia.org/wiki/Robot

So lets start writing our program

```python
def main():
  # Print a simple message to let the user know what the chatbot can talk about
  print("Welcome to Cow Facts! I can talk to you about cows!\n")
  print("Ask me a question or type quit\n")

  userInput = ""

  # If the user doesn't say 'quit' then we should keep going
  while userInput != "quit":
      # Ask the user for a question about the subject
      userInput = input("Whats your question? ").lower()

      # IF the users hasn't quit
      if userInput != "quit":
          # Process their input and print the response
          response = processInput(userInput)
          print(response)

  # The user has quit so we can say goodbye
  print("It was good talking to you! Bye!")
```

Now we have the framework for our program finished we need to write the part that will sort out what the user wants

```python
# Takes in the users question and returns a response
def processInput(userInput):

    # List of responses to provide to the user
    responses = {
        "what": "Cattle — colloquially cows — are the most common type of large domesticated ungulates.",
        "use": "Cattle are commonly raised as livestock for meat (beef or veal, see beef cattle), for milk (see dairy cattle), and for hides, which are used to make leather.",
        "used": "Cattle are commonly raised as livestock for meat (beef or veal, see beef cattle), for milk (see dairy cattle), and for hides, which are used to make leather."
    }

    # List of prompts to provide the user if the answer is unclear
    prompts = {
        "what": "What are cows?",
        "use": "What use is there for cows?",
        "used": "What are cows used for?"
    }

    # Filter out white space from the front of the users message and remove all symbols
    userInput = re.sub(r'[^\w\s]','', userInput)

    # Split the users inputs into individual words for key matching
    words = userInput.split(" ")

    # Initial list of keys to match
    matchingKeys = []

    # Loop throught each word in the users input
    for word in words:
        # If the word matches a word in the responses keys
        if word in responses.keys():
            # Add the users word to the matching keys list
            matchingKeys.append(word)

    # If matching keys is empty then no key was found and the chatbot doesn't know about it
    if len(matchingKeys) == 0:
        return "I don't know that"
    # If there is only one matching key then we can just return that response
    elif len(matchingKeys) <= 1:
        return responses[matchingKeys[0]]
    else:
        # There are more than one matching keys so we need clarification
        print("I am not quite sure about what you mean. Did you mean: ")
        index = 1
        # Loop through each key we found
        for key in matchingKeys:
            # Provide a number for selection and the prompt for that key we created above.
            print(str(index) + ": " + prompts[key])
            # Increase the index of the prompts for selection
            index += 1
        # Setup for finding a valid key
        valid = False
        # While we don't have a valid key we want to continue asking for a proper key
        while not valid:
            # Get the number from the user
            selected = int(input("#: "))
            # Check if the number is one of the possible key index
            if selected <= len(matchingKeys) and selected > 0:
                # If it is then we are good to return our response
                valid = True
            else:
                # Otherwise reprompt the user
                print("Please enter one of the above")
        # Return the selected keys response
        return responses[matchingKeys[selected - 1]]
```

And our basic chatbot is done! But its missing some import details, like what if the user doesn't type exactly what we are looking for? Or what if the user asks a question we haven't thought of?

We can fix these using sentiment analysis and natural language processing.
  
