from flask import Flask, render_template, request, jsonify, abort
from moods_data import MOODS, get_mood
from chatbot import ChatbotSession

app = Flask(__name__)


chat_sessions = {}


@app.route("/")
def index():
    return render_template("index.html", moods=MOODS)


@app.route("/mood/<slug>")
def mood_page(slug):
    mood = get_mood(slug)
    if not mood:
        abort(404)


    if slug not in chat_sessions:
        chat_sessions[slug] = ChatbotSession(persona=mood["persona"])

    return render_template("mood.html", mood=mood)


@app.route("/mood/<slug>/chat", methods=["POST"])
def mood_chat(slug):
    mood = get_mood(slug)
    if not mood:
        return jsonify({"error": "Nincs ilyen hangulat"}), 404

    data = request.get_json()
    message = data.get("message", "").strip()

    if not message:
        return jsonify({"error": "Üres üzenet"}), 400

    session = chat_sessions.get(slug)

    if session is None:
        session = ChatbotSession(persona=mood["persona"])
        chat_sessions[slug] = session

    ai_reply = session.ask(message)

    return jsonify({
        "reply": ai_reply,
        "mood": mood["name"]
    })


@app.errorhandler(404)
def err_404(e):
    return render_template("404.html"), 404


if __name__ == "__main__":
    app.run(debug=True)
