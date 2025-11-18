import { ChangeEvent, useEffect, useState } from 'react';
import useAppContext from './useAppContext';


function useMetadataConfig() {
    const { fields, setContext, setFormStatus } = useAppContext();
    const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({});

    const validate = (value: string | string[] | boolean | number) => {
        let hasError = false;

        if (!value) {
            hasError = true;
        };

        return hasError;
    };

    const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;

        const updatedValue = {
            ...fields,
            gameType: {
                type: value,
                brand: '',
                features: [],
                themes: [],
                symbolType: [],
                symbolCount: '',
                maxMultiplier: '',
                maxExposure: '',
                reel: '',
                waysToWin: '',
                winLineType: '',
                winLines: '',
                isJackpot: false,
                isJackpotFixedPrize: false,
                isJackpotInGameProgressive: false,
                isJackpotPlatformProgressive: false,
                isPersistence: false,
                ...(value === 'Casino' && { casinoType: '' }),
            }
        };

        setContext(updatedValue);
    };

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value, name } = e.target;

        const updatedValue = {
            ...fields,
            [name]: value,
        };

        setContext(updatedValue);
    };

    const validateForm = () => {
        let errors: Record<string, boolean> = {
            gameType: validate(fields.gameType.type),
        };

        const hasError = Object.keys(errors).some(i => errors[i]);

        setValidationErrors(errors);
        if (hasError) {
            setFormStatus({ metadataConfig: true });
        } else {
            setFormStatus({ metadataConfig: false });
        }
    };

    useEffect(() => {
        validateForm();
    }, [fields]);

    return {
        fields,
        validationErrors,
        handleTypeChange,
        handleChange
    };
}

export default useMetadataConfig;
