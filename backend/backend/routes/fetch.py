from fastapi import APIRouter
from typing import List

from pydantic import BaseModel

from backend.mocks import mock_fhir_models
from backend.models import FHIRModel

router = APIRouter()

class FHIRResponse(BaseModel):
    items: List[FHIRModel]

@router.get("/fetch", response_model=FHIRResponse)
async def fetch_fhir_models():

    return FHIRResponse(items=mock_fhir_models)
