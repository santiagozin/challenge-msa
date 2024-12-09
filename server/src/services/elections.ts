const applyDHondt = (partiesData: { list: string; votes: number }[], totalSeats: number) => {
    if (!Array.isArray(partiesData) || typeof totalSeats !== 'number' || totalSeats <= 0) {
        throw new Error('Invalid input: partiesData must be an array and totalSeats must be a positive number.');
    }

    const votes = partiesData.map(party => party.votes);
    const seats = Array(votes.length).fill(0);
    const quotients = [...votes];

    for (let i = 0; i < totalSeats; i++) {
        const maxIndex = quotients.indexOf(Math.max(...quotients));
        seats[maxIndex] += 1;
        quotients[maxIndex] = votes[maxIndex] / (seats[maxIndex] + 1);
    }

    return partiesData.map((party, index) => ({
        list: party.list,
        seats: seats[index]
    }));
};

export default applyDHondt;
