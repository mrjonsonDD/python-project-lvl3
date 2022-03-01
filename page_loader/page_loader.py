from ast import Pass
import os
import requests


def download(url, path):
    name_page = format_name(url)
    path_page = os.path.join(path, name_page)
    return path_page


def format_name(url, file=None, dir=None):
    pass
