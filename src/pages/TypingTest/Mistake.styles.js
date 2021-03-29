import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  mistakeWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    height: 'auto',
    width: 'auto',
    paddingTop: '10%',
    paddingBottom: '10%',
    paddingLeft: '10%',
    paddingRight: '10%',
    marginTop: '10%',
    marginBottom: '10%',
  },
});

const useIncorrectCharacterStyles = makeStyles({
  incorrectCharacter: {
    backgroundColor: '#ff4444',
  },
});

export { useStyles, useIncorrectCharacterStyles };
