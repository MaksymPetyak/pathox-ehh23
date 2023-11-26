from typing import List
from .models import FHIRModel
import json

import uuid


def generate_uuid():
    """Generates a new UUID string."""
    return f"urn:uuid:{str(uuid.uuid4())}"


def serialize_records_for_fhir(records: List[FHIRModel]) -> str:
    """
    Serializes a list of FHIRModel records into a FHIR-compliant JSON bundle.

    Args:
    records: A list of FHIRModel instances.

    Returns:
    A string representing a JSON serialized FHIR bundle.
    """
    entries = []
    loaded_patients = set()
    loaded_blocks = set()
    loaded_observations = set()

    for rec in records:
        if rec.patient_id and rec.patient_id not in loaded_patients:
            patient_uuid = generate_uuid()
            loaded_patients.add(rec.patient_id)
            entries.append(rec.serialize_patient(patient_uuid))

        if rec.block_id and rec.block_id not in loaded_blocks:
            block_uuid = generate_uuid()
            loaded_blocks.add(rec.block_id)
            entries.append(rec.serialize_block(block_uuid, patient_uuid))

        observation_key = (rec.patient_id, rec.gene_name, rec.coding_region_change)
        if all(observation_key) and observation_key not in loaded_observations:
            observation_uuid = generate_uuid()
            loaded_observations.add(observation_key)
            entries.append(
                rec.serialize_observation(observation_uuid, block_uuid, patient_uuid)
            )

    output = {
        "resourceType": "Bundle",
        "id": "VariantCall-bundle",
        "type": "transaction",
        "entry": entries,
    }

    return json.dumps(output)
