import { makeStyles } from '@material-ui/core/styles';

const style = {
  rand: () => {
    return Math.round(Math.random() * 20) - 10;
  },
  getModalStyle: () => {
    const top = 5 + style.rand();
    const left = 5 + style.rand();
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  },
  useStyles: makeStyles((theme) => ({
    paper: {
      color: 'black',
      position: 'absolute',
      width: 600,
      borderRadius: '8vh',
      backgroundColor: 'white',
      border: 'transparent',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
    },
    paper1: {
      color: 'black',
      width: '100vh',
      border: 'transparent',
      boxShadow: theme.shadows[5],
      marginLeft: '46vh',
      backgroundColor: 'white',
      maxHeight: '88vh',
      overflow: 'auto',
      marginTop: '5vh',
    },
    root: {
      width: 200,
      display: 'flex',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'black',
      '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
        paddingLeft: 26,
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
    },
    formControlRoot: {
      fontFamily: 'Roboto Mono',
      width: '50vw',
      color: 'black',
      borderRadius: '7px',
      position: 'relative',
      '& label.Mui-focused': {
        color: 'black',
      },
    },
    inputLabelRoot: {
      color: 'black',
      fontFamily: 'Roboto Mono',
      '&.focused': {
        color: 'black',
      },
    },
  })),
};

export default style;