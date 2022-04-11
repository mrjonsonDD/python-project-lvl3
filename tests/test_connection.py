import pytest
from tempfile import TemporaryDirectory
from requests.exceptions import Timeout, ConnectionError, HTTPError
from page_loader import download
from tests.test_downloader import URL_TEST


@pytest.mark.parametrize('exc', [
    Timeout, ConnectionError, HTTPError])
def test_response_with_error(requests_mock, exc):
    requests_mock.get(URL_TEST, exc=exc)
    with TemporaryDirectory() as tmpdirname:
        with pytest.raises(Exception):
            assert download(URL_TEST, tmpdirname)



