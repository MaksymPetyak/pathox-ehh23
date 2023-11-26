
// Columns for DG upload
import FileUploadComponent from "@/components/FileUpload";

const REQUIRED_COLUMNS: string[] = [
    "Region",
    "Reference",
    "Allele",
    "Length",
    "Count",
    "Coverage",
    "Frequency",
    "Forward Reverse Balance",
    "Average quality",
    "Gene name",
    "Coding Region Change",
    "Amino Acid Change",
    "Exon Number",
    "Type Of Mutation"
]

const NAME_MAP: { [key: string]: string } = {
    "Forward/reverse balance": "Forward Reverse Balance",
}

export function DGUpload() {

    return (
        <FileUploadComponent
            requiredColumns={REQUIRED_COLUMNS}
            headerText={"3. DG Data"}
            uploadText={"Upload one or more DG files linked to this patient"}
            redirectUrl={"/viewer"}
            readSheet={1}
            name_map={NAME_MAP}
        />
    )
}