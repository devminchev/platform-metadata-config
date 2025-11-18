import { ChangeEventHandler } from "react";
import { FormControl, Radio, Stack } from "@contentful/f36-components";

interface YesNoProps {
  field: string;
  labelText: string;
  value: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const YesNoField: React.FC<YesNoProps> = ({
  field,
  labelText,
  value,
  onChange,
}) => {
  return (
    <FormControl key={field}>
      <FormControl.Label htmlFor={labelText}>{labelText}</FormControl.Label>
      <Stack flexDirection="row">
        <Radio
          id={field}
          name={field}
          value="yes"
          isChecked={value === true}
          onChange={onChange}
        >
          Yes
        </Radio>
        <Radio
          id={field}
          name={field}
          value="no"
          isChecked={!value}
          onChange={onChange}
        >
          No
        </Radio>
      </Stack>
      {/* <HorizontalGap /> */}
    </FormControl>
  );
};

export default YesNoField;
