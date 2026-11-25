"""
Flask Backend for Njogu Wilson Kiiru's Portfolio
Provides local web server and optional REST endpoints for contact inquiry handling.
"""

from flask import Flask, render_template, request, jsonify, send_from_directory
import os
import sqlite3
from datetime import datetime

app = Flask(__name__, static_folder=".", static_url_path="")

DB_FILE = "inquiries.db"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS inquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

init_db()

@app.route("/")
def index():
    return send_from_directory(".", "index.html")

@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    subject = data.get("subject", "").strip()
    message = data.get("message", "").strip()

    if not name or not email or not message:
        return jsonify({"success": False, "error": "Missing required fields"}), 400

    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO inquiries (name, email, subject, message) VALUES (?, ?, ?, ?)",
            (name, email, subject, message)
        )
        conn.commit()
        conn.close()
        return jsonify({"success": True, "message": "Inquiry recorded successfully!"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"Starting Njogu Wilson Kiiru's Portfolio at http://127.0.0.1:{port}")
    app.run(host="0.0.0.0", port=port, debug=True)
