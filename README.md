# PathoX
PathoX is an end-to-end solution to help pathologists with ingestion, tagging, and analysis of patient data.

Features include
- Frontend for uploading Excel files and creating a map to specify the relevant columns
- Screen for tagging of mutations by colouring them or leaving comments
- Mocked analytics dashboard for visualizing the data
- Backend with a back-bone for FHIR integration

Some elements right now are hardcoded for the sake of the demo, but can be easily extended to real data.

## Project structure
We have a FastAPI-based backend in the [/backend](backend) folder. 
You can install the required dependencies using `poetry`: 
```bash
poetry install
```

Similarly, we have a Next.js-based frontend with Typescript and shadecn for styling in the [/frontend](frontend) folder.
You can install the required dependencies using `yarn`:
```bash
yarn install
```

---
Submission for the EUROPEAN HEALTHCARE HACKATHON 2023