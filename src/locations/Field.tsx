import { useEffect } from "react";
import { FieldAppSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";

import { useAppContext } from "../hooks";
import MetadataFields from "../components/MetadataFields";
import PlatformConfigFields from "../components/PlatformConfigFields";
import { FormStyled } from "../styles/forms";

const Field = () => {
  const {
    window,
    field,
    ids: { space },
  } = useSDK<FieldAppSDK>();
  const { fields, formErrors } = useAppContext();

  useEffect(() => {
    window.startAutoResizer();

    return () => window.stopAutoResizer();
  }, [window]);

  useEffect(() => {
    // if (formErrors.platformConfig || formErrors.metadataConfig) {
    if (formErrors.platformConfig) {

      field.setInvalid(true);
      // field.setValue(null);
    } else {
      field.setInvalid(false);
      field.setValue(fields);
    }
  }, [formErrors]);

  return (
    <FormStyled>
      <PlatformConfigFields />
      {<MetadataFields />}
    </FormStyled>
  );
};

export default Field;
