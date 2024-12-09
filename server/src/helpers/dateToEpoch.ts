const dateToEpoch = (date: string): number => {
    return new Date(date).getTime();
};

export default dateToEpoch;
