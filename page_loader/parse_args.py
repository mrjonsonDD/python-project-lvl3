import argparse
import os
from page_loader.constants import DEBUG, INFO, WARNING, ERROR, CRITICAL



def cli_parser():
    parser = argparse.ArgumentParser(description='Loads the URL of the page to a file')
    parser.add_argument('-o', '--output',
                        default=os.getcwd(), type=str,
                        help='folder for saving link')
    parser.add_argument('-l', '--level', type=str, default=INFO,
                        choices=[DEBUG, INFO, WARNING, ERROR, CRITICAL],
                        help='level of logging')
    parser.add_argument('URL', type=str)                    
    return parser.parse_args()
