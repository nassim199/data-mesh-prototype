import pandas as pd
from pandasql import sqldf
import sys

import boto3

#download dp data as a csv file 
nbr_tables = (len(sys.argv) - 4) // 3
AWS_ACCESS_KEY_ID = sys.argv[1]
AWS_SECRET_ACCESS_KEY = sys.argv[2]

s3_client = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
)

for i in range(nbr_tables):
    bucket_name = sys.argv[i + 4]
    table_name = sys.argv[i + nbr_tables + 4]
    key = sys.argv[i + nbr_tables * 2 + 4]
    response = s3_client.get_object(Bucket=bucket_name, Key=key)

    status = response.get("ResponseMetadata", {}).get("HTTPStatusCode")

    if status == 200:
        globals()[table_name] = pd.read_csv(response.get("Body"))
    else:
        print("{message: Unsuccessful S3 get_object response}")



print(sqldf(sys.argv[3], locals()).to_json(orient="table"))
