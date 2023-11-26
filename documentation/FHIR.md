

## Data structure

- for genomic data we will use the `Observation` as a `resourceType`

- `"resourceType"`: `"Observation"`: Indicates the type of resource.
- `"code"`: Describes what was observed. The LOINC code should represent the specific genomic observation.
- `"subject"`: The reference to the patient or subject of the observation.
- `"effectiveDateTime"`: The time of the observation.
- `"valueString"`: The actual genomic data or observation result.
- `"interpretation"`: Interpretation of the observation (normal, abnormal, etc.).
- `"specimen"`: Reference to the specimen used for observation.
- `"performer"`: The practitioner or organization that performed the observation.

```
{
  "resourceType": "Observation",
  "id": "genomic-observation-1",
  "status": "final",
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "LOINC_CODE_FOR_GENOMIC_DATA",
        "display": "Genomic Observation"
      }
    ]
  },
  "subject": {
    "reference": "Patient/PATIENT_ID"
  },
  "effectiveDateTime": "2023-11-24",
  "valueString": "GENOMIC_DATA_VALUE",
  "interpretation": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
          "code": "N",
          "display": "Normal"
        }
      ]
    }
  ],
  "specimen": {
    "reference": "Specimen/SPECIMEN_ID"
  },
  "performer": [
    {
      "reference": "Practitioner/PRACTITIONER_ID"
    }
  ]
}
```

- With FHIR, specific use cases are usually implemented by combining resources together through the use of [resource references](https://hl7.org/fhir/R4/references.html).

## resource procedure

[Resource Procedure](https://hl7.org/fhir/R4/procedure.html)

The Procedure resource should not be used to capture an event if a more specific resource already exists

```
{
  "resourceType" : "Procedure",
  // from Resource: id, meta, implicitRules, and language
  // from DomainResource: text, contained, extension, and modifierExtension
  "identifier" : [{ Identifier }], // External Identifiers for this procedure
  "instantiatesCanonical" : [{ canonical(PlanDefinition|ActivityDefinition|
   Measure|OperationDefinition|Questionnaire) }], // Instantiates FHIR protocol or definition
  "instantiatesUri" : ["<uri>"], // Instantiates external protocol or definition
  "basedOn" : [{ Reference(CarePlan|ServiceRequest) }], // A request for this procedure
  "partOf" : [{ Reference(Procedure|Observation|MedicationAdministration) }], // Part of referenced event
  "status" : "<code>", // R!  preparation | in-progress | not-done | on-hold | stopped | completed | entered-in-error | unknown
  "statusReason" : { CodeableConcept }, // Reason for current status
  "category" : { CodeableConcept }, // Classification of the procedure
  "code" : { CodeableConcept }, // Identification of the procedure
  "subject" : { Reference(Patient|Group) }, // R!  Who the procedure was performed on
  "encounter" : { Reference(Encounter) }, // Encounter created as part of
  // performed[x]: When the procedure was performed. One of these 5:
  "performedDateTime" : "<dateTime>",
  "performedPeriod" : { Period },
  "performedString" : "<string>",
  "performedAge" : { Age },
  "performedRange" : { Range },
  "recorder" : { Reference(Patient|RelatedPerson|Practitioner|
   PractitionerRole) }, // Who recorded the procedure
  "asserter" : { Reference(Patient|RelatedPerson|Practitioner|
   PractitionerRole) }, // Person who asserts this procedure
  "performer" : [{ // The people who performed the procedure
    "function" : { CodeableConcept }, // Type of performance
    "actor" : { Reference(Practitioner|PractitionerRole|Organization|Patient|
    RelatedPerson|Device) }, // R!  The reference to the practitioner
    "onBehalfOf" : { Reference(Organization) } // Organization the device or practitioner was acting for
  }],
  "location" : { Reference(Location) }, // Where the procedure happened
  "reasonCode" : [{ CodeableConcept }], // Coded reason procedure performed
  "reasonReference" : [{ Reference(Condition|Observation|Procedure|
   DiagnosticReport|DocumentReference) }], // The justification that the procedure was performed
  "bodySite" : [{ CodeableConcept }], // Target body sites
  "outcome" : { CodeableConcept }, // The result of procedure
  "report" : [{ Reference(DiagnosticReport|DocumentReference|Composition) }], // Any report resulting from the procedure
  "complication" : [{ CodeableConcept }], // Complication following the procedure
  "complicationDetail" : [{ Reference(Condition) }], // A condition that is a result of the procedure
  "followUp" : [{ CodeableConcept }], // Instructions for follow up
  "note" : [{ Annotation }], // Additional information about the procedure
  "focalDevice" : [{ // Manipulated, implanted, or removed device
    "action" : { CodeableConcept }, // Kind of change to device
    "manipulated" : { Reference(Device) } // R!  Device that was changed
  }],
  "usedReference" : [{ Reference(Device|Medication|Substance) }], // Items used during procedure
  "usedCode" : [{ CodeableConcept }] // Coded items used during the procedure
}
```


## molecular sequence

```
{
  "resourceType": "MolecularSequence",
  "id": "sequence-example",
  "type": "dna",
  "subject": {
    "reference": "Patient/patient-id"
  },
  "identifier": [
    {
      "system": "http://hospital.org/biopsies/identifiers",
      "value": "biopsy-id"
    }
  ],
  "device": {
    "display": "sequencer-brand-or-model"
  },
  "performer": {
    "reference": "Organization/lab-id"
  },
  // ... additional fields from your data sheet mapped to FHIR MolecularSequence components
}

```


## Todo
- [ ]  specify the particular type of genomic test or observation being reported to create LOINC codes for each type of genomic data. Each genomic test or observation has its specific LOINC code that accurately describes it, ensuring consistency and clarity in data exchange and recording.
example of LOINC code:

Here's a fictional example:
```
LOINC Code: 12345-67
Component: BRCA1 Gene Mutation Analysis
Property: Find
Time Aspect: Pt (Point in time)
System: Blood
Scale Type: Nom (Nominal)
Method Type: PCR (Polymerase Chain Reaction)
In this fictional example:
```
- 12345-67 is the unique identifier for this particular test.
- Component describes what is being measured or observed. Here, it's an analysis of mutations in the BRCA1 gene, which is often assessed for breast cancer risk.
- Property refers to the characteristic of the observation, in this case, 'Find' indicates it's a finding.
- Time Aspect shows when the measurement is taken; 'Pt' stands for a point in time.
- System is the sample or body part being tested, here it's blood.
- Scale Type indicates the kind of scale used for the observation, with 'Nom' representing a nominal scale, which is qualitative (like presence or absence of a mutation).
- Method Type describes the method used for the test, in this case, PCR, a common technique in genetic testing.


- [ ]  what types of data are included in the data sheets?
  - Diagnostic report genetic profile [link] (https://hl7.org/fhir/R4/genomics.html#diagnosticreport-genetics)
  - observation genetics profile [link](https://hl7.org/fhir/R4/genomics.html#observation-genetics)
  - MolecularSequence Resource [link](https://hl7.org/fhir/R4/genomics.html#sequence)



Relationship among MolecularSequence resource and genetics profiles [link](https://hl7.org/fhir/R4/genomics.html#resource_vs_profiles)