import { Checkbox, FormControl, TextInput } from "@contentful/f36-components";
import { useGamePlatformConfig } from "../hooks";

import { ERROR_MSG } from "../constants/Error";
import {
  DEFAULT_FIELDS,
  MOBILE_FIELDS,
} from "../constants/CommonGameConstants";

const PlatformConfigFields = () => {
  const { fields, validationErrors, handleInputChange, handleCheckboxChange } =
    useGamePlatformConfig();

  const formFields = fields.mobileOverride
    ? [...DEFAULT_FIELDS, ...MOBILE_FIELDS]
    : DEFAULT_FIELDS;

  return (
    <>
      <FormControl id="mobileOverride">
        <Checkbox
          name="mobileOverride"
          isChecked={fields.mobileOverride}
          onChange={() => handleCheckboxChange(!fields.mobileOverride)}
        >
          Override Mobile Fields
        </Checkbox>
      </FormControl>
      {formFields.map((field) => {
        const isRtp = field.name === "rtp";
        return (
          <FormControl
            key={field.name}
            isRequired={!isRtp} // For 'rtp', not required; otherwise required.
            isInvalid={validationErrors[field.name]}
          >
            <FormControl.Label>{field.labelText}</FormControl.Label>
            <TextInput
              type={ isRtp ? "number": "text"}
              id={field.labelText}
              name={field.labelText}
              value={(fields as any)[field.name] || ""}
              onChange={(event) => handleInputChange(event, field.name)}
            />
            {validationErrors[field.name] && (
              <FormControl.ValidationMessage>
                {ERROR_MSG}
              </FormControl.ValidationMessage>
            )}
          </FormControl>
        );
      })}
    </>
  );
};

export default PlatformConfigFields;
