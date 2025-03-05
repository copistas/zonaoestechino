async function fetchData() {
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTHYnzxtllhxt9-CuCrSVYGGi2Uht0f-n6CwdmpWn64EJ2xx-wtK63vFfm6t1KNpDqcsekhsDtTilYI/pubhtml?gid=91131297&single=true';
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const rows = doc.querySelectorAll('table tbody tr');

    const today = new Date();
    let nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + (7 - today.getDay()) % 7);

    function parseDate(dateStr) {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
    }

    let availableDates = [];
    let dateRows = {};

    rows.forEach(row => {
        const dateCell = row.querySelector('td');
        if (dateCell) {
            const rowDate = parseDate(dateCell.innerText.trim());
            if (!isNaN(rowDate)) {
                availableDates.push(rowDate);
                dateRows[rowDate.getTime()] = row;
            }
        }
    });

    availableDates.sort((a, b) => a - b);
    let selectedDate = availableDates.find(date => date >= nextSunday) || availableDates[0];

    if (selectedDate) {
        const resultTable = document.getElementById('resultTable').querySelector('tbody');
        resultTable.innerHTML = '';
        resultTable.appendChild(dateRows[selectedDate.getTime()].cloneNode(true));
    }
}
