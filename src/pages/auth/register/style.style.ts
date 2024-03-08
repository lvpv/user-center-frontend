import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
    main: {
      width: '368px',
      margin: '50px auto 0 auto',
    },
    title: {
      fontSize: '24px',
      fontWeight: '700',
      width: '100%',
      textAlign: 'center',
      marginBottom: '50px',
    },
    buttonGroup: {
      width: '100%',
      textAlign: 'right',
    },
    resetButton: {
      marginLeft: '15px',
    },
    loginLink: {
      marginLeft: '15px',
    },
  };
});

export default useStyles;
