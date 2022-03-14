import requests
import os
import logging
from requests.exceptions import HTTPError as BaseHTTPError
from progress.bar import IncrementalBar


TAGS = {'link': 'href', 'img': 'src', 'script': 'src'}


class KnownError(Exception):
    pass


def changing_logging_lvel(level_logging: str) -> None:
    dict_of_level = {DEBUG: logging.DEBUG,
                     WARNING: logging.WARNING,
                     ERROR: logging.ERROR,
                     CRITICAL: logging.CRITICAL,
                     INFO: logging.INFO,
                     }
    return logging.basicConfig(format='%(asctime)s %(levelname)s:%(message)s',
                               level=dict_of_level[level_logging])



def formation_local_name(url):
    logging.info('Creating a name')
    link = url.rstrip('/')
    o = urlparse(link)
    name = o.netloc + o.path
    if file:
        name, extension = os.path.splittext(name)
    final_name = ''
    letter_new = re.sub(r'W', '-', name)
    final_name += letter_new
    if file:
        final_name += extension
    elif dir:
        final_name += '_files'
    else:
        final_name += '.html'
    return final_name


def create_directory(path: str) -> None:
    logging.info('Сhecking the directory')
    try:
        os.mkdir(path)
    except IOError as e:
        raise KnownError('Your folder is incorrect') from e


def save_file(changed_page: Union[str, bytes],
              path_page: str, mode='wb') -> None:
    logging.info('Saving page')
    try:
        with open(path_page, mode) as file:
            file.write(changed_page)
    except IOError as e:
        raise KnownError('Your folder is incorrect') from e


def load_page(link: str) -> str:
    logging.info('Loading page')
    try:
        page = requests.get(link)
        page.raise_for_status()
    except (requests.exceptions.MissingSchema,
            requests.exceptions.InvalidSchema) as e:
        raise KnownError('Wrong address!') from e
    except requests.exceptions.HTTPError as e:
        raise KnownError('Connection failed') from e
    except requests.exceptions.ConnectionError as e:
        raise KnownError('Connection error') from e
    return page.text


def load_files(source: list) -> None:
    logging.info('Loading links')
    bar = IncrementalBar('Loading links', max=len(source))
    for link, path_to_extra_file in source:
        try:
            r = requests.get(link, stream=True)
            r.raise_for_status()
        except BaseHTTPError as e:
            raise KnownError('Connection failed') from e
        else:
            data = r.content
            save_file(data, path_to_extra_file, mode='wb')
        finally:
            continue
            bar.next()
    bar.finish()


def is_local(link, url: str) -> bool:
    netloc_first = urlparse(url).netloc
    netloc_second = urlparse(urljoin(url, link)).netloc
    return netloc_first == netloc_second


def edit_links_to_local(page: str, url: str,
                        path_to_folder_for_files: str) -> tuple:
    logging.info('Edit links')
    dir_path, dir_name = os.path.split(path_to_folder_for_files)
    soup = BeautifulSoup(page, 'html.parser')
    elements = [element for element in soup.find_all(list(TAGS))
                if is_local(element.get(TAGS[element.name]), url)]
    result = []
    for element in elements:
        tag = TAGS[element.name]
        link = urljoin(url, element.get(tag, ''))
        if os.path.splitext(link)[1] == '':
            resource_path = os.path.join(dir_name, formation_local_name(link))
        else:
            resource_path = os.path.join(dir_name,
                                         formation_local_name(link, file=True))
        element[tag] = resource_path
        result.append((link, os.path.join(dir_path, resource_path)))
    changed_page = soup.prettify("utf-8")
    return changed_page, result
