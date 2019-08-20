# Chatbot that uses Natural Language Toolkit to analyze questions
# and determine appropriate responses.
import nltk
import numpy as np
import random
import string
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Can grab raw wikipedia text from http://wikipedia.thetimetube.com/

# Before you can run need to setup wordnet
#> python
#> import nltk
#> nltk.download('punkt')
#> nltk.download('wordnet')
#> quit()

f = open('robot.txt', 'r')
raw = f.read().lower()

sent_tokens = nltk.sent_tokenize(raw)

lemmer = nltk.stem.WordNetLemmatizer()


def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]


remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)


def LemNormalize(text):
    return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))


GREETING_INPUTS = ("hello", "hi", "greetings", "sup", "what's up", "hey",)
GREETING_RESPONSES = ["hi", "hey", "*nods*", "hi there",
                      "hello", "I am glad! You are talking to me"]


def greeting(sentence):
    for word in sentence.split():
        if word.lower() in GREETING_INPUTS:
            return random.choice(GREETING_RESPONSES)


def response(user_response):
    bot_response = ''
    sent_tokens.append(user_response)
    TfidfVec = TfidfVectorizer(tokenizer=LemNormalize)
    tfidf = TfidfVec.fit_transform(sent_tokens)
    vals = cosine_similarity(tfidf[-1], tfidf)
    idx = vals.argsort()[0][-2]
    flat = vals.flatten().sort()
    req_tfidf = flat[-2]
    if(req_tfidf == 0):
        bot_response = bot_response+"I am sorry! I don't understand you"
        return bot_response
    else:
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
