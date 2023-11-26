import FileUploadComponent from "@/components/FileUpload";

const REQUIRED_COLUMNS: string[] = [
    "ID vzorku (blok)",
    "ID biopsie",
    "Diagnóza",
    "Onkologický kód",
    // "Kód pojišťovna", - missing
    "příjem LMP",
    "uzavření LMP",
    "patient ID",
]

// Simple name map to map the column names in files to standardises names
const NAME_MAP: { [key: string]: string } = {
    "dg": "Diagnóza",
    "VFN - onkologie": "Onkologický kód",
    "DNA MSI": "příjem LMP",
    "uzavření LMP": "uzavření LMP",
    "PacientID": "patient ID",
}


export function PatientUpload() {

    return (
        <FileUploadComponent
            requiredColumns={REQUIRED_COLUMNS}
            headerText={"1. Patient Data"}
            uploadText={"Upload the patient file to start the import process"}
            redirectUrl={"/clc-import"}
            name_map={NAME_MAP}
        />
    )
}