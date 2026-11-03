// "2026-11-06" -> "Fri 6 Nov 2026"
export function formatDate(date) {
    return new Date(date + 'T00:00').toLocaleDateString('en-NZ', {
        weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
    });
}

// "14:30:00" -> "2:30 PM"
export function formatTime(time) {
    const [hours, minutes] = time.split(':').map(Number);
    const suffix = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;
    return hour12 + ':' + String(minutes).padStart(2, '0') + ' ' + suffix;
}

export function slotLabel(slot) {
    return slot.doctor_name + ' - ' + formatDate(slot.date) + ' ' + formatTime(slot.start_time);
}
