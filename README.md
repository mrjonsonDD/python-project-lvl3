# **Page-loader**
## Hexlet tests and linter status, maintainability, test_coverage (Статут тестов):
[![Actions Status](https://github.com/mrjonsonDD/python-project-lvl3/workflows/hexlet-check/badge.svg)](https://github.com/mrjonsonDD/python-project-lvl3/actions)
<a href="https://codeclimate.com/github/mrjonsonDD/python-project-lvl3/maintainability"><img src="https://api.codeclimate.com/v1/badges/1ee8f6a0a0e65690720c/maintainability" /></a>
<a href="https://codeclimate.com/github/mrjonsonDD/python-project-lvl3/test_coverage"><img src="https://api.codeclimate.com/v1/badges/1ee8f6a0a0e65690720c/test_coverage" /></a>

<hr />

## Description (Описание):
`page-loader` - is a utility that downloads a page from the network and saves it to the specified directory (by default, to the program launch directory

 утилита, которая скачивает страницу из сети и сохраняет ее в указанную директорию (по умолчанию в директорию запуска программы).

<hr />

## Download (Установка):
```python
pip install git+https://github.com/mrjonsonDD/python-project-lvl3.git
```
## Usage (Использование):
```python
$ page-loader --output=/var/tmp -l=error https://hexlet.io/courses
```