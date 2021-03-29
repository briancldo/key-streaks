import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  testSection: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  mistake: {
    minHeight: '5%',
    minWidth: '10%',
  },
});

export { useStyles };
