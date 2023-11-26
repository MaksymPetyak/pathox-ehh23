import React, {useRef, useState} from 'react';
import * as XLSX from 'xlsx';
import {ColumnSelection} from "@/components/ColumnSelection";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;


interface FileUploadComponentProps {
    requiredColumns: string[];
    headerText: string
    uploadText: string;
    redirectUrl: string;
    name_map: { [key: string]: string };
    readSheet?: number;
}

function FileUploadComponent({requiredColumns, uploadText, headerText, redirectUrl, name_map, readSheet = 0}: FileUploadComponentProps) {
    const [headers, setHeaders] = useState<string[]>([]);
    const [rows, setRows] = useState<any[][]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [file, setFile]   = useState<File | null>(null);

    const sampleSize = 5

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                const sheetName = workbook.SheetNames[readSheet];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                if (json.length > 0) {
                    setHeaders(json[0]); // Set headers (first row)
                    setRows(json.slice(1, sampleSize + 1)); // Set first n rows
                }
            };
            reader.readAsArrayBuffer(file);
            setFile(file)
        }
    };

    const resetFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setFile(null);
    };

    return (
        <div className="flex flex-col gap-2 justify-center items-center">
            {file && headers.length > 0 && (
                <ColumnSelection
                    headers={headers}
                    rows={rows}
                    file={file}
                    requiredColumns={requiredColumns}
                    redirectUrl={redirectUrl}
                    name_map={name_map}
                />
            )}
            <p className={"bg-transparent text-lg font-semibold"}>{headerText}</p>
            <div
                className="flex flex-col justify-center items-center border-2 border-dashed border-gray-300 bg-white p-6 rounded-lg shadow-md hover:border-gray-400"
                style={{ width: '500px' }}
            >
                <p className="text-sm text-center text-gray-800 font-normal">{uploadText}</p>
                <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 mt-4">
                    <span onClick={resetFileInput}>Upload</span>
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileChange}
                        className="hidden"
                        ref={fileInputRef}
                    />
                </label>
            </div>
        </div>
    );
};

export default FileUploadComponent;
