import MuiIconButton from '@mui/material/IconButton';

const IconButton = ({
  type = 'button',
  icon,
  onClick = () => {},
  buttonStyles,
}) => {
  return (
    <MuiIconButton
      className={buttonStyles}
      type={type}
      onClick={onClick}
      size="small"
    >
      {icon}
    </MuiIconButton>
  );
};

export default IconButton;
