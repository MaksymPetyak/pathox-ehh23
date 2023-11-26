from fastapi import APIRouter, File, UploadFile, Form
import json

router = APIRouter()

@router.post("/upload")
async def create_upload_file(file: UploadFile = File(...), mapping: str = Form(...)):
    # Parse the mapping data from string to dictionary
    mapping_dict = json.loads(mapping)

    # Validate the mapping data structure
    if not all(isinstance(key, int) and isinstance(value, str) for key, value in mapping_dict.items()):
        return {"error": "Invalid mapping format"}

    with open(file.filename, "wb") as f:
        file_content = await file.read()

        # FIXME: call the FHIR parser for the excel file here


    return 200, "OK"