import styled from 'styled-components';
import { Multiselect } from "@contentful/f36-multiselect";

export const FormWrapperStyled = styled.div`
    border-left: 3px solid rgb(207, 217, 224);
    border-image: none 100% / 1 / 0 stretch;
    transition: border-color 0.18s linear 0s;
    padding-left: 1rem;
    position: relative;
    margin-top: 1.5rem;
`;

export const FormStyled = styled.div`
    position: relative;
    margin-bottom: 1.5rem;
    padding:5px;
`;

export const MultiSelectWrapper = styled(Multiselect)`
    button {
        border-color: ${props => (!props.currentSelection || props.currentSelection.length === 0) && 'red'};
    }
`;
