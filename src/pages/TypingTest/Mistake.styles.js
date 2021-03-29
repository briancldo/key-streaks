import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  mistakeWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    height: '100%',
    width: '100%',
    marginTop: '5%',
    marginBottom: '5%',
  },
});

const useIncorrectCharacterStyles = makeStyles({
  incorrectCharacter: {
    color: 'red',
  },
});

export { useStyles, useIncorrectCharacterStyles };
