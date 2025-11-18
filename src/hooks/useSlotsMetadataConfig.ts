import { ChangeEvent } from 'react';
import useAppContext from './useAppContext';
import useMetadataConfig from './useMetadataConfig';

function useSlotsMetadataConfig() {
    const { fields, setContext } = useAppContext();
    const { validationErrors } = useMetadataConfig();

    const handleRadioSelectChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        const { value, name } = e.target;

        const updatedValue = {
            ...fields,
            gameType: {
                ...fields.gameType,
                [name]: value === "yes"
            },
        };

        setContext(updatedValue);
    };

    const handleInputAndSelectChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target;

        const updatedValue = {
            ...fields,
            gameType: {
                ...fields.gameType,
                [name]: value
            },
        };

        setContext(updatedValue);
    };

    const handleNumberInputs = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        const updatedValue = {
            ...fields,
            gameType: {
                ...fields.gameType,
                [name]: value ||  undefined
            },
        };

        setContext(updatedValue);
    };

    const handleMultipleSelectChange = (
        event: ChangeEvent<any>,
        fieldName: string
    ) => {
        const { checked, value } = event.target;

        const selectedItems = (fields.gameType[fieldName] as string[]) || [];
        let list;

        if (checked) {
            list = [...selectedItems, value];
        } else {
            list = selectedItems.filter((i) => i !== value);
        }

        const updatedValue = {
            ...fields,
            gameType: {
                ...fields.gameType,
                [fieldName]: list,
            }
        };

        setContext(updatedValue);
    };

    return {
        fields,
        validationErrors,
        handleRadioSelectChange,
        handleInputAndSelectChange,
        handleMultipleSelectChange,
        handleNumberInputs
    };
}

export default useSlotsMetadataConfig;
