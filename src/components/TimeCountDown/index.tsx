import React, {useEffect} from 'react';
import {View} from 'react-native';

import styles from './styles';
import Paragraph from '../Paragraph';

const TimeCountDown = ({time}) => {
  const [countdown, setCountdown] = React.useState(0);
  const convertTime = (second: number) => {
    let hours: string | number = Math.floor(second / 3600);
    let minutes: string | number = Math.floor((second - hours * 3600) / 60);
    let seconds: string | number = second - hours * 3600 - minutes * 60;
    if (hours < 10) {
      hours = '0' + hours.toString();
    }
    if (minutes < 10) {
      minutes = '0' + minutes.toString();
    }
    if (seconds < 10) {
      seconds = '0' + seconds.toString();
    }

    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    let interval: any = false;
    clearInterval(interval);
    setCountdown(time);
    interval = setInterval(() => {
      setCountdown(value => value - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return (
    <View style={styles.countDownContainer}>
      <Paragraph p textCenter textBlack title='You will be able to resend in' />
      <Paragraph h1 textCenter textOxleyColor title={convertTime(countdown)} />
    </View>
  );
};

export default TimeCountDown;
