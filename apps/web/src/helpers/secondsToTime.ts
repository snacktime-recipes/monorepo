export default function (seconds: number): { hours: number, minutes: number } {
    let hours = 0;
    let minutes = 0;

    while (seconds > 0) {
        if (seconds < 60) seconds = 0;

        seconds -= 60;
        minutes += 1;

        if (minutes >= 60) {
            minutes -= 60;
            hours += 1;
        };
    };

    return { hours, minutes, };
};