import pytest
from datetime import datetime
from typing import List
from pprint import pprint
import requests
from dotenv import load_dotenv
import os
import json

from ..backend.models import FHIRModel
from ..backend.json_pupulation import serialize_records_for_fhir


url = "https://fhir.xld6ihpuum1e.workload-nonprod-fhiraas.isccloud.io/"


class TestJsonPopulation:
    @pytest.fixture
    def record_objs(self):
        obj1 = FHIRModel(
            block_id="block_id1",
            biopsy_id="biopsy_id",
            project="project",
            diagnosis="diagnosis",
            oncology_code="oncology_code",
            insurance_code="insurance_code",
            receipt_lmp=datetime.now(),
            closure_lmp=datetime.now(),
            response_time=34,
            patient_id="fake_patient_id1",
            igv_control_initials="igv_control_initials",
            medea_entry_initials="medea_entry_initials",
            sequencer="sequencer",
            gene_panel="gene_panel",
            tumor_cell_percentage=0.34,
            dna_concentration_post_pcr=0.34,
            dna_average_coverage=0.34,
            dna_tmb=3.7,
            dna_msi="dna_msi",
            hrd="hrd",
            original_genome_build="original_genome_build",
            chromosome="chromosome",
            region="region",
            mutation_type="mutation_type",
            reference="reference",
            allele="allele",
            length=6,
            count=567,
            coverage=6.78,
            frequency=6.78,
            forward_reverse_balance=6.78,
            average_quality=6.78,
            gene_name="gene_name",
            coding_region_change="coding_region_change",
            amino_acid_change="amino_acid_change",
            exon_number="exon_number",
            type_of_mutation="type_of_mutation",
        )
        obj2 = FHIRModel(
            block_id="block_id2",
            biopsy_id="biopsy_id",
            project="project",
            diagnosis="diagnosis",
            oncology_code="oncology_code",
            insurance_code="insurance_code",
            receipt_lmp=datetime.now(),
            closure_lmp=datetime.now(),
            response_time=34,
            patient_id="fake_patient_id1",
            igv_control_initials="igv_control_initials",
            medea_entry_initials="medea_entry_initials",
            sequencer="sequencer",
            gene_panel="gene_panel",
            tumor_cell_percentage=0.34,
            dna_concentration_post_pcr=0.34,
            dna_average_coverage=0.34,
            dna_tmb=3.7,
            dna_msi="dna_msi",
            hrd="hrd",
            original_genome_build="original_genome_build",
            chromosome="chromosome",
            region="region",
            mutation_type="mutation_type",
            reference="reference",
            allele="allele",
            length=6,
            count=567,
            coverage=6.78,
            frequency=6.78,
            forward_reverse_balance=6.78,
            average_quality=6.78,
            gene_name="gene_name",
            coding_region_change="coding_region_change",
            amino_acid_change="amino_acid_change",
            exon_number="exon_number",
            type_of_mutation="type_of_mutation",
        )

        return [obj1, obj2]

    def test_json_population(self, record_objs):
        # breakpoint()
        data = serialize_records_for_fhir(record_objs)
        load_dotenv()  # This loads the variables from .env
        api_key = os.getenv("API_KEY")
        headers = {"x-api-key": api_key}
        response = requests.post(url, data=data, headers=headers)
        code = response.status_code
        content = response.content
        if code > 299:
            # to extract the error message from the response
            # decoded_string = response.content.decode('utf-8')
            # json_data = json.loads(decoded_string)
            # err = json_data["issue"][0]["details"]["text"]
            breakpoint()
        assert code < 300
