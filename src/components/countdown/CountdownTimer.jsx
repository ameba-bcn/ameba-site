import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from './useCountdown';

const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
        <div className="show-counter">
            <DateTimeDisplay value={days} type={'Dies'} isDanger={days <= 3} />
            <p>:</p>
            <DateTimeDisplay value={hours} type={'Hores'} isDanger={false} />
            <p>:</p>
            <DateTimeDisplay value={minutes} type={'Minuts'} isDanger={false} />
            <p>:</p>
            <DateTimeDisplay value={seconds} type={'Segons'} isDanger={false} />
        </div>
    );
};

const CountdownTimer = ({ targetDate }) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    if (days + hours + minutes + seconds <= 0) {
        return <div>Estem tenint algun problema técnic, tornem en uns minuts</div>;
    } else {
        return (
            <ShowCounter
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        );
    }
};

export default CountdownTimer;