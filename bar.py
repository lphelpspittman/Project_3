from flask import Flask, render_template
import pandas as pd
import json
import plotly
import plotly.express as px

app = Flask(__name__)
@app.route('/')
def plotlyBarChart():
    data_df = pd.read_json("US_Chronic.json")
    fig = px.bar(data_df, x='LocationDesc', y=['Diabetes', 'CardiovascularDisease'], barmode='group',
     labels={
        "LocationDesc": "States",
        "value": "Rates",
        "variable": "Types of Diseases"
     })
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    return render_template('bar.html', graphJSON=graphJSON)
if __name__ == '__main__':
  app.run(debug=True)
    