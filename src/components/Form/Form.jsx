import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { IconButton } from 'components/IconButton';
import classNames from 'classnames';
import { useStyles } from './Form.styles';
import InputAdornment from '@mui/material/InputAdornment';

const Form = ({ onAddNewList, onCloseForm }) => {
  const [inputValue, setInputValue] = useState('');

  const handleTextFieldChange = ({ target: { value } }) => {
    const regex = /[a-zA-Z_ ]$/;
    if (regex.test(value) || !value) {
      setInputValue(value);
    }
  };

  const formReset = () => {
    setInputValue('');
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    onAddNewList(inputValue);
    formReset();
    onCloseForm();
  };

  const s = useStyles();
  const showButton = inputValue.length > 0;

  return (
    <Box className={s.formContiner}>
      <Box
        component="form"
        className={s.form}
        noValidate
        autoComplete="off"
        onSubmit={handleOnSubmit}
      >
        <IconButton
          buttonStyles={s.closeIcon}
          icon={<ClearIcon />}
          onClick={onCloseForm}
        />
        <TextField
          id="standard-basic"
          label="Enter list title"
          variant="standard"
          autoFocus
          fullWidth
          value={inputValue}
          onChange={handleTextFieldChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="submit"
                  icon={<CheckIcon />}
                  buttonStyles={classNames([
                    s.submitFormButton,
                    {
                      [s.submitFormButtonHidden]: !showButton,
                    },
                  ])}
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default Form;
