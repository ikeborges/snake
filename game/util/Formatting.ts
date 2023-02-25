export namespace Formatting {
  export function formatElapsedTime(time: Date): string {
    const getPaddedValue = (number: number) => {
      return number < 10 ? "0" + number.toString() : number;
    };

    const hours = getPaddedValue(time.getUTCHours());
    const minutes = getPaddedValue(time.getUTCMinutes());
    const seconds = getPaddedValue(time.getUTCSeconds());

    return `${hours}:${minutes}:${seconds}`;
  }
}
