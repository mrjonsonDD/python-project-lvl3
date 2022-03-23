import os
import logging
from progress.bar import IncrementalBar
from page_loader.loader import load_page, format_local_name, edit_page
from page_loader.saver import create_dir, save_file, upload_files


logger = logging.getLogger(__name__)


def download(url, cli_path):
    bar = IncrementalBar('Loading page', max=5, suffix='%(percent)d%%')
    html_page = load_page(url)
    bar.next()
    name_page = format_local_name(url)
    path_page = os.path.join(cli_path, name_page)
    bar.next()
    name_files_folder = format_local_name(url, dir=True)
    path_files_folder = os.path.join(cli_path, name_files_folder)
    bar.next()
    create_dir(path_files_folder)
    bar.next()
    edited_page, resources = \
        edit_page(html_page, url, path_files_folder)
    bar.next()
    save_file(edited_page, path_page)
    bar.next()
    upload_files(resources)
    bar.finish()
    logger.debug('Page and resources loaded')
    return path_page
