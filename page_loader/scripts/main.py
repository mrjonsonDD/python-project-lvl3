from page_loader.parse_args import parse_cli_args
from page_loader.download import download
from requests.exceptions import RequestException
import logging
import sys


logger = logging.getLogger(__name__)


def main():
    logger.info('STARTING')
    arguments = parse_cli_args()
    url = arguments.URL
    output_path = arguments.output
    try:
        file_path = download(url, output_path)
        print(f'Page saved in: {file_path}')
    except RequestException as err:
        text = 'ATTENTION: Error The request failed...'
        logging.error("\033[31m {}{}\033[37m" .format(text, err))
    except OSError as err:
        text = 'ATTENTION: System error...'
        logging.error("\033[31m {}{}\033[37m" .format(text, err))
    except Exception:
        text = 'ATTENTION: Error occurred while uploading a file...'
        logging.error("\033[31m {}\033[37m" .format(text))
        sys.exit(1)
    else:
        sys.exit(0)


if __name__ == '__main__':
    main()
