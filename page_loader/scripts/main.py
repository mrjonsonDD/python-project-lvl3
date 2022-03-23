from page_loader.parse_args import parse_cli_args
from page_loader.download import download
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
    except Exception:
        logging.error('Error')
        sys.exit(1)
    else:
        sys.exit(0)


if __name__ == '__main__':
    main()
