import itertools

import pandas as pd
import os

"""
ID biopsie
Diagnóza
Onkologický kód
Kód pojišťovna
příjem LMP
uzavření LMP
patient ID	
"""


def get_column(column, path: str = '../dataset/PriorityData.xlsx') -> list[str]:
    """ Get the first column of the dataset """
    df = pd.read_excel(path)
    return df.iloc[:, column].tolist()


def get_columns_from_sheets(path: str) -> list[list[str]]:
    xls = pd.ExcelFile(path)
    sheets = []
    for sheet_name in xls.sheet_names:

        columns = pd.read_excel(xls, sheet_name).columns.tolist()
        if len(columns) == 0:
            continue
        sheets.append(columns)

    return sheets


def get_columns(path: str = '../dataset/patient_record.xlsx') -> list[str]:
    """ Get the columns of the dataset """
    df = pd.read_excel(path)
    return df.columns.tolist()


def main():
    dataset_path = "../../../dataset/"
    for subdir, dirs, files in os.walk(dataset_path):
        for file in files:
            file_path = os.path.join(subdir, file)
            if file_path.endswith(".xlsx"):
                print(file, ":", ", ".join(get_columns(file_path)))


def print_column_differences() -> None:
    sh1 = get_columns_from_sheets('../../../dataset/DG/DG-1-122764-21-j-UMI_S11 (paired)_Filtered_variants_DNA.xlsx')[0]
    sh2 = get_columns_from_sheets('../../../dataset/DG/DG-13217-23-1G_S2 (paired)_Filtered_variants_DNA.xlsx')[0]
    sh3 = get_columns_from_sheets('../../../dataset/DG/DG-14013-23-1A_S1 (paired)_Filtered_variants_DNA.xlsx')[0]
    sh4 = get_columns_from_sheets('../../../dataset/DG/DG-14338-23-plasma-UMI_S10 (paired)_Filtered_variants_DNA.xlsx')[0]

    pairs_of_sh = [
        [sh1, sh2, "1, 2"],
        (sh1, sh3, "1, 3"),
        (sh1, sh4, "1, 4"),
        (sh2, sh3, "2, 3"),
        (sh2, sh4, "2, 4"),
        (sh3, sh4, "3, 4"),
    ]

    for sh_pair in pairs_of_sh:
        print(sh_pair[2], ':')
        print_columns_difference(sh_pair[0], sh_pair[1])
        print()


def print_columns_difference(cols1: list[str], cols2: list[str]) -> None:
    """ Print the difference between two lists of columns """
    print(set(cols1).difference(set(cols2)))
    print(set(cols2).difference(set(cols1)))


if __name__ == '__main__':
    for i in range(3):
        print(get_column(column=i))
