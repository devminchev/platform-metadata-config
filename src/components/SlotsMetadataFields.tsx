import { Select, FormControl, TextInput } from '@contentful/f36-components';
import { Multiselect } from "@contentful/f36-multiselect";
import { useSlotsMetadataConfig } from '../hooks';
import YesNoField from './YesNoField';
import { FormWrapperStyled } from '../styles/forms';
import {
  GAME_METADATA_FEATURES,
  GAME_METADATA_THEMES,
  SLOTS_REELS,
  SYMBOL_TYPES,
  WAYS_TO_WIN,
  WIN_LINE_TYPES,
  WIN_LINES,
} from '../constants/GameMetadataConstants';

const SlotsMetadataFields = () => {
  const {
    fields: { gameType },
    handleRadioSelectChange,
    handleInputAndSelectChange,
    handleMultipleSelectChange,
    handleNumberInputs
  } = useSlotsMetadataConfig();

  return (
    <FormWrapperStyled>
      <FormControl key='themes'>
        <FormControl.Label>Select Themes</FormControl.Label>
        <Multiselect
          currentSelection={gameType.themes as string[]}
          popoverProps={{ isFullWidth: true }}
          placeholder='Select one or more'
        >
          {GAME_METADATA_THEMES.map((option) => {
            return (
              <Multiselect.Option
                key={option}
                itemId={option}
                value={option}
                label={option}
                onSelectItem={(e) => handleMultipleSelectChange(e, 'themes')}
                isChecked={
                  (gameType.themes as string[])?.filter((t) => t === option)
                    .length > 0
                }
              />
            );
          })}
        </Multiselect>
      </FormControl>
      <FormControl key='features'>
        <FormControl.Label>Select Features</FormControl.Label>
        <Multiselect
          currentSelection={gameType.features as string[]}
          popoverProps={{ isFullWidth: true }}
          placeholder='Select one or more'
        >
          {GAME_METADATA_FEATURES.map((option) => {
            return (
              <Multiselect.Option
                key={option}
                itemId={option}
                value={option}
                label={option}
                onSelectItem={(e) => handleMultipleSelectChange(e, 'features')}
                isChecked={
                  (gameType.features as string[])?.filter((t) => t === option)
                    .length > 0
                }
              />
            );
          })}
        </Multiselect>
      </FormControl>
      <FormControl key='winLines'>
        <FormControl.Label>Win Lines</FormControl.Label>
        <Select
          id='winLines'
          name='winLines'
          value={String(gameType.winLines || "Other")}
          onChange={handleInputAndSelectChange}
        >
          <Select.Option key='none' value=''>
            Select an option
          </Select.Option>
          {WIN_LINES.map((option) => (
            <Select.Option key={option} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </FormControl>
      <FormControl key='reel'>
        <FormControl.Label>Reels</FormControl.Label>
        <Select
          id='reel'
          name='reel'
          value={String(gameType.reel || "Other")}
          onChange={handleInputAndSelectChange}
        >
          <Select.Option key='none' value=''>
            Select an option
          </Select.Option>
          {SLOTS_REELS.map((option) => (
            <Select.Option key={option} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </FormControl>
      <FormControl key='winLineType'>
        <FormControl.Label>Win Line Type</FormControl.Label>
        <Select
          id='winLineType'
          name='winLineType'
          value={String(gameType.winLineType || "Other")}
          onChange={handleInputAndSelectChange}
        >
          <Select.Option key='none' value=''>
            Select an option
          </Select.Option>
          {WIN_LINE_TYPES.map((option) => (
            <Select.Option key={option} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </FormControl>
      <FormControl key='waysToWin'>
        <FormControl.Label>Ways To Win</FormControl.Label>
        <Select
          id='waysToWin'
          name='waysToWin'
          value={String(gameType.waysToWin || "Other")}
          onChange={handleInputAndSelectChange}
        >
          <Select.Option key='none' value=''>
            Select an option
          </Select.Option>
          {WAYS_TO_WIN.map((option) => (
            <Select.Option key={option} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </FormControl>
      <FormControl key='symbolCount' >
        <FormControl.Label>Symbol Count</FormControl.Label>
        <TextInput
          value={String(gameType.symbolCount)}
          type='number'
          name='symbolCount'
          onChange={handleNumberInputs}
        />
      </FormControl>
      <FormControl key='maxMultiplier'>
        <FormControl.Label>Max Multiplier</FormControl.Label>
        <TextInput
          value={String(gameType.maxMultiplier)}
          type='number'
          name='maxMultiplier'
          onChange={handleNumberInputs}
        />
      </FormControl>
      <FormControl key='maxExposure'>
        <FormControl.Label>Max Exposure</FormControl.Label>
        <TextInput
          value={String(gameType.maxExposure)}
          type='number'
          name='maxExposure'
          onChange={handleNumberInputs}
        />
      </FormControl>
      <FormControl key='symbolType'>
        <FormControl.Label>Symbol Types</FormControl.Label>
        <Multiselect
          currentSelection={gameType.symbolType as string[]}
          popoverProps={{ isFullWidth: true }}
          placeholder='Select one or more'
        >
          {SYMBOL_TYPES.map((type) => {
            return (
              <Multiselect.Option
                key={type}
                itemId={type}
                value={type}
                label={type}
                onSelectItem={(e) =>
                  handleMultipleSelectChange(e, 'symbolType')
                }
                isChecked={
                  (gameType.symbolType as string[])?.filter(
                    (t) => t === type
                  ).length > 0
                }
              />
            );
          })}
        </Multiselect>
      </FormControl>

      <YesNoField
        field='isJackpot'
        labelText='Is Jackpot ?'
        value={gameType.isJackpot as boolean}
        onChange={handleRadioSelectChange}
      />
      <YesNoField
        field='isJackpotFixedPrize'
        labelText='Is Jackpot Fixed Prize ?'
        value={gameType.isJackpotFixedPrize as boolean}
        onChange={handleRadioSelectChange}
      />
      <YesNoField
        field='isJackpotInGameProgressive'
        labelText='Is Jackpot In Game Progessive ?'
        value={gameType.isJackpotInGameProgressive as boolean}
        onChange={handleRadioSelectChange}
      />
      <YesNoField
        field='isJackpotPlatformProgressive'
        labelText='Is Jackpot Platform Progessive ?'
        value={gameType.isJackpotPlatformProgressive as boolean}
        onChange={handleRadioSelectChange}
      />
      <YesNoField
        field='isPersistence'
        labelText='Is Persistence ?'
        value={gameType.isPersistence as boolean}
        onChange={handleRadioSelectChange}
      />
    </FormWrapperStyled>
  );
};

export default SlotsMetadataFields;
