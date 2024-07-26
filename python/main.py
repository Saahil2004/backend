
import google.generativeai as genai

# Set the API key
api_key = "AIzaSyDRq-ksyhLOI-T4OgkgbvE_Ik6QlqYB9Ck"

# Configure the API key
genai.configure(api_key=api_key)

# Create the model configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

# Initialize the model
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    # safety_settings = Adjust safety settings
    # See https://ai.google.dev/gemini-api/docs/safety-settings
)

# Chat loop without history
# while True:
try:
        pre="convert below para in 50 words  "
        user_input=input("You: ")
        # Start a chat session without history
        chat_session = model.start_chat()
        
        # Send message and get response
        response = chat_session.send_message(pre+user_input)
        
        # Get the text response from the model
        model_response = response.text
        print()
        print()
        print()
        # Print the model's response
        print(f'Bot: {model_response}\n')
       
except Exception as e:
        print(f"An error occurred: {e}")
