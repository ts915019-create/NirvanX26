/* =========================================
   NIRVAN '26 — MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =========================================
       EVENT DATA
    ========================================= */

    const events = [

        {
            name: "HACKATHON",
            type: "build",
            icon: "⌁",
            tag: "BUILD",
            desc: "24-hour innovation challenge. Build, collaborate and turn a strong idea into a working solution."
        },

        {
            name: "E-SPORTS",
            type: "compete",
            icon: "◉",
            tag: "COMPETE",
            desc: "Strategy, teamwork, reflexes and skill collide. Climb the leaderboard and battle for victory."
        },

        {
            name: "CTF",
            type: "compete",
            icon: "⌘",
            tag: "SECURITY",
            desc: "Test your cybersecurity skills across cryptography, web security, forensics and reverse engineering."
        },

        {
            name: "TREASURE HUNT",
            type: "explore",
            icon: "◇",
            tag: "ADVENTURE",
            desc: "Follow clues, solve challenges and race other teams through a high-energy problem-solving adventure."
        },

        {
            name: "DESIGN ARENA",
            type: "build",
            icon: "✦",
            tag: "CREATIVE",
            desc: "Transform an idea into a visual experience. Creativity, design thinking and storytelling take center stage."
        }

    ];


    const eventGrid =
        document.querySelector("#eventGrid");


    /* =========================================
       RENDER EVENTS
    ========================================= */

    function renderEvents(filter = "all") {

        if (!eventGrid) return;

        const filtered =
            events.filter(event => {

                return (
                    filter === "all" ||
                    event.type === filter
                );

            });


        eventGrid.innerHTML =
            filtered.map((event, index) => {

                return `

                    <button
                        class="event-card"
                        data-event="${event.name}"
                        type="button"
                    >

                        <span class="event-num">
                            ${String(index + 1).padStart(2, "0")}
                            / EVENT
                        </span>

                        <span class="event-tag">
                            ${event.tag}
                        </span>

                        <div class="event-icon">
                            ${event.icon}
                        </div>

                        <h3>
                            ${event.name}
                        </h3>

                        <p>
                            ${event.desc}
                        </p>

                        <div class="event-arrow">
                            ↗
                        </div>

                    </button>

                `;

            }).join("");


        attachEventButtons();

    }


    renderEvents();


    /* =========================================
       EVENT FILTER
    ========================================= */

    document
        .querySelectorAll(".filter")
        .forEach(button => {

            button.addEventListener("click", () => {

                document
                    .querySelectorAll(".filter")
                    .forEach(item => {

                        item.classList.remove("active");

                    });


                button.classList.add("active");

                renderEvents(
                    button.dataset.filter
                );

            });

        });


    /* =========================================
       EVENT MODAL
    ========================================= */

    const eventModal =
        document.querySelector("#eventModal");

    const eventModalClose =
        document.querySelector("#eventModalClose");

    const modalIcon =
        document.querySelector("#modalIcon");

    const modalTitle =
        document.querySelector("#modalTitle");

    const modalTag =
        document.querySelector("#modalTag");

    const modalDescription =
        document.querySelector("#modalDescription");

    const modalEventRegister =
        document.querySelector("#modalEventRegister");


    let selectedEvent = "";


    function attachEventButtons() {

        document
            .querySelectorAll(".event-card")
            .forEach(card => {

                card.addEventListener("click", () => {

                    const eventName =
                        card.dataset.event;

                    openEventModal(eventName);

                });

            });

    }


    function openEventModal(eventName) {

        const event =
            events.find(item =>
                item.name === eventName
            );

        if (!event || !eventModal) return;

        selectedEvent = event.name;

        modalIcon.textContent =
            event.icon;

        modalTitle.textContent =
            event.name;

        modalTag.textContent =
            event.tag;

        modalDescription.textContent =
            event.desc;

        eventModal.classList.add("show");

        document.body.classList.add(
            "modal-open"
        );

    }


    function closeEventModal() {

        if (!eventModal) return;

        eventModal.classList.remove("show");

        document.body.classList.remove(
            "modal-open"
        );

    }


    if (eventModalClose) {

        eventModalClose.addEventListener(
            "click",
            closeEventModal
        );

    }


    if (eventModal) {

        eventModal.addEventListener(
            "click",
            event => {

                if (
                    event.target === eventModal
                ) {
                    closeEventModal();
                }

            }
        );

    }


    if (modalEventRegister) {

        modalEventRegister.addEventListener(
            "click",
            () => {

                closeEventModal();

                const register =
                    document.querySelector("#register");

                if (register) {

                    register.scrollIntoView({
                        behavior: "smooth"
                    });

                }

                setTimeout(() => {

                    const eventSelect =
                        document.querySelector(
                            "#eventSelect"
                        );

                    if (eventSelect) {

                        eventSelect.value =
                            selectedEvent
                                .charAt(0) +
                            selectedEvent
                                .slice(1)
                                .toLowerCase();

                    }

                }, 700);

            }
        );

    }


    /* =========================================
       SCHEDULE
    ========================================= */

    const schedule = {

        1: [

            ["09:00", "Opening Ceremony", "Main Auditorium"],

            ["10:00", "HackSprint Begins", "Innovation Lab"],

            ["11:00", "CTF Challenge", "Lab 1"],

            ["13:00", "Lunch", "Food Court"],

            ["14:00", "Innovation Workshop", "Seminar Hall"],

            ["16:00", "E-Sports Qualifiers", "Open Ground"]

        ],


        2: [

            ["09:00", "Treasure Hunt", "Open Ground"],

            ["10:00", "Hackathon Final Push", "Innovation Lab"],

            ["13:00", "Lunch", "Food Court"],

            ["14:00", "Final Presentations", "Main Auditorium"],

            ["16:00", "Prize Distribution", "Main Auditorium"],

            ["18:00", "Closing Ceremony", "Main Auditorium"]

        ]

    };


    const timeline =
        document.querySelector("#timeline");


    function renderSchedule(day = 1) {

        if (!timeline) return;

        timeline.innerHTML =
            schedule[day]
                .map(item => {

                    return `

                        <div class="time-row">

                            <time>
                                ${item[0]}
                            </time>

                            <div>

                                <h3>
                                    ${item[1]}
                                </h3>

                                <p>
                                    NIRVAN '26 · Day ${day}
                                </p>

                            </div>

                            <span class="venue">
                                ${item[2]}
                            </span>

                        </div>

                    `;

                })
                .join("");

    }


    renderSchedule(1);


    /* =========================================
       DAY TABS
    ========================================= */

    document
        .querySelectorAll(".day")
        .forEach(button => {

            button.addEventListener("click", () => {

                document
                    .querySelectorAll(".day")
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });


                button.classList.add("active");

                renderSchedule(
                    button.dataset.day
                );

            });

        });


    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuButton =
        document.querySelector("#menuBtn");

    const navigation =
        document.querySelector("#navLinks");


    if (menuButton && navigation) {

        menuButton.addEventListener(
            "click",
            () => {

                navigation.classList.toggle(
                    "open"
                );

            }
        );


        navigation
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        navigation.classList.remove(
                            "open"
                        );

                    }
                );

            });

    }


    /* =========================================
       REGISTRATION MODAL
    ========================================= */

    const modal =
        document.querySelector("#modal");

    const openModal =
        document.querySelector("#openModal");

    const closeModal =
        document.querySelector("#closeModal");


    function showRegistration() {

        if (!modal) return;

        modal.classList.add("show");

        document.body.classList.add(
            "modal-open"
        );

    }


    function hideRegistration() {

        if (!modal) return;

        modal.classList.remove("show");

        document.body.classList.remove(
            "modal-open"
        );

    }


    if (openModal) {

        openModal.addEventListener(
            "click",
            showRegistration
        );

    }


    if (closeModal) {

        closeModal.addEventListener(
            "click",
            hideRegistration
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {
                    hideRegistration();
                }

            }
        );

    }


    /* =========================================
       REGISTRATION FORM
    ========================================= */

    const form =
        document.querySelector("#regForm");

    const formNote =
        document.querySelector("#formNote");


    if (form) {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                if (formNote) {

                    formNote.textContent =
                        "Registration captured successfully. Welcome to NIRVAN '26 🚀";

                    formNote.style.color =
                        "#d7ff43";

                }


                setTimeout(() => {

                    form.reset();

                    hideRegistration();

                }, 2200);

            }
        );

    }


    /* =========================================
       CAMPUS SELECTOR
    ========================================= */

    const campusCards =
        document.querySelectorAll(
            ".campus-card"
        );

    const campusDisplay =
        document.querySelector(
            "#campusDisplay"
        );


    const campusData = {

        dehradun: {
            title: "DEHRADUN",
            text:
                "Main NIRVAN '26 arena · Innovation Lab · Main Auditorium · Open Ground"
        },

        bhimtal: {
            title: "BHIMTAL",
            text:
                "North campus network · Workshops · Community challenges · Innovation activities"
        },

        haldwani: {
            title: "HALDWANI",
            text:
                "Central arena · Technical challenges · Creative sessions · Student community"
        },

        other: {
            title: "OTHER CAMPUS",
            text:
                "Multiple campuses. One community. Connect with the NIRVAN '26 network."
        }

    };


    campusCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                campusCards.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                card.classList.add("active");


                const key =
                    card.dataset.campus;

                const data =
                    campusData[key];


                if (!data || !campusDisplay) {
                    return;
                }


                campusDisplay.innerHTML = `

                    <div>

                        <span>
                            SELECTED CAMPUS
                        </span>

                        <strong>
                            ${data.title}
                        </strong>

                    </div>

                    <p>
                        ${data.text}
                    </p>

                `;

            }
        );

    });


    /* =========================================
       COUNTDOWN
    ========================================= */

    const countdown =
        document.querySelector("#countdown");


    const target =
        new Date(
            "2026-10-12T09:00:00+05:30"
        ).getTime();


    function updateCountdown() {

        if (!countdown) return;


        const distance =
            target - Date.now();


        if (distance <= 0) {

            countdown.innerHTML = `

                <div class="event-live">

                    <strong>
                        LIVE
                    </strong>

                    NIRVAN '26 HAS STARTED 🚀

                </div>

            `;

            return;

        }


        const days =
            Math.floor(
                distance / 86400000
            );


        const hours =
            Math.floor(
                (distance % 86400000) /
                3600000
            );


        const minutes =
            Math.floor(
                (distance % 3600000) /
                60000
            );


        const seconds =
            Math.floor(
                (distance % 60000) /
                1000
            );


        countdown.innerHTML = `

            <div>

                <strong>
                    ${String(days).padStart(2, "0")}
                </strong>

                DAYS

            </div>


            <div>

                <strong>
                    ${String(hours).padStart(2, "0")}
                </strong>

                HRS

            </div>


            <div>

                <strong>
                    ${String(minutes).padStart(2, "0")}
                </strong>

                MIN

            </div>


            <div>

                <strong>
                    ${String(seconds).padStart(2, "0")}
                </strong>

                SEC

            </div>

        `;

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".section, .event-card, .feature-card, .campus-card, .overview"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "reveal-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .08
            }
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        observer.observe(element);

    });


    /* =========================================
       ACTIVE NAV
    ========================================= */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            '#navLinks a[href^="#"]'
        );


    const navObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) return;


                    navLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );


                        if (
                            link.getAttribute(
                                "href"
                            ) ===
                            `#${entry.target.id}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            },
            {
                rootMargin:
                    "-40% 0px -50% 0px"
            }
        );


    sections.forEach(section => {

        navObserver.observe(section);

    });


    /* =========================================
       MOUSE PARALLAX
    ========================================= */

    const cursorGlow =
        document.querySelector(
            ".cursor-glow"
        );


    if (cursorGlow) {

        document.addEventListener(
            "mousemove",
            event => {

                cursorGlow.style.left =
                    `${event.clientX}px`;

                cursorGlow.style.top =
                    `${event.clientY}px`;

            }
        );

    }


    /* =========================================
       ESCAPE KEY
    ========================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }

            hideRegistration();

            closeEventModal();

            if (navigation) {

                navigation.classList.remove(
                    "open"
                );

            }

        }
    );


    /* =========================================
       CONSOLE MESSAGE
    ========================================= */

    console.log(
        "%c NIRVAN '26 ",
        "background:#d7ff43;color:#080909;padding:10px;font-size:16px;font-weight:bold;"
    );

    console.log(
        "WEB-A-THON 4.0 — Where Ideas Become Innovation."
    );

});