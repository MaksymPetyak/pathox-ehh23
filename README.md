# PathoX
PathoX is an end-to-end solution to help pathologists with ingestion, tagging, and analysis of patient data.

Features include
- Frontend for uploading Excel files and creating a map to specify the relevant columns
- Screen for tagging of mutations by colouring them or leaving comments
- Mocked analytics dashboard for visualizing the data
- Backend with a back-bone for FHIR integration

Some elements right now are hardcoded for the sake of the demo, but can be easily extended to real data.

## Project structure

### Backend 
We have a FastAPI-based backend in the [/backend](backend) folder. 
You can install the required dependencies using `poetry`: 
```bash
poetry install
```
You can run backend using the following command from the /backend directory:
```bash
poetry run uvicorn backend.main:app --reload --host 0.0.0.0 --port 8080 --app-dir=backend
```

### Frontend

Similarly, we have a Next.js-based frontend with Typescript and shadecn for styling in the [/frontend](frontend) folder.
You can install the required dependencies using `yarn`:
```bash
yarn install
```
To run frontend simply run
```bash
yarn dev
```

For FHIR support you would need to obtain an API key for a server supporting the FHIR data structure.

## FHIR Integration

- protocol using todate: HL7 FHIR v4
- the project respects FHIR protocol for genomic data, for more see [here](https://hl7.org/fhir/R4/genomics.html)
- each observation is stored respecting the Observation-genetics Profile - for more see [here](https://hl7.org/fhir/R4/genomics.html#observation-genetics)

###  Acknowledgements
- CEE Hacks
- IKEM

### Team
- David Kolečkář
- Maksym Petyak
- Zbyněk Vyhlas

### Contact
- https://www.linkedin.com/in/david-koleckar/
- https://www.linkedin.com/in/maksym-petyak/
- https://www.linkedin.com/in/zbynek-vyhlas


---
Submission for the EUROPEAN HEALTHCARE HACKATHON 2023