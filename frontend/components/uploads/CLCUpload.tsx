import FileUploadComponent from "@/components/FileUpload";

const REQUIRED_COLUMNS: string[] = [
    "IGV  kontrola - iniciály",
    "Medea zápis - iniciály",
    "DNA konc. po 1.PCR",
    "DNA průměrné pokrytí",
    "DNA TMB",
    "DNA MSI",
    "HRD",
]

const NAME_MAP: { [key: string]: string } = {
    "IGV  kontrola - iniciály": "IGV  kontrola - iniciály",
}


export function CLCUpload() {

    return (
        <FileUploadComponent
            requiredColumns={REQUIRED_COLUMNS}
            headerText={"2. CLC Data"}
            uploadText={"Now please upload the corresponding CLC files"}
            redirectUrl={"/dg-import"}
            name_map={NAME_MAP}
        />
    )
}