import json , time
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import requests
import shutil
import numpy as np
import speech_recognition as sr
recognizer = sr.Recognizer()
import pickle
import os
from pydub import AudioSegment

app = Flask(__name__)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response
@app.route('/voice', methods=['POST'])
def voice():
    
    try:
        
        request_data = request.get_json()

        audio_url = str("upload/"+(request_data['url'].split(".")[0]))
        word=request_data['word']

        print(audio_url)

        commandwav = "ffmpeg -i "+audio_url+".mp3 "+audio_url+".wav"
        os.system(commandwav)

        with sr.AudioFile(audio_url+".wav") as source:
            audio = recognizer.record(source)
        time.sleep(1)

        text = recognizer.recognize_google( audio , language="en-US" )
        print("Text: "+text)

        json_dump = json.dumps({"result":str(text),"success":"true"})

        return json_dump
        
    except:
        json_dump = json.dumps({"success":"false"})

        return json_dump

if __name__ == '__main__':
	app.run(host="127.0.0.1", port=5555)