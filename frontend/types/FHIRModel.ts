
export interface FHIRModel {
    biopsy_id: string;
    project: string;
    diagnosis: string;
    oncology_code: string;
    insurance_code: string;
    receipt_lmp: Date;
    closure_lmp: Date;
    response_time: number;
    patient_id: string;
    igv_control_initials: string;
    medea_entry_initials: string;
    sequencer: string;
    gene_panel: string;
    tumor_cell_percentage: number;
    dna_concentration_post_pcr: number;
    dna_average_coverage: number;
    dna_tmb?: number;
    dna_msi?: string;
    hrd?: string;
    original_genome_build: string;
    chromosome: string;
    region: string;
    mutation_type: string;
    reference: string;
    allele: string;
    length: number;
    count: number;
    coverage: number;
    frequency: number;
    forward_reverse_balance: number;
    average_quality: number;
    gene_name: string;
    coding_region_change: string;
    amino_acid_change: string;
    exon_number: string;
    type_of_mutation: string;
}
