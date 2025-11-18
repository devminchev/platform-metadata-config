import { ChangeEvent, useEffect, useState } from 'react';
import useAppContext from './useAppContext';


function useGamePlatformConfig() {
    const { fields, setContext, setFormStatus } = useAppContext();
    const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({});

    const validate = (value: string) => {
        let hasError = false;

        if (!value) {
            hasError = true;
        }

        return hasError;
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        fieldName: string
    ) => {
        const { value } = e.target;

        let updatedValue = {};
        if (fieldName === "mobileOverride") {
            let mobileFields = {};
            if (!value) {
                mobileFields = {
                    mobileName: "",
                    mobileGameSkin: "",
                    mobileRealUrl: "",
                    mobileDemoUrl: "",
                    mobileGameLoaderFileName: ""
                };
            }

            updatedValue = {
                ...fields,
                mobileOverride: !fields?.mobileOverride,
                ...mobileFields
            };

        } else if (fieldName === "rtp") {
            // Parse as float; clamp to 0 if invalid or negative
            let numericVal = parseFloat(value);
            if (isNaN(numericVal) || numericVal < 0) {
                numericVal = 0;
            }

            updatedValue = {
                ...fields,
                [fieldName]: numericVal
            };

        } else {
            updatedValue = {
                ...fields,
                [fieldName]: value
            };
        }

        setContext(updatedValue);
    };

    const handleCheckboxChange = (value: boolean) => {
        let mobileFields = {};
        if (!value) {
            mobileFields = {
                mobileName: "",
                mobileGameSkin: "",
                mobileRealUrl: "",
                mobileDemoUrl: "",
                mobileGameLoaderFileName: ""
            }
        }

        const updatedValue = {
            ...fields,
            mobileOverride: value,
            ...mobileFields
        };

        setContext(updatedValue);
    };

    const validateDefaultFields = () => {
        let errors: Record<string, boolean> = {};

        // for (let key of ['name', 'gameSkin', 'realUrl', 'gameLoaderFileName'] as const) {
        //     errors[key] = validate(fields[key]);
        // }
        const hasError = Object.keys(errors).some(i => errors[i]);

        setValidationErrors(errors);
        if (hasError) {
            setFormStatus({ platformConfig: true });
        } else {
            setFormStatus({ platformConfig: false });
        }
    };

    const validateAllFields = () => {
        let errors: Record<string, boolean> = {};

        // for (let key of ['name', 'gameSkin', 'realUrl', 'gameLoaderFileName'] as const) {
        //     errors[key] = validate(fields[key]);
        // }

        // for (let key of ['mobileName', 'mobileGameSkin', 'mobileRealUrl', 'mobileGameLoaderFileName'] as const) {
        //     errors[key] = validate(fields[key]);
        // }

        const hasError = Object.keys(errors).some(i => errors[i]);

        setValidationErrors(errors);

        if (hasError) {
            setFormStatus({ platformConfig: true });
        } else {
            setFormStatus({ platformConfig: false });
        }
    };

    const validateForm = () => {
        if (!fields.mobileOverride) {
            validateDefaultFields();
        } else {
            validateAllFields();
        }
    };

    useEffect(() => {
        validateForm();
    }, [fields]);

    return {
        fields,
        validationErrors,
        handleInputChange,
        handleCheckboxChange
    };
}

export default useGamePlatformConfig;
