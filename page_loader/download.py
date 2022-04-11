import os
import logging
from progress.bar import IncrementalBar
from page_loader.loader import load_page, format_local_name, edit_page
from page_loader.saver import create_dir, save_file, upload_files


logger = logging.getLogger(__name__)


def download(url, cli_path):
    bar = IncrementalBar('Processing', max=5)
    html_loaded_page = load_page(url)
    bar.next()
    html_page_name = format_local_name(url)
    html_page_path = os.path.join(cli_path, html_page_name)
    bar.next()
    name_files_folder = format_local_name(url, dir=True)
    path_files_folder = os.path.join(cli_path, name_files_folder)
    bar.next()
    create_dir(path_files_folder)
    bar.next()
    edited_page, resources = \
        edit_page(html_loaded_page, url, path_files_folder)
    bar.next()
    save_file(edited_page, html_page_path)
    bar.next()
    upload_files(resources)
    bar.finish()
    logger.debug('Page and resources loaded')
    return html_page_path
