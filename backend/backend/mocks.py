from datetime import datetime
from typing import List

from backend.models import FHIRModel

# Mock object for the FHIR model - only used for testing
mock_fhir_models: List[FHIRModel] = [FHIRModel(
    block_id="Block123",
    biopsy_id="B12345",
    project="ProjectX",
    diagnosis="DiagnosisY",
    oncology_code="Onc123",
    insurance_code="Ins456",
    receipt_lmp=datetime.now(),
    closure_lmp=datetime.now(),
    response_time=24,
    patient_id="P7890",
    igv_control_initials="IGV123",
    medea_entry_initials="Med456",
    sequencer="Seq789",
    gene_panel="GP123",
    tumor_cell_percentage=75.0,
    dna_concentration_post_pcr=1.2,
    dna_average_coverage=30.5,
    dna_tmb=2.3,
    dna_msi="MSIType",
    hrd="HRDType",
    original_genome_build="BuildXYZ",
    chromosome="Chr12",
    region="RegionA",
    mutation_type="TypeB",
    reference="RefC",
    allele="AlleleD",
    length=100,
    count=50,
    coverage=80.0,
    frequency=0.5,
    forward_reverse_balance=1.0,
    average_quality=90.0,
    gene_name="GeneX",
    coding_region_change="ChangeY",
    amino_acid_change="AminoZ",
    exon_number="Exon123",
    type_of_mutation="MutationType"
),
    FHIRModel(
        block_id="Block234",
        biopsy_id="B67891",
        project="ProjectZ",
        diagnosis="DiagnosisA",
        oncology_code="Onc456",
        insurance_code="Ins789",
        receipt_lmp=datetime.now(),
        closure_lmp=datetime.now(),
        response_time=48,
        patient_id="P54321",
        igv_control_initials="IGV456",
        medea_entry_initials="Med789",
        sequencer="Seq321",
        gene_panel="GP456",
        tumor_cell_percentage=60.0,
        dna_concentration_post_pcr=2.4,
        dna_average_coverage=40.5,
        dna_tmb=3.5,
        dna_msi="MSITypeB",
        hrd="HRDTypeA",
        original_genome_build="BuildABC",
        chromosome="Chr13",
        region="RegionB",
        mutation_type="TypeC",
        reference="RefD",
        allele="AlleleE",
        length=150,
        count=60,
        coverage=70.0,
        frequency=0.6,
        forward_reverse_balance=0.8,
        average_quality=85.0,
        gene_name="GeneY",
        coding_region_change="ChangeX",
        amino_acid_change="AminoA",
        exon_number="Exon456",
        type_of_mutation="MutationTypeA"
    ),
    FHIRModel(
        block_id="Block345",
        biopsy_id="B23456",
        project="ProjectA",
        diagnosis="DiagnosisC",
        oncology_code="Onc789",
        insurance_code="Ins012",
        receipt_lmp=datetime.now(),
        closure_lmp=datetime.now(),
        response_time=72,
        patient_id="P12345",
        igv_control_initials="IGV789",
        medea_entry_initials="Med012",
        sequencer="Seq456",
        gene_panel="GP789",
        tumor_cell_percentage=80.0,
        dna_concentration_post_pcr=1.8,
        dna_average_coverage=35.0,
        dna_tmb=4.0,
        dna_msi="MSITypeC",
        hrd="HRDTypeB",
        original_genome_build="BuildDEF",
        chromosome="Chr14",
        region="RegionC",
        mutation_type="TypeD",
        reference="RefE",
        allele="AlleleF",
        length=200,
        count=70,
        coverage=60.0,
        frequency=0.7,
        forward_reverse_balance=0.9,
        average_quality=80.0,
        gene_name="GeneZ",
        coding_region_change="ChangeW",
        amino_acid_change="AminoB",
        exon_number="Exon789",
        type_of_mutation="MutationTypeB"
    ),
    FHIRModel(
        block_id="Block456",
        biopsy_id="B34567",
        project="ProjectB",
        diagnosis="DiagnosisD",
        oncology_code="Onc210",
        insurance_code="Ins345",
        receipt_lmp=datetime.now(),
        closure_lmp=datetime.now(),
        response_time=36,
        patient_id="P67890",
        igv_control_initials="IGV210",
        medea_entry_initials="Med345",
        sequencer="Seq567",
        gene_panel="GP210",
        tumor_cell_percentage=50.0,
        dna_concentration_post_pcr=1.5,
        dna_average_coverage=25.0,
        dna_tmb=2.8,
        dna_msi="MSITypeD",
        hrd="HRDTypeC",
        original_genome_build="BuildGHI",
        chromosome="Chr15",
        region="RegionD",
        mutation_type="TypeE",
        reference="RefF",
        allele="AlleleG",
        length=250,
        count=80,
        coverage=50.0,
        frequency=0.4,
        forward_reverse_balance=0.7,
        average_quality=75.0,
        gene_name="GeneA",
        coding_region_change="ChangeV",
        amino_acid_change="AminoC",
        exon_number="Exon210",
        type_of_mutation="MutationTypeC"
    )]

# Now you can use mock_fhir_model for your tests or demonstrations
