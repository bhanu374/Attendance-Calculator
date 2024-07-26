function calculateAttendance() {
    
    const totalClassesSoFar = parseInt(
        document.getElementById("totalClasses").value,
        10
    );
    const classesAttended = parseInt(
        document.getElementById("classesAttended").value,
        10
    );
    const desiredAttendancePercentage = 75.0;

    if (isNaN(totalClassesSoFar) || isNaN(classesAttended)) {
        document.getElementById("result").innerHTML =
            "<span class='error'>Please enter valid numbers for both fields.</span>";
        document.getElementById("detailedInfoButton").style.display = "none";
        document.getElementById("showLessButton").style.display = "none";
        return;
    }

    if (classesAttended > totalClassesSoFar) {
        document.getElementById("result").innerHTML =
            "<span class='error'>Error: Number of classes attended cannot be greater than the total number of classes.</span>";
        document.getElementById("detailedInfoButton").style.display = "none";
        document.getElementById("showLessButton").style.display = "none";
        return;
    }

    
    const currentAttendancePercentage =
        (classesAttended / totalClassesSoFar) * 100;

   
    const classesMissed = totalClassesSoFar - classesAttended;

    
    let resultText = `Number of classes missed: ${classesMissed}<br>`;
    resultText += `Current attendance is ${currentAttendancePercentage.toFixed(
        2
    )}%.<br>`;

    if (currentAttendancePercentage >= desiredAttendancePercentage) {
        const maxTotalClasses =
            classesAttended / (desiredAttendancePercentage / 100.0);
        const maxClassesPossible = Math.floor(maxTotalClasses);
        const maxClassesMissed = maxClassesPossible - totalClassesSoFar;

        resultText += `You can miss up to ${maxClassesMissed} more classes while maintaining at least 75% attendance.<br>`;
    } else {
        let totalClassesNeeded = totalClassesSoFar;
        let newClassesAttended = classesAttended;

        while (
            newClassesAttended / totalClassesNeeded <
            desiredAttendancePercentage / 100.0
        ) {
            totalClassesNeeded++;
            newClassesAttended++;
        }

        resultText += `To achieve 75% attendance, you need to attend a total of ${totalClassesNeeded} classes.<br>`;
        resultText += `You need to attend ${
            totalClassesNeeded - totalClassesSoFar
        } more classes.`;
    }

    document.getElementById("result").innerHTML = resultText;

    document.getElementById("detailedInfoButton").style.display = "block";
    document.getElementById("showLessButton").style.display = "none";

    document.getElementById("detailedInfo").style.display = "none";
}

function showDetailedInfo() {
    const totalClassesSoFar = parseInt(
        document.getElementById("totalClasses").value,
        10
    );
    const classesAttended = parseInt(
        document.getElementById("classesAttended").value,
        10
    );

    if (
        isNaN(totalClassesSoFar) ||
        isNaN(classesAttended) ||
        classesAttended > totalClassesSoFar
    ) {
        document.getElementById("detailedInfo").innerHTML =
            "<span class='error'>Please enter valid numbers for both fields and ensure classes attended is not greater than total classes.</span>";
        return;
    }

    const currentPercentage = (classesAttended / totalClassesSoFar) * 100;
    let detailedText =
        "<h2>Classes Needed for Different Attendance Percentages:</h2><ul>";

    if (currentPercentage >= 75) {
        // Decrease percentage section
        detailedText += "<h3>Decrease Percentage:</h3><ul>";
        [90, 85, 80, 75].forEach((percentage) => {
            const maxTotalClasses = classesAttended / (percentage / 100.0);
            const maxClassesPossible = Math.floor(maxTotalClasses);
            const maxClassesMissed = maxClassesPossible - totalClassesSoFar;
            if (maxClassesMissed >= 0) {
                detailedText += `<li>You can miss up to ${maxClassesMissed} more classes while maintaining at least ${percentage}% attendance.</li>`;
            }
        });
        detailedText += "</ul><h3>Increase Percentage:</h3><ul>";

        // Increase percentage section
        let nextPercentage = Math.ceil(currentPercentage / 5) * 5;
        while (nextPercentage <= 95) {
            let totalClassesNeeded = totalClassesSoFar;
            let newClassesAttended = classesAttended;
            while (
                newClassesAttended / totalClassesNeeded <
                nextPercentage / 100.0
            ) {
                totalClassesNeeded++;
                newClassesAttended++;
            }
            detailedText += `<li>For ${nextPercentage}% attendance, you need to attend a total of ${totalClassesNeeded} classes.</li>`;
            nextPercentage += 5;
        }
    } else {
        // For current percentage below 75
        let nextPercentage = Math.ceil(currentPercentage / 5) * 5;
        while (nextPercentage <= 95) {
            let totalClassesNeeded = totalClassesSoFar;
            let newClassesAttended = classesAttended;
            while (
                newClassesAttended / totalClassesNeeded <
                nextPercentage / 100.0
            ) {
                totalClassesNeeded++;
                newClassesAttended++;
            }
            detailedText += `<li>For ${nextPercentage}% attendance, you need to attend a total of ${totalClassesNeeded} classes.</li>`;
            nextPercentage += 5;
        }
    }
    detailedText += "</ul>";
    document.getElementById("detailedInfo").innerHTML = detailedText;

    document.getElementById("detailedInfo").style.display = "block";
    document.getElementById("detailedInfoButton").style.display = "none";
    document.getElementById("showLessButton").style.display = "block";
}

function showLess() {
    document.getElementById("detailedInfo").style.display = "none";
    document.getElementById("detailedInfoButton").style.display = "block";
    document.getElementById("showLessButton").style.display = "none";
}

document
    .getElementById("totalClasses")
    .addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            calculateAttendance();
        }
    });

document
    .getElementById("classesAttended")
    .addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            calculateAttendance();
        }
    });
