from pymongo import MongoClient
from flask import Flask, jsonify

app = Flask(__name__)
client = MongoClient(port=27017)
db = client.US_Chronic

@app.route("/")
def home():
    chronic = db.US_Chronic.find({})
    list1 = []
    lc = list(chronic)
    for item in lc:
        list1.append({"Location":item["LocationDesc"], "Cardio":item["CardiovascularDisease"], "Diabetes":item["Diabetes"]})
    return jsonify(list1)

if __name__ == '__main__':
    app.run(debug=True)