import { makeStyles } from '@material-ui/styles';

const useRootStyles = makeStyles({
  typingTestMain: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  testSectionWrapper: {
    display: 'flex',
    flex: 1,
    width: '100%',
  },
});

export { useRootStyles };
