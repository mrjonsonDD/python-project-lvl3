from page_loader.loader import (load_page, formation_local_name,
                                create_directory,
                                edit_links_to_local, save_file,
                                load_files)
import logging
import os
from progress.bar import IncrementalBar


def download(url, path):
    bar = IncrementalBar('Loading page', max=5, suffix='%(percent)d%%')
    page = load_page(url)
    bar.next()
    name_page = format_name(url)
    path_page = os.path.join(path, name_page)
    bar.next()
    name_folder = formation_local_name(url, dir=True)
    path_folder = os.path.join(path, name_folder)
    bar.next()
    create_directory(path_folder)
    bar.next()
    changed_page, source_of_files = \
        edit_links_to_local(page, url, path_folder)
    bar.next()
    save_file(changed_page, path_page)
    bar.next()
    load_files(source_of_files)
    bar.next()
    bar.finish()
    logging.info('The page is saved')
    return path_page
