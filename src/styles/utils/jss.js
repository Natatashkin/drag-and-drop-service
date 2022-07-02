import { jssPreset } from '@mui/styles';
import { create } from 'jss';
import jssIncreaseSpecificity from 'jss-increase-specificity';

export const jss = create({
  plugins: [...jssPreset().plugins, jssIncreaseSpecificity()],
});
