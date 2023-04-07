import moment from "moment";

const endIn = (endTimestamp: number) => {
  const now = moment();

  const duration = moment.duration(endTimestamp - now.unix(), "seconds");
  const daysRemaining = Math.floor(duration.asDays());
  const hoursRemaining = Math.floor(duration.asHours() % 24);
  const minutesRemaining = Math.floor(duration.asMinutes() % 60);

  return `in ${daysRemaining} days ${hoursRemaining} hours and ${minutesRemaining} minutes`;
};

export { endIn };
