import requests

URL = 'https://somecontent.com'

def test_500(URL):
    response = requests.get(URL)
    if response.status_code == 500:
        pass
