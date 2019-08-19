# Chat with Natural Language

We are now going to use natural language to run a chatbot

Natural Language Processing uses a machine learning algorithm to find not keywords, but the backbone behind sentences to find what you should mean.

So we are going to make a new file, call it input.txt

In this file we want to paste our wikipedia article

We can get this from http://wikipedia.thetimetube.com/ and search your article

Copy the text into your input.txt file

Then we need to do some setup to get NLTK (natural language toolkit setup)

In the console type the following lines:
```
python
import nltk
nltk.download('punkt')
nltk.download('wordnet')
quit()
```

And now we can get started with our new chatbot

```python
import nltk
import numpy as np
import random
import string
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

f = open('robot.txt', 'r', errors='ignore')
raw = f.read()
raw = raw.lower()

sent_tokens = nltk.sent_tokenize(raw) # Turns the raw text file into sentence tokens that are searchable by NLTK
word_tokens = nltk.word_tokenize(raw) # Turns the raw text file into word tokens that are searchable by NLTK

lemmer = nltk.stem.WordNetLemmatizer() # a lemmer will be how we find the base dictionary version of a word
# using = use

# Small function to find the lemma of our tokens
def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]

# We need to rip the punctuation out of the file so we will make a table with the punctuation rules
remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)

# Takes our text and applies our punctuation rules
def LemNormalize(text):
    return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))


GREETING_INPUTS = ("hello", "hi", "greetings", "sup", "what's up", "hey",)
GREETING_RESPONSES = ["hi", "hey", "*nods*", "hi there",
                      "hello", "I am glad! You are talking to me"]

# Get a random greeting for the user
def greeting(sentence):
    for word in sentence.split():
        if word.lower() in GREETING_INPUTS:
            return random.choice(GREETING_RESPONSES)

# Generate a response from NLTK
def response(user_response):
    bot_response = ''
    sent_tokens.append(user_response) # Add our input to the sentence tokens
    # Next bit is very complicated, goal is to find the closest match between what we asked and whats in the text file
    TfidfVec = TfidfVectorizer(tokenizer=LemNormalize) # Used to identify key features of our text
    tfidf = TfidfVec.fit_transform(sent_tokens) # Learn the vocabulary of all our sentences
    vals = cosine_similarity(tfidf[-1], tfidf) # Find the distances between each value found
    
    # Find the best result
    idx = vals.argsort()[0][-2]
    flat = vals.flatten()
    flat.sort()
    req_tfidf = flat[-2]
    
    # If there was no results
    if(req_tfidf == 0):
        bot_response = bot_response+"I am sorry! I don't understand you"
        return bot_response
    else:
        # Good result!
        bot_response = bot_response+sent_tokens[idx]
        return bot_response


flag = True
print("ROBOTBOT: My name is RobotBot. I will answer your queries about Robots. If you want to exit, type Bye!")
while(flag == True):
    user_response = input('USER: ')
    user_response = user_response.lower()
    if(user_response != 'bye'):
        if(user_response == 'thanks' or user_response == 'thank you'):
            flag = False
            print("ROBOTBOT: You are welcome..")
        else:
            if(greeting(user_response) != None):
                print("ROBOTBOT: "+greeting(user_response))
            else:
                print("ROBOTBOT: ", end="")
                print(response(user_response))
                sent_tokens.remove(user_response)
    else:
        flag = False
        print("ROBOTBOT: Bye! take care..")
```
