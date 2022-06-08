import pandas as pd
from pandasql import sqldf
import sys

import boto3

#download dp data as a csv file 
AWS_S3_BUCKET = "acteur1"
AWS_ACCESS_KEY_ID = sys.argv[1]
AWS_SECRET_ACCESS_KEY = sys.argv[2]
"""
s3_client = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
)

response = s3_client.get_object(Bucket=AWS_S3_BUCKET, Key="tcl_sytral.csv")

status = response.get("ResponseMetadata", {}).get("HTTPStatusCode")

if status == 200:
    globals()["tcl"] = pd.read_csv(response.get("Body"))
else:
    print("{message: Unsuccessful S3 get_object response}")
"""
globals()["tcl"] = pd.read_csv("C:/Users/nhammadou/Downloads/tcl_sytral.csv")

#print(data.head())

print(sqldf(sys.argv[3], locals()).to_json(orient="table"))