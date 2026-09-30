import CountdownTimer from "./CountdownTimer";

export default {
  title: "Components/CountdownTimer",
  component: CountdownTimer,
};

export const InTenDays = {
  args: { targetDate: "2031-06-25T20:00:00.000Z" },
};

export const EndingSoon = {
  args: { targetDate: "2031-06-15T20:00:05.000Z" },
};
