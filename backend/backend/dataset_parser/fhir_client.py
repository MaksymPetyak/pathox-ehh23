import requests


class FhirClient:
    _KEY = ""
    _BASE_URL = "https://fhir.xld6ihpuum1e.workload-nonprod-fhiraas.isccloud.io"

    def post_patient(self, json_body):
        url = f"{self._BASE_URL}/Patient"
        headers = {"x-api-key": self._KEY, "Content-Type": "application/fhir+json"}
        response = requests.post(url, headers=headers, json=json_body)

        return response.json()


if __name__ == '__main__':
    import json

    with open('post_patient_json_body.json') as f:
        data = json.load(f)

    fc = FhirClient()
    fc.post_patient(json_body=data)
