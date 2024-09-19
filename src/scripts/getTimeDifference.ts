export function getTimeDifference(date: string | Date | number): string {
    const now = new Date();
    let givenDate: Date;
    try {
        givenDate = new Date(date);
    } catch (e) {
        return "Invalid date";
    }

    if (isNaN(givenDate.getTime())) return "Invalid date";

    const diffMs = Math.abs(now.getTime() - givenDate.getTime());

    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays >= 1) {
        return givenDate.toLocaleDateString();
    } else if (diffHours >= 1) {
        return `${diffHours} heure${diffHours > 1 ? "s" : ""}`;
    } else if (diffMinutes >= 1) {
        return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;
    } else {
        return `${diffSeconds} seconde${diffSeconds > 1 ? "s" : ""}`;
    }
}
