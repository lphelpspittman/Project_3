from flask import Flask, jsonify, render_template
import pandas as pd
import numpy as np

app = Flask(__name__)

#Reading data
data_df = pd.read_json("static/data/US_Chronic.json")


@app.route('/')
def index():
   return render_template('index.html')

def data_creation(data, values, class_labels, group=None):
   for index, item in enumerate(values):
       data_instance = {}
       data_instance['category'] = class_labels[index]
       data_instance['value'] = item
       data_instance['group'] = group
       data.append(data_instance)

@app.route('/get_barchart_data')
def get_barchart_data():
   state_labels = data_df['LocationDesc']
   select_df = data_df[['LocationDesc','Diabetes']]
   _ = select_df.groupby('LocationDesc').size().values

   barchart_data = []
   data_creation(barchart_data,select_df['Diabetes'], state_labels, "All")

   return jsonify(barchart_data)

if __name__ == '__main__':
   app.run(debug=True)