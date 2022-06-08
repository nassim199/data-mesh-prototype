import requests
import pandas as pd

#download dp data as a csv file 
data = pd.read_csv("http://localhost:3000/dp/629f5a3e6c7b1f17cff254cb/get_data")

print(data.head())
#do certain transformations to data
"""
transformation code 

example :
data.new_column = transform(data.old_column)

"""


#upload dataframe to another dp endpoint, again as a csv file
files = {'file': ("tcl2.csv", data.to_csv())}
requests.post("http://localhost:3000/dp/629f5d8f129e1482c3f625f9/upload_data", files=files)