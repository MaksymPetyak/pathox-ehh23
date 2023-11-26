import { useState, useCallback } from 'react';
import {BACKEND_URL} from "@/hooks/consts";

const useSendFile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const sendFile = useCallback(async (file: File, mapping: any) => {
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('mapping', JSON.stringify(mapping));

            const response = await fetch(BACKEND_URL + '/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('File upload failed');
            }

            const responseData = await response.json();
            setResponse(responseData);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { sendFile, isLoading, error, response };
};

export default useSendFile;