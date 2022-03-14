from page_loader.download import download
from page_loader.loader import changing_logging_lvel, KnownError
from page_loader.parse_args import cli_parser
import logging
import sys


def main() -> None:
    namespace = cli_parser()
    url = namespace.URL
    path = namespace.output
    level_log = namespace.level
    changing_logging_lvel(level_log)
    try:
        file_path = download(url, path)
        print(f'Page saved in {file_path}')
    except KnownError:
        logging.error('Error')
        sys.exit(1)
    else:
        sys.exit(0)


if __name__ == '__main__':
    main()