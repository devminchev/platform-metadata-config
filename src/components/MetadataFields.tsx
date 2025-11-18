import { Select, FormControl } from "@contentful/f36-components";

import { useMetadataConfig } from "../hooks";
import GameTypeMetadataFields from "./GameTypeMetadataFields";
import {
  GAME_AGGREGATOR_INPUTS,
  GAME_PROVIDER_INPUTS,
  GAME_STUDIO_INPUTS,
  GAME_TYPE_INPUTS,
  SUB_GAME_TYPE_INPUTS,
} from "../constants/GameMetadataConstants";
import { ERROR_MSG } from "../constants/Error";

const MetadataFields = () => {
  const {
    fields: { gameType, gameProvider, gameAggregator, gameStudio, subGameType, federalGameType },
    validationErrors,
    handleTypeChange,
    handleChange,
  } = useMetadataConfig();

  return (
    <>
      <FormControl key="gameAggregators">
        <FormControl.Label>Game Aggregator</FormControl.Label>
        <Select
          key="gameAggregator"
          id="gameAggregator"
          name="gameAggregator"
          value={String(gameAggregator || "")}
          onChange={handleChange}
        >
          <Select.Option key="none" value="">
            Select an option
          </Select.Option>
          {GAME_AGGREGATOR_INPUTS.map((option, i) => (
            <Select.Option key={i} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </FormControl>
      <FormControl key="gameProviders">
        <FormControl.Label>Game Provider</FormControl.Label>
        <Select
          key="gameProvider"
          id="gameProvider"
          name="gameProvider"
          value={String(gameProvider || "")}
          onChange={handleChange}
        >
          <Select.Option key="none" value="">
            Select an option
          </Select.Option>
          {GAME_PROVIDER_INPUTS.map((option, i) => (
            <Select.Option key={i} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </FormControl>
      <FormControl key="gameStudios">
        <FormControl.Label>Game Studio</FormControl.Label>
        <Select
          key="gameStudio"
          id="gameStudio"
          name="gameStudio"
          value={String(gameStudio || "")}
          onChange={handleChange}
        >
          <Select.Option key="none" value="">
            Select an option
          </Select.Option>
          {GAME_STUDIO_INPUTS.map((option, i) => (
            <Select.Option key={i} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </FormControl>
      <FormControl key="gameTypes"
        isRequired
        isInvalid={validationErrors["gameType"]}
      >
        <FormControl.Label>Game Type</FormControl.Label>
        <Select
          key="gameType"
          id="gameType"
          name="gameType"
          value={String(gameType?.type || "")}
          onChange={handleTypeChange}
        >
          <Select.Option key="none" value="">
            Select an option
          </Select.Option>
          {GAME_TYPE_INPUTS.map((option, i) => (
            <Select.Option key={i} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
        {validationErrors["gameType"] && (
          <FormControl.ValidationMessage>
            {ERROR_MSG}
          </FormControl.ValidationMessage>
        )}
      </FormControl>
      <FormControl key="subGameTypes">
        <FormControl.Label>Sub Game Type</FormControl.Label>
        <Select
          key="subGameType"
          id="subGameType"
          name="subGameType"
          value={String(subGameType || "")}
          onChange={handleChange}
        >
          <Select.Option key="none" value="">
            Select an option
          </Select.Option>
          {SUB_GAME_TYPE_INPUTS.map((option, i) => (
            <Select.Option key={i} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </FormControl>
      <FormControl key="federalGameTypes">
        <FormControl.Label>Federal Game Type</FormControl.Label>
        <Select
          key="federalGameType"
          id="federalGameType"
          name="federalGameType"
          value={String(federalGameType || "")}
          onChange={handleChange}
        >
          <Select.Option key="none" value="">
            Select an option
          </Select.Option>
          {SUB_GAME_TYPE_INPUTS.map((option, i) => (
            <Select.Option key={i} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </FormControl>

      <GameTypeMetadataFields />
    </>
  );
};

export default MetadataFields;
