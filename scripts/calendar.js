// Подключаем FullCalendar.js и Day.js через CDN
// FullCalendar: https://cdn.jsdelivr.net/npm/@fullcalendar/core@6.1.8/main.min.js
// FullCalendar CSS: https://cdn.jsdelivr.net/npm/@fullcalendar/core@6.1.8/main.min.css не получилось установить
// Day.js: https://cdn.jsdelivr.net/npm/dayjs/dayjs.min.js

document.addEventListener('DOMContentLoaded', () => {
    // Инициализация календаря
    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // Отображаем календарь месяцем
        initialDate: dayjs().format('YYYY-MM-DD'), // Устанавливаем текущую дату
        headerToolbar: {
            left: 'prev,next today', // Кнопки переключения месяца
            center: 'title', // Заголовок с названием месяца
            right: '' // Убираем ненужные кнопки
        },
        events: [
            // Добавляем события
            {
                title: 'Занятие',
                start: dayjs().add(2, 'day').format('YYYY-MM-DD'), // Через два дня
                backgroundColor: '#ffcc00',
                borderColor: '#ffcc00'
            }
        ],
        // Настройка кликов по событиям
        eventClick: function(info) {
            alert(`Событие: ${info.event.title}\nДата: ${info.event.start.toLocaleDateString()}`);
        },
        locale: 'ru',
    });

    calendar.render(); // Отрисовываем календарь
});
