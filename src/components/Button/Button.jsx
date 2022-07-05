import MuiButton from '@mui/material/Button';
import { useSyles } from './Button.styles';

const Button = ({ title, onClick = () => {} }) => {
  const s = useSyles();
  return (
    <MuiButton className={s.button} variant="contained" onClick={onClick}>
      {title}
    </MuiButton>
  );
};

export default Button;
