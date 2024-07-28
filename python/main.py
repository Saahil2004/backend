from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import spacy
import google.generativeai as genai
import textwrap

app = Flask(__name__)
CORS(app)

# Set the API key for Gemini API
api_key = "AIzaSyDRq-ksyhLOI-T4OgkgbvE_Ik6QlqYB9Ck"

# Configure the API key
genai.configure(api_key=api_key)

# Initialize the Gemini model
model = genai.GenerativeModel(model_name="gemini-1.5-flash")

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Storage for summaries and contexts
url_storage = {}
current_context = None

def extract_text_from_website(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    text = ' '.join([p.get_text() for p in soup.find_all('p')])
    return text

def preprocess_text(text):
    doc = nlp(text)
    tokens = [token.text for token in doc if not token.is_stop and not token.is_punct]
    return ' '.join(tokens)

def summarize_text(text):
    chat_session = model.start_chat()
    response = chat_session.send_message("read: " + text)
    return response.text

def answer_questions(context, question):
    prompt = f"Answer the following question based on the context: {context}\nQuestion: {question}"
    chat_session = model.start_chat()
    response = chat_session.send_message(prompt)
    return response.text

def generate_code(description):
    prompt = f"Generate code for the following description: {description}"
    chat_session = model.start_chat()
    response = chat_session.send_message(prompt)
    
    # Format the code response
    formatted_code = format_code(response.text)
    return formatted_code

def generate_normal_response(text):
    # Generates a normal conversational response
    chat_session = model.start_chat()
    response = chat_session.send_message(text)
    return response.text

def format_code(code):
    # Basic formatting of code to maintain indentation
    return textwrap.dedent(code).strip()

@app.route("/chat", methods=["POST"])
def chat_endpoint():
    global current_context
    try:
        data = request.json
        input_text = data.get("text")

        if input_text.startswith("http://") or input_text.startswith("https://"):
            # Treat the input as a URL and summarize the webpage
            raw_text = extract_text_from_website(input_text)
            preprocessed_text = preprocess_text(raw_text)
            summary = summarize_text(preprocessed_text)
            url_storage[input_text] = summary
            current_context = summary
            return jsonify({"response": summary})
        elif input_text.lower().startswith("generate code for"):
            # Handle code generation
            description = input_text[len("generate code for"):].strip()
            code = generate_code(description)
            return jsonify({"response": code})
        else:
            if current_context:
                # If there is a current URL context, use it to answer the question
                response = answer_questions(current_context, input_text)
            else:
                # Handle general queries as normal conversation
                response = generate_normal_response(input_text)
            return jsonify({"response": response})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
