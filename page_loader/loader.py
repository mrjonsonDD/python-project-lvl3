import requests
import re
import os
import logging
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin


RED1 = '\033[31m'
RED2 = '\033[37m'

logger = logging.getLogger(__name__)
WANTED_TAGS = {'link': 'href', 'img': 'src', 'script': 'src'}


def is_local(pointer, url):
    logging.info('Checking if file is local')
    parsed_url = urlparse(url).netloc
    parsed_pointer = urlparse(urljoin(url, pointer)).netloc
    return parsed_url == parsed_pointer


def edit_page(html_page, url, path_files_folder):
    logging.info('Editing page and getting links for wanted tags')
    dir_path, dir_name = os.path.split(path_files_folder)
    soup = BeautifulSoup(html_page, 'html.parser')
    elements = [item for item in soup.find_all(list(WANTED_TAGS))
                if is_local(item.get(WANTED_TAGS[item.name]), url)]
    links = []
    for element in elements:
        tag = WANTED_TAGS[element.name]
        link = urljoin(url, element.get(tag, ''))
        if not os.path.splitext(link)[1]:
            resource_path = os.path.join(dir_name, format_local_name(link))
        else:
            resource_path = \
                os.path.join(dir_name, format_local_name(link, file=True))
        element[tag] = resource_path
        links.append((link, os.path.join(dir_path, resource_path)))
    edited_page = soup.prettify("utf-8")
    return edited_page, links


def load_page(url):
    logging.info('Loading page and getting response')
    try:
        response = requests.get(url)
        response.raise_for_status()
    except (requests.exceptions.MissingSchema,
            requests.exceptions.InvalidSchema) as e:
        logging.error(f'{RED1}Wrong address{RED2}')
        raise Exception('Wrong address') from e

    except requests.exceptions.HTTPError as e:
        logging.error(f'{RED1}Connection failed{RED2}')
        raise Exception('Connection failed') from e

    except requests.exceptions.ConnectionError as e:
        logging.error(f'{RED1}Connection error{RED2}')
        raise Exception('Connection error') from e

    return response.text


def format_local_name(url, file=None, dir=None):
    logging.info('Formatting a name')
    link = url.rstrip('/')
    parsed_resource = urlparse(link)
    name = parsed_resource.netloc + parsed_resource.path
    if file:
        final_name = get_file_name(name)
    elif dir:
        final_name = get_dir_name(name)
    else:
        final_name = re.sub(r'\W', '-', name)
        final_name += '.html'
    return final_name


def get_dir_name(name):
    final_name = re.sub(r'\W', '-', name)
    final_name += '_files'
    return final_name


def get_file_name(name):
    name, name_ext = os.path.splitext(name)
    final_name = re.sub(r'\W', '-', name)
    final_name += name_ext
    return final_name
