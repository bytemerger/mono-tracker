function convertToStringType(date: Date) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();

    return dd + '-' + mm + '-' + yyyy;
}
export function getMonthDatePair() {
    const today = new Date();
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 2);
    return {
        today: convertToStringType(today),
        monthAgo: convertToStringType(monthAgo),
    };
}
