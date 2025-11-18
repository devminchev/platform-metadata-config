import { Select, FormControl } from "@contentful/f36-components";
import { Multiselect } from "@contentful/f36-multiselect";
import { useGameTypeMetadataConfig } from "../hooks";
import SlotsMetadataFields from "./SlotsMetadataFields";
import YesNoField from "./YesNoField";
import { CASINO_ONLY_INPUTS, GAME_METADATA_BRANDS } from "../constants/GameMetadataConstants";
import { NON_SLOT_GAME_FORM } from "../constants/NonSlotsAttrsConfig";

const GameTypeMetadataFields = () => {
  const {
    handleChange,
    handleRadioSelectChange,
    handleSelectChange,
    handleMultipleSelectChange,
    fields: { gameType },
  } = useGameTypeMetadataConfig();

  const isNonSlotType = gameType.type !== "Slots";

  return (
    <>
      {<SlotsMetadataFields />}
      {/* {!isNonSlotType && <SlotsMetadataFields />} */}
      {isNonSlotType && NON_SLOT_GAME_FORM.map((config, i) => {
        if (config.type === 'radio') {
          return (
            <YesNoField
              key={i}
              field={config.id}
              labelText={config.label}
              value={gameType[config.id] as boolean}
              onChange={handleRadioSelectChange}
            />
          )
        }

        if (config.type === 'select') {
          return (
            <FormControl key={i}>
              <FormControl.Label>{config.label}</FormControl.Label>
              <Select
                key={i}
                id={config.id}
                name={config.id}
                value={String(gameType[config.id])}
                onChange={handleSelectChange}
              >
                <Select.Option key='none' value=''>
                  Select an option
                </Select.Option>
                {config.options?.map((option, i) => (
                  <Select.Option key={i} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </FormControl>
          )
        }

        if (config.type === 'multiselect') {
          return (
            <FormControl key={i}>
              <FormControl.Label>{config.label}</FormControl.Label>
              <Multiselect
                currentSelection={gameType?.[config.id] as string[]}
                popoverProps={{ isFullWidth: true }}
                placeholder='Select one or more'
              >
                {config.options?.map((option, i) => {
                  return (
                    <Multiselect.Option
                      key={i}
                      itemId={option}
                      value={option}
                      label={option}
                      onSelectItem={(e) => handleMultipleSelectChange(e, config.id)}
                      isChecked={
                        (gameType?.[config.id] as string[])?.filter((t) => t === option).length > 0
                      }
                    />
                  );
                })}
              </Multiselect>
            </FormControl>
          )
        }
      })}
      <FormControl key='brand'>
        <FormControl.Label>Brand</FormControl.Label>
        <Select
          id='brand'
          name='brand'
          value={String(gameType.brand || "")}
          onChange={handleSelectChange}
        >
          <Select.Option key='none' value=''>
            Select an option
          </Select.Option>
          {GAME_METADATA_BRANDS.map((option) => (
            <Select.Option key={option} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default GameTypeMetadataFields;
