from flask import Flask, render_template, abort
from moods_data import MOODS, get_mood

app = Flask(__name__)

# ---------------------------
# ROUTE: Főoldal
# ---------------------------
@app.route("/")
def index():
    # A frontendnek átadjuk az összes hangulatot
    return render_template("index.html", moods=MOODS)


# ---------------------------
# ROUTE: Egy hangulat oldala
# ---------------------------
@app.route("/mood/<slug>")
def mood_page(slug):
    mood = get_mood(slug)
    if not mood:
        abort(404)
    return render_template("mood.html", mood=mood)


# ---------------------------
# HIBAOLDAL: 404
# ---------------------------
@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404


# ---------------------------
# INDÍTÁS
# ---------------------------
if __name__ == "__main__":
    app.run(debug=True)
