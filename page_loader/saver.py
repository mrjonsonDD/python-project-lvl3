import os
import logging
import requests
from progress.bar import IncrementalBar


def create_dir(path):
    logging.info('Checking for the directory -> creating it')
    try:
        os.mkdir(path)
    except IOError as e:
        raise Exception('Your folder is incorrect') from e


def save_file(data, path):
    logging.info('Writing binary info to file, saving it')
    try:
        with open(path, 'wb') as file:
            file.write(data)
    except IOError as e:
        raise Exception('Your folder is incorrect') from e


def upload_files(source):
    logging.info('Uploading resources from page to local folder')
<<<<<<< HEAD
    bar = IncrementalBar('Processing', max=len(source), suffix='%(percent)d%%')
=======
    bar = IncrementalBar('хуй', max=len(source))
>>>>>>> f77daa26720b0366208a8d85b599f65bd55a2f93
    for link, path in source:
        try:
            r = requests.get(link)
            r.raise_for_status()
        except requests.exceptions.HTTPError as e:
            raise Exception('Connection failed') from e
        else:
            data = r.content
            save_file(data, path)
            bar.next()
        finally:
            continue
    bar.finish()
