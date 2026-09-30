/* =====================================================
   FOODYA - JAVASCRIPT
   ===================================================== */


/* =====================================================
   ELEMENTOS
   ===================================================== */

const header =
    document.getElementById("header");

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

const navLinks =
    [...document.querySelectorAll(".nav-link")];

const sections =
    [...document.querySelectorAll("main section[id]")];

const backToTop =
    document.getElementById("backToTop");

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");

const year =
    document.getElementById("year");


/* =====================================================
   AÑO AUTOMÁTICO
   ===================================================== */

year.textContent =
    new Date().getFullYear();


/* =====================================================
   MENÚ RESPONSIVE
   ===================================================== */

menuToggle.addEventListener(
    "click",
    () => {

        const isOpen =
            navMenu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    }
);


/* Cerrar menú al seleccionar una opción */

navLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                navMenu.classList.remove(
                    "open"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    }
);


/* =====================================================
   HEADER + SECCIÓN ACTIVA
   ===================================================== */

function updateScrollUI() {

    /*
        Cambiar apariencia del header
    */

    header.classList.toggle(
        "scrolled",
        window.scrollY > 30
    );


    /*
        Mostrar botón volver arriba
    */

    backToTop.classList.toggle(
        "show",
        window.scrollY > 500
    );


    /*
        Detectar sección actual
    */

    const current =
        sections.reduce(
            (active, section) => {

                const top =
                    section.getBoundingClientRect().top;

                return top <= 140
                    ? section.id
                    : active;

            },
            "inicio"
        );


    /*
        Marcar enlace activo
    */

    navLinks.forEach(
        link => {

            link.classList.toggle(
                "active",
                link.getAttribute("href")
                === `#${current}`
            );

        }
    );

}


window.addEventListener(
    "scroll",
    updateScrollUI,
    {
        passive: true
    }
);


updateScrollUI();


/* =====================================================
   BOTÓN VOLVER ARRIBA
   ===================================================== */

backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =====================================================
   ANIMACIONES AL HACER SCROLL
   ===================================================== */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("visible");

                        revealObserver
                            .unobserve(
                                entry.target
                            );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


document
    .querySelectorAll(".reveal")
    .forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );


/* =====================================================
   VALIDACIÓN DEL FORMULARIO
   ===================================================== */

function setInvalid(
    field,
    invalid
) {

    field.classList.toggle(
        "invalid",
        invalid
    );

}


function showFormMessage(
    text,
    type
) {

    formMessage.textContent =
        text;

    formMessage.className =
        `form-message ${type}`;

}


/*
    Validar mientras el usuario escribe
*/

contactForm
    .querySelectorAll(
        "input, textarea"
    )
    .forEach(
        field => {

            field.addEventListener(
                "input",
                () => {

                    setInvalid(
                        field,
                        !field.checkValidity()
                    );

                }
            );

        }
    );


/*
    Validar cuando se envía
*/

contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const fields =
            [
                ...contactForm
                    .querySelectorAll(
                        "input, textarea"
                    )
            ];


        let valid = true;


        fields.forEach(
            field => {

                const fieldIsValid =
                    field.checkValidity();


                setInvalid(
                    field,
                    !fieldIsValid
                );


                if (!fieldIsValid) {

                    valid = false;

                }

            }
        );


        /*
            Si hay errores
        */

        if (!valid) {

            showFormMessage(
                "Revisa los campos marcados e intenta nuevamente.",
                "error"
            );

            return;

        }


        /*
            Formulario correcto
        */

        showFormMessage(
            "¡Mensaje enviado correctamente! Gracias por contactar a FoodYa.",
            "success"
        );


        contactForm.reset();


        fields.forEach(
            field => {

                setInvalid(
                    field,
                    false
                );

            }
        );

    }
);


/* =====================================================
   SCROLL SUAVE
   ===================================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetId =
                        anchor.getAttribute(
                            "href"
                        );

                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );


/* =====================================================
   REDES SOCIALES DE DEMOSTRACIÓN
   ===================================================== */

document
    .querySelectorAll(
        ".socials a"
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    alert(
                        "Próximamente podrás visitar nuestras redes sociales."
                    );

                }
            );

        }
    );