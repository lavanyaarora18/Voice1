from flask import Flask, jsonify
import speech_recognition as sr
import pyttsx3
import webbrowser
import requests
import random
import wikipedia
import datetime
import multiprocessing
import yt_dlp

app = Flask(__name__)

# Initialize the text-to-speech engine
engine = pyttsx3.init()

def speak(text):
    """Convert text to speech"""
    engine.say(text)
    engine.runAndWait()

def greet():
    """Greet the user with the date and time"""
    now = datetime.datetime.now()
    current_time = now.strftime("%H:%M")
    current_date = now.strftime("%B %d, %Y")
    current_day = now.strftime("%A")

    speak(f"Good day! Today is {current_day}, {current_date}. The time is {current_time}.")
    speak("I am Siphra. How can I assist you today?")

def take_command():
    """Capture voice input from the user"""
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        try:
            recognizer.adjust_for_ambient_noise(source)
            audio = recognizer.listen(source, timeout=5)
            command = recognizer.recognize_google(audio)
            print(f"You said: {command}")
            return command.lower()
        except sr.WaitTimeoutError:
            print("No response, try again.")
            return None
        except sr.UnknownValueError:
            print("Sorry, I didn't understand that.")
            return None
        except Exception as e:
            print(f"Error: {e}")
            return None
        

def get_news():
    api_key = '077f38eb2eb44c53aed07fa62edbf5e9'  # Replace with your News API key
    url = f'https://newsapi.org/v2/top-headlines?country=us&apiKey={api_key}'
    response = requests.get(url)
    news = response.json()
    articles = news['articles']
    if articles:
        for article in articles[:5]:  # Read top 5 news articles
            speak(article['title'])
    else:
        speak("Sorry, I couldn't fetch the news.")


def tell_joke():
    jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "What do you call fake spaghetti? An impasta!",
        "Why did the bicycle fall over? Because it was two-tired!",
        "What do you call cheese that isn't yours? Nacho cheese!"
    ]
    joke = random.choice(jokes)
    speak(joke)


def tell_random_fact():
    fact = wikipedia.summary("Random fact", sentences=1)
    speak(fact)


def get_weather(city):
    api_key = '93dda482c9f4e19b3dbe90fa36c0dcf9'  
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    response = requests.get(url)
    weather = response.json()
    if weather['cod'] == 200:
        temp = weather['main']['temp']
        description = weather['weather'][0]['description']
        speak(f"The current temperature in {city} is {temp} degrees Celsius with {description}.")
    else:
        speak("Sorry, I couldn't fetch the weather information.")


def get_youtube_video_url(video_name):
    """Get the direct URL of the first YouTube video using yt_dlp"""
    ydl_opts = {
        'format': 'best',
        'quiet': True
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            info = ydl.extract_info(f"ytsearch:{video_name}", download=False)['entries'][0]
            return info['webpage_url']
        except Exception as e:
            print(f"Error fetching video: {e}")
            return None

def play_youtube_video(video_name):
    """Play the first YouTube video found"""
    speak(f"Searching for {video_name} on YouTube.")
    video_url = get_youtube_video_url(video_name)
    if video_url:
        speak(f"Playing {video_name} now.")
        webbrowser.open(video_url)
    else:
        speak("Sorry, I couldn't find any videos.")

def process_command(command):
    """Process user commands"""
    if not command:
        return

    if 'play' in command and 'youtube' in command:
        video_name = command.replace("play", "").replace("youtube", "").strip()
        play_youtube_video(video_name)
    
    elif 'search' in command:
        query = command.replace("search", "").strip()
        webbrowser.open(f"https://www.google.com/search?q={query}")
        speak(f"Searching for {query} on Google.")

    elif 'open google' in command:
        webbrowser.open("https://www.google.com")
        speak("Opening Google.")

    elif 'news' in command:
                get_news()

    elif 'joke' in command:
                tell_joke()

    elif 'fact' in command:
                tell_random_fact()

    elif 'weather' in command:
                city = command.replace("weather", "").strip()
                get_weather(city)

    elif 'stop' in command or 'exit' in command:
        speak("Goodbye!")
        return "exit"

def run_assistant():
    """Main function to run the assistant"""
    greet()
    while True:
        command = take_command()
        if command:
            result = process_command(command)
            if result == "exit":
                break

@app.route('/run-python', methods=['GET'])
def run_python():
    """Start the assistant when the button is clicked"""
    process = multiprocessing.Process(target=run_assistant)
    process.start()
    return jsonify({"message": "Voice assistant started!"})

if __name__ == '__main__':
    app.run(debug=True)