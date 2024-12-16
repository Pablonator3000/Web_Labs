document.addEventListener("DOMContentLoaded", () => {
    const tableForm = document.getElementById("tableForm");
    const resultContainer = document.getElementById("resultContainer");
    const saveParamsButton = document.getElementById("saveParams");
    const loadParamsButton = document.getElementById("loadParams");

    tableForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const studyingDays = document.getElementById("studyingDays").value;
        const numClasses = document.getElementById("numClasses").value;
        const timeInterval = document.getElementById("timeInterval").value;
        const subjects = Array.from(
            document.querySelectorAll("input[name='subjects']:checked")
        ).map((input) => input.value);


        generateScheduleTable(studyingDays, numClasses, subjects, timeInterval);
    });

    saveParamsButton.addEventListener("click", () => {
        const formData = {
            studyingDays: document.getElementById("studyingDays").value,
            numClasses: document.getElementById("numClasses").value,
            timeInterval: document.getElementById("timeInterval").value,
            subjects: Array.from(
                document.querySelectorAll("input[name='subjects']:checked")
            ).map((input) => input.value),
        };
        localStorage.setItem("scheduleFormData", JSON.stringify(formData));
        alert("Settings saved!");
    });

    loadParamsButton.addEventListener("click", () => {
        const savedData = JSON.parse(localStorage.getItem("scheduleFormData"));
        if (savedData) {
            document.getElementById("studyingDays").value = savedData.studyingDays || "";
            document.getElementById("numClasses").value = savedData.numClasses || "";
            document.getElementById("timeInterval").value = savedData.timeInterval || "";

            document.querySelectorAll("input[name='subjects']").forEach((input) => {
                input.checked = savedData.subjects && savedData.subjects.includes(input.value);
            });

            alert("Settings loaded!");

            // Вызов функции для генерации расписания на основе загруженных данных
            generateScheduleTable(
                savedData.studyingDays,
                savedData.numClasses,
                savedData.subjects,
                savedData.timeInterval
            );
        } else {
            alert("No saved settings found.");
        }
    });

    function getRandomElements(arr, n) {
        if (n > arr.length) {
            throw new Error("Requested number of elements exceeds array size.");
        }

        const shuffled = arr.sort(() => Math.random() - 0.5); // Перемешиваем массив
        return shuffled.slice(0, n); // Берем первые n элементов
    }

    function generateScheduleTable(studyingDays, numClasses, subjects, timeInterval) {
        const days = getRandomElements(["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"], studyingDays)

        const table = document.createElement("table");
        table.classList.add("schedule-table");

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        const timeHeader = document.createElement("th");
        timeHeader.textContent = "Время";
        headerRow.appendChild(timeHeader);

        days.forEach((day) => {
            const th = document.createElement("th");
            th.textContent = day;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");

        const usedSlots = new Set(); // Хранилище использованных комбинаций

        for (let i = 0; i < numClasses; i++) {
            const row = document.createElement("tr");

            // Случайный выбор времени
            let timeStart, timeEnd;
            do {
                const randomHour = Math.floor(Math.random() * (18 - 8)) + 8; // Время занятий от 8:00 до 18:00
                timeStart = randomHour;
                timeEnd = randomHour + Number(timeInterval);
            } while (usedSlots.has(`${timeStart}-${timeEnd}`));
            usedSlots.add(`${timeStart}-${timeEnd}`);

            const timeCell = document.createElement("td");
            timeCell.textContent = `${timeStart}:00 - ${timeEnd}:00`;
            row.appendChild(timeCell);

            // Случайный выбор дней занятий
            const randomDayIndex = Math.floor(Math.random() * days.length);
            days.forEach((day, index) => {
                const cell = document.createElement("td");
                if (index === randomDayIndex) {
                    cell.textContent = subjects.join(", "); // Заполняем предметы в случайный день
                }
                row.appendChild(cell);
            });

            tbody.appendChild(row);
        }

        table.appendChild(tbody);

        resultContainer.innerHTML = "";
        resultContainer.appendChild(table);
    }

});