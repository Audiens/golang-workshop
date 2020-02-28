from sklearn.feature_extraction import DictVectorizer
import json
from pandas import json_normalize

v = DictVectorizer(sparse=False)

with open('sampled_profile_20.txt') as data_file:
    lines = data_file.readlines()
    joined_lines = "[" + ",".join(lines) + "]"
    json_data = json.loads(joined_lines)

df = json_normalize(joined_lines)

X = v.fit_transform(df)