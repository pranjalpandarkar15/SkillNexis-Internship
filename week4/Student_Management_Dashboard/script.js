// ==========================================
// STUDENT MANAGEMENT DASHBOARD
// ==========================================


// ==========================================
// LOAD STUDENTS FROM LOCAL STORAGE
// ==========================================

let students =
    JSON.parse(localStorage.getItem("students")) || [];


// ==========================================
// EDIT INDEX
// ==========================================

let editIndex = null;


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const studentForm =
    document.getElementById("studentForm");

const nameInput =
    document.getElementById("name");

const rollNoInput =
    document.getElementById("rollNo");

const courseInput =
    document.getElementById("course");

const yearInput =
    document.getElementById("year");

const emailInput =
    document.getElementById("email");

const marksInput =
    document.getElementById("marks");

const studentTableBody =
    document.getElementById("studentTableBody");

const searchInput =
    document.getElementById("search");

const courseFilter =
    document.getElementById("courseFilter");

const yearFilter =
    document.getElementById("yearFilter");

const emptyState =
    document.getElementById("emptyState");

const submitButton =
    studentForm.querySelector(".btn-primary");


// Statistics

const totalStudents =
    document.getElementById("totalStudents");

const averageMarks =
    document.getElementById("averageMarks");

const totalCourses =
    document.getElementById("totalCourses");

const topMarks =
    document.getElementById("topMarks");

const recordCount =
    document.getElementById("recordCount");


// ==========================================
// SAVE STUDENTS
// ==========================================

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


// ==========================================
// ADD / UPDATE STUDENT
// ==========================================

studentForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        // Get values

        const name =
            nameInput.value.trim();

        const rollNo =
            rollNoInput.value.trim();

        const course =
            courseInput.value;

        const year =
            yearInput.value;

        const email =
            emailInput.value.trim();

        const marks =
            Number(marksInput.value);


        // ==================================
        // VALIDATION
        // ==================================

        if (
            !name ||
            !rollNo ||
            !course ||
            !year ||
            !email ||
            marks < 0 ||
            marks > 100
        ) {

            alert(
                "Please enter valid student details."
            );

            return;

        }


        // ==================================
        // DUPLICATE ROLL NUMBER
        // ==================================

        const duplicate =
            students.some(
                function(student, index) {

                    return (
                        student.rollNo.toLowerCase() ===
                        rollNo.toLowerCase() &&
                        index !== editIndex
                    );

                }
            );


        if (duplicate) {

            alert(
                "This roll number already exists."
            );

            return;

        }


        // ==================================
        // STUDENT OBJECT
        // ==================================

        const student = {

            name: name,

            rollNo: rollNo,

            course: course,

            year: year,

            email: email,

            marks: marks

        };


        // ==================================
        // UPDATE
        // ==================================

        if (editIndex !== null) {

            students[editIndex] =
                student;

            editIndex = null;

        }


        // ==================================
        // CREATE
        // ==================================

        else {

            students.push(student);

        }


        // ==================================
        // SAVE
        // ==================================

        saveStudents();


        // ==================================
        // UPDATE UI
        // ==================================

        displayStudents();

        updateStatistics();

        updateCourseFilter();


        // ==================================
        // RESET FORM
        // ==================================

        studentForm.reset();

        submitButton.textContent =
            "+ Add Student";

    }
);


// ==========================================
// DISPLAY STUDENTS
// ==========================================

function displayStudents() {

    studentTableBody.innerHTML = "";


    // Get search text

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    // Get selected filters

    const selectedCourse =
        courseFilter.value;

    const selectedYear =
        yearFilter.value;


    // Filter students

    const filteredStudents =
        students.filter(
            function(student) {

                const matchesSearch =

                    student.name
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    student.rollNo
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    student.email
                        .toLowerCase()
                        .includes(searchText);


                const matchesCourse =

                    selectedCourse === "all"

                    ||

                    student.course ===
                    selectedCourse;


                const matchesYear =

                    selectedYear === "all"

                    ||

                    student.year ===
                    selectedYear;


                return (
                    matchesSearch &&
                    matchesCourse &&
                    matchesYear
                );

            }
        );


    // ==================================
    // EMPTY STATE
    // ==================================

    if (filteredStudents.length === 0) {

        emptyState.style.display =
            "block";

        recordCount.textContent =
            "0 Records";

        return;

    }


    emptyState.style.display =
        "none";


    recordCount.textContent =
        `${filteredStudents.length} Records`;


    // ==================================
    // CREATE TABLE ROWS
    // ==================================

    filteredStudents.forEach(
        function(student) {

            const originalIndex =
                students.indexOf(student);


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${student.rollNo}
                </td>


                <td>

                    <strong>
                        ${student.name}
                    </strong>

                </td>


                <td>
                    ${student.course}
                </td>


                <td>
                    ${student.year}
                </td>


                <td>
                    ${student.email}
                </td>


                <td>
                    ${student.marks}%
                </td>


                <td>

                    <button
                        class="edit-btn"
                        onclick="editStudent(${originalIndex})"
                    >
                        Edit
                    </button>


                    <button
                        class="delete-btn"
                        onclick="deleteStudent(${originalIndex})"
                    >
                        Delete
                    </button>

                </td>

            `;


            studentTableBody.appendChild(row);

        }
    );

}


// ==========================================
// EDIT STUDENT
// ==========================================

function editStudent(index) {

    const student =
        students[index];


    nameInput.value =
        student.name;

    rollNoInput.value =
        student.rollNo;

    courseInput.value =
        student.course;

    yearInput.value =
        student.year;

    emailInput.value =
        student.email;

    marksInput.value =
        student.marks;


    editIndex = index;


    submitButton.textContent =
        "Update Student";


    studentForm.scrollIntoView({
        behavior: "smooth"
    });

}


// ==========================================
// DELETE STUDENT
// ==========================================

function deleteStudent(index) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmation) {

        return;

    }


    students.splice(index, 1);


    saveStudents();


    displayStudents();

    updateStatistics();

    updateCourseFilter();

}


// ==========================================
// UPDATE STATISTICS
// ==========================================

function updateStatistics() {

    // Total students

    totalStudents.textContent =
        students.length;


    // No students

    if (students.length === 0) {

        averageMarks.textContent =
            "0%";

        topMarks.textContent =
            "0%";

        totalCourses.textContent =
            "0";

        return;

    }


    // Average marks

    const totalMarks =
        students.reduce(
            function(total, student) {

                return total +
                    student.marks;

            },
            0
        );


    const average =
        totalMarks /
        students.length;


    averageMarks.textContent =
        `${average.toFixed(1)}%`;


    // Top marks

    const highest =
        Math.max(
            ...students.map(
                function(student) {
                    return student.marks;
                }
            )
        );


    topMarks.textContent =
        `${highest}%`;


    // Total courses

    const courses =
        new Set(
            students.map(
                function(student) {
                    return student.course;
                }
            )
        );


    totalCourses.textContent =
        courses.size;

}


// ==========================================
// UPDATE COURSE FILTER
// ==========================================

function updateCourseFilter() {

    const currentValue =
        courseFilter.value;


    const courses =
        [
            ...new Set(
                students.map(
                    function(student) {
                        return student.course;
                    }
                )
            )
        ];


    courseFilter.innerHTML = `

        <option value="all">
            All Courses
        </option>

    `;


    courses.forEach(
        function(course) {

            const option =
                document.createElement("option");


            option.value =
                course;


            option.textContent =
                course;


            courseFilter.appendChild(
                option
            );

        }
    );


    // Restore selected filter

    if (
        courses.includes(currentValue)
    ) {

        courseFilter.value =
            currentValue;

    }

}


// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener(
    "input",
    function() {

        displayStudents();

    }
);


// ==========================================
// COURSE FILTER
// ==========================================

courseFilter.addEventListener(
    "change",
    function() {

        displayStudents();

    }
);


// ==========================================
// YEAR FILTER
// ==========================================

yearFilter.addEventListener(
    "change",
    function() {

        displayStudents();

    }
);


// ==========================================
// FORM RESET
// ==========================================

studentForm.addEventListener(
    "reset",
    function() {

        editIndex = null;

        submitButton.textContent =
            "+ Add Student";

    }
);


// ==========================================
// INITIALIZE APPLICATION
// ==========================================

updateCourseFilter();

displayStudents();

updateStatistics();