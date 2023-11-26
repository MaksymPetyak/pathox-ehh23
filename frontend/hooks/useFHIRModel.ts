import useSWR from 'swr';
import {FHIRModel} from "@/types/FHIRModel";
import {BACKEND_URL} from "@/hooks/consts";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface useFHIRModelsReturn {
    models: FHIRModel[];
    isLoading: boolean;
    isError: boolean;
}

export function useFHIRModels(): useFHIRModelsReturn {
  const { data, error } = useSWR(BACKEND_URL + '/fetch', fetcher);

  return {
    models: data?.items,
    isLoading: !error && !data,
    isError: error
  };
}