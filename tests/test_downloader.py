from page_loader.download import download
from page_loader.saver import upload_files
from page_loader.loader import format_local_name
import tempfile
import pytest
import os


URL_TEST = 'http://knopka.ush.ru/'

PATH_FIXTURES_MOCK_lINKS = {
    'tests/fixtures/before_test_page.html': 'http://knopka.ush.ru/',
    'tests/fixtures/test_css.css': 'http://knopka.ush.ru/stl_newstatus.css',
    'tests/fixtures/test_svg.svg': 'http://knopka.ush.ru/images/logo.svg',
}

LOCAL_PATH_NAME = (
    'knopka-ush-ru_files/knopka-ush-ru.html',
    'knopka-ush-ru_files/knopka-ush-ru-stl_newstatus.css',
    'knopka-ush-ru_files/knopka-ush-ru-images-logo.svg',
)


def test_downloader(requests_mock):
    with tempfile.TemporaryDirectory() as temp:
        for fixture, link in PATH_FIXTURES_MOCK_lINKS.items():
            with open(fixture, 'rb') as fixture_file:
                mocking_content = fixture_file.read()
            requests_mock.get(link, content=mocking_content)
        path_load_page = download(URL_TEST, temp)

        with open(os.path.join(temp, path_load_page)) as test_page:
            with open('tests/fixtures/after_test_page.html') as fixture_page:
                assert test_page.read() == fixture_page.read()

        local = [os.path.join(temp, file) for file in LOCAL_PATH_NAME]

        for fixture, local in zip(PATH_FIXTURES_MOCK_lINKS, local):
            with open(fixture, 'rb') as fixture_file:
                with open(local, 'rb') as load_file:
                    assert fixture_file.read() == load_file.read()


@pytest.mark.parametrize('URL, get_name, file_status, dir_status,', [
    ('https://github.com/mrjonsonDD/python-project-lvl3',
     'github-com-mrjonsonDD-python-project-lvl3.html', None, None),
    ('https://github.com/mrjonsonDD/python-project-lvl3',
     'github-com-mrjonsonDD-python-project-lvl3_files', None, True),
    ('https://github.com/mrjonsonDD/python-project-lvl3.css',
     'github-com-mrjonsonDD-python-project-lvl3.css', True, None)
])
def test_get_name(URL, get_name, dir_status, file_status):
    assert format_local_name(URL, file=file_status,
                             dir=dir_status) == get_name


def test_load_files():
    with tempfile.TemporaryDirectory() as temp:
        link_for_test = 'https://github.com/mrjonsonDD/python-project-lvl3'
        path = os.path.join(temp, format_local_name(link_for_test, 'file'))
        upload_files([(link_for_test, path)])
        assert os.path.isfile(path)


@pytest.mark.parametrize('URL, path, exception', [
    ('mrjonsonDD.github.io/github.io/', '/error_path/', 'Wrong address!'),
    ('ht://mrjonsonDD.github.io/github.io/', '/error_path/', 'Wrong address!'),
    ('http://httpdqwasd.org/status/404', '/error_path/', 'Connection failed'),
    ('https://github.com/mrjonsonDD/python-project-lvl3',
     'error_path', 'Your folder is incorrect')
])
def test_errors(URL, path, exception):
    with pytest.raises(Exception):
        download(URL, path)
