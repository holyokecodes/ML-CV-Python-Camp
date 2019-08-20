# Chat with Natural Language

We are now going to use natural language processing to run a chatbot.

The Natural Language Toolkit (nltk) uses a machine learning algorithm to find not keywords, but the backbone behind sentences to understand what you mean.

We are going to make a new file, call it input.txt

In this file we want to paste our Wikipedia article

We can get this from http://wikipedia.thetimetube.com/ and search your article

Copy the text into your input.txt file

Then we need to do some setup to get NLTK setup.

In the console type the following lines:
```
python
import nltk
nltk.download('punkt')
nltk.download('wordnet')
exit()
```

And now we can get started with our new chatbot

```python
# Chatbot that uses Natural Language Toolkit to analyze questions
# and determine appropriate responses.
import nltk
import numpy as np
import random
import string # for the list of punctation characters
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Before you can run need to setup wordnet
#> python
#> import nltk
#> nltk.download('punkt')
#> nltk.download('wordnet')
#> quit()

# Can grab raw wikipedia text from http://wikipedia.thetimetube.com/
f = open('robot.txt', 'r')
raw = f.read()

sentence_tokens = nltk.sent_tokenize(raw)

lemmer = nltk.stem.WordNetLemmatizer()

def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]

remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)

def LemNormalize(text):
    return LemTokens(nltk.word_tokenize(text.translate(remove_punct_dict)))

GREETING_INPUTS = ("hello", "hi", "greetings", "sup", "what's up", "hey",)
GREETING_RESPONSES = ["hi", "hey", "*nods*", "hi there",
                      "hello", "I am glad! You are talking to me"]

def greeting(sentence):
    for word in sentence.split():
        if word.lower() in GREETING_INPUTS:
            return random.choice(GREETING_RESPONSES)

def response(user_input):
    sentence_tokens.append(user_input)
    TfidfVec = TfidfVectorizer(tokenizer=LemNormalize)
    tfidf = TfidfVec.fit_transform(sentence_tokens)
    # Compare all tokens to the last token
    # Similarity 1 = identical, 0 = no similarity
    vals = cosine_similarity(tfidf[-1], tfidf)
    # Get the index of the most similar token
    idx = vals.argsort()[0][-2]
    # Get the value of the most similar token
    # vals is a list inside a list, so flatten it
    flat = vals.flatten()
    # Then sort it from lowest to highest
    flat.sort()
    # The original question is the last one [-1] with a value of 1
    # The next best response will be [-2]
    best_response = flat[-2]
    # If the value of the most similar token is 0
    # then we don't know how to respond.
    if best_response == 0:
        return "I am sorry! I don't understand you"
    else:
        return sentence_tokens[idx]

print("ROBOTBOT: My name is RobotBot. I will answer your queries about Robots. If you want to exit, type Bye!")
while (True):
    user_input = input('YOU: ').lower()
    print("ROBOTBOT: ", end="")
    if user_input != 'bye':
        if user_input == 'thanks' or user_input == 'thank you':
            print("You are welcome..")
            break
        else:
            if greeting(user_input) != None:
                print(greeting(user_input))
            else:
                print(response(user_input))
                sentence_tokens.remove(user_input)
    else:
        print("Bye! take care..")
        break

```
