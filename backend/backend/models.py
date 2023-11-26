from datetime import datetime
from typing import Optional

from pydantic.dataclasses import dataclass

import uuid


@dataclass(slots=True, kw_only=True)
class FHIRModel:
    """Biopsy Dataclass"""

    block_id: str  # 'ID vzorku'
    biopsy_id: str  # 'ID biopsie'
    project: str  # 'Projekt'
    diagnosis: str  # 'Diagnóza'
    oncology_code: str  # 'Onkologický kód'
    insurance_code: str  # 'Kód pojišťovna'
    receipt_lmp: datetime  # 'příjem LMP'
    closure_lmp: datetime  # 'uzavření LMP'
    response_time: int  # 'doba odezvy'
    patient_id: str  # 'patient ID'
    igv_control_initials: str  # 'IGV  kontrola - iniciály'
    medea_entry_initials: str  # 'Medea zápis - iniciály'
    sequencer: str  # 'Sekvenátor'
    gene_panel: str  # 'Panel genů'
    tumor_cell_percentage: float  # '% nádorových buněk'
    dna_concentration_post_pcr: float  # 'DNA konc. po 1.PCR'
    dna_average_coverage: float  # 'DNA průměrné pokrytí'
    dna_tmb: Optional[float]  # 'DNA TMB'
    dna_msi: Optional[str]  # 'DNA MSI'
    hrd: Optional[str]  # 'HRD'
    original_genome_build: str  # 'Genom build - původní'
    chromosome: str  # 'Chromosome'
    region: str  # 'Region'
    mutation_type: str  # 'Type'
    reference: str  # 'Reference'
    allele: str  # 'Allele'
    length: int  # 'Length'
    count: int  # 'Count'
    coverage: float  # 'Coverage'
    frequency: float  # 'Frequency'
    forward_reverse_balance: float  # 'Forward/reverse balance'
    average_quality: float  # 'Average quality'
    gene_name: str  # 'Gene name'
    coding_region_change: str  # 'Coding region change'
    amino_acid_change: str  # 'Amino acid change'
    exon_number: str  # 'Exon Number'
    type_of_mutation: str  # 'Type of mutation'

    def serialize_patient(self, uuid):
        return {
            "request": {
                "method": "POST",
                "url": "Patient",
            },
            "fullUrl": uuid,
            "resource": {
                "resourceType": "Patient",
                "identifier": [
                    {
                        "value": self.patient_id,
                    }
                ],
                "active": True,
            },
        }

    def serialize_block(self, uuid, patient_uuid):
        return {
            "request": {"method": "POST", "url": "Specimen"},
            "fullUrl": uuid,
            "resource": {
                "resourceType": "Specimen",
                "identifier": [
                    {
                        "value": self.block_id,
                    }
                ],
                "status": "available",
                "subject": {
                    "reference": patient_uuid,
                },
            },
        }

    def serialize_observation(self, uuid, block_uuid, patient_uuid):
        return {
            "request": {"method": "POST", "url": "Observation"},
            "fullUrl": uuid,
            "resource": {
                "resourceType": "Observation",
                "extension": [
                    {
                        "url": "http://hl7.org/fhir/StructureDefinition/observation-geneticsGene",
                        "valueString": self.gene_name,
                    },
                    {
                        "url": "http://hl7.org/fhir/StructureDefinition/observation-geneticsDNARegionName",
                        "valueString": self.exon_number,
                    },
                    {
                        "url": "http://hl7.org/fhir/StructureDefinition/observation-geneticsAminoAcidChange",
                        "valueString": self.amino_acid_change,
                    },
                    {
                        "url": "http://hl7.org/fhir/StructureDefinition/observation-geneticsVariant",
                        "valueString": self.coding_region_change,
                    },
                    {
                        "url": "http://hl7.org/fhir/StructureDefinition/observation-geneticsInterpretation",
                        "valueString": self.type_of_mutation,
                    },
                ],
                "status": "final",
                "code": {
                    "coding": [
                        {
                            "system": "http://loinc.org",
                            "code": "55233-1",  # artifitial code
                        }
                    ]
                },
                "subject": {
                    "reference": patient_uuid,
                },
                "specimen": {
                    "reference": block_uuid,
                },
            },
        }

