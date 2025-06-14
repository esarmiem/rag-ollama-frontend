from flask import Flask, request
from flask_cors import CORS
import os
from langchain_community.llms import Ollama

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}})

folder_path ="db" 