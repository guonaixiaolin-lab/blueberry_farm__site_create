'use strict';

const thisYear = 2026;
const holidays = {
    '2026-07-15': '海の日',
    '2026-08-11': '山の日'
};

function generateCalendar(year, month, elementId, openDates = []) {
    const firstDate = new Date(year, month - 1, 1);
    const firstDay = firstDate.getDay();
    const lastDate = new Date(year, month, 0);
    const lastDayCount = lastDate.getDate();

    let dayCount = 1;
    let createHtml = '';

    createHtml = '<h1 class="calender-title">' + year + '/' + month + '</h1>';
    createHtml += '<table><tr>';

    const weeks = ['日', '月', '火', '水', '木', '金', '土'];
    for (let i = 0; i < weeks.length; i++) {
        let weekClass = '';
        if (i === 0) weekClass = 'sun';
        if (i === 6) weekClass = 'sat';
        createHtml += '<td class="' + weekClass + '">' + weeks[i] + '</td>';
    }
    createHtml += '</tr>';

    for (let n = 0; n < 6; n++) {
        createHtml += '<tr>';
        for (let d = 0; d < 7; d++) {
            let className = '';
            if (d === 0) className = 'sun';
            if (d === 6) className = 'sat';

            if (n === 0 && d < firstDay) {
                createHtml += '<td></td>';
            } else if (dayCount > lastDayCount) {
                createHtml += '<td></td>';
            } else {
                const dateKey =
                    year + '-' +
                    String(month).padStart(2, '0') + '-' +
                    String(dayCount).padStart(2, '0');

                if (holidays[dateKey]) className = 'holiday';

                const isOpen = openDates.includes(dateKey);
                const icon = isOpen
                    ? '<img src="peg/blueberry.png" class="day-icon">'
                    : '';

                if (isOpen) className += ' open-day';

                createHtml +=
                    '<td class="' + className + '" data-date="' + dateKey + '">' +
                    '<div class="day-cell">' +
                    '<span class="day-num">' + dayCount + '</span>' + icon +
                    '</div>' +
                    '</td>';
                dayCount++;
            }
        }
        createHtml += '</tr>';
    }

    createHtml += '</table>';
    document.querySelector(elementId).innerHTML = createHtml;
}

async function init() {
    try {
        const apiUrl = window.CALENDAR_API_URL || '';
        const response = await fetch(apiUrl + "/calendar");
        const openDates = await response.json();
        generateCalendar(thisYear, 7, '#cal-7', openDates);
        generateCalendar(thisYear, 8, '#cal-8', openDates);
    } catch (e) {
        generateCalendar(thisYear, 7, '#cal-7');
        generateCalendar(thisYear, 8, '#cal-8');
    }
}

init();