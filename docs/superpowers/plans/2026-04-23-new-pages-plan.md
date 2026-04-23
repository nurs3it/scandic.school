# New Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create three new pages (`/structure`, `/community`, `/programs`) for Scandic School website with full localization (ru, en, kk) and navigation integration.

**Architecture:** Each page follows the existing pattern: a Next.js App Router page file imports Header, Footer, and a dedicated async server component. All text content lives in `messages/*.json` translation files. Components use `ScrollReveal` for animations, `ParticleBackground` for hero sections, and Tailwind CSS with the project's design system (secondary=green, primary=yellow, accent=orange).

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion (via ScrollReveal), Three.js (via ParticleBackground), Lucide React icons, next-intl (cookie-based locale).

**Spec:** `docs/superpowers/specs/2026-04-23-new-pages-design.md`

---

## File Structure

### New files:
| File | Responsibility |
|------|---------------|
| `src/app/structure/page.tsx` | Route wrapper for Structure page |
| `src/app/community/page.tsx` | Route wrapper for Community page |
| `src/app/programs/page.tsx` | Route wrapper for Programs page |
| `src/components/structure-page-content.tsx` | Full Structure page content (server component) |
| `src/components/community-page-content.tsx` | Full Community page content (server component) |
| `src/components/programs-page-content.tsx` | Full Programs page content (server component) |

### Modified files:
| File | Change |
|------|--------|
| `messages/ru.json` | Add `structure`, `community`, `academicPrograms` translation keys + nav/header keys |
| `messages/en.json` | Same structure, English translations |
| `messages/kk.json` | Same structure, Kazakh translations |
| `src/components/client-header.tsx` | Add 3 items to `aboutNavigation` array |
| `src/components/footer.tsx` | Add links in Quick Links section |
| `src/components/about-page-content.tsx` | Add structure teaser before sub-nav |
| `src/lib/metadata.ts` | Add `structure`, `community`, `programs` cases |

---

### Task 1: Add translation keys to all locale files

**Files:**
- Modify: `messages/ru.json`
- Modify: `messages/en.json`
- Modify: `messages/kk.json`

- [ ] **Step 1: Add navigation and header keys to `messages/ru.json`**

Find the `navigation` object and add new keys. Find the `header.descriptions` object and add new keys. Find the `metadata` object (near end of file) and add new keys.

Add to `navigation` (after `"news": "Новости"`):
```json
"structure": "Структура",
"community": "Сообщество",
"programs": "Программа"
```

Add to `header.descriptions` (after `"school": "О нашей школе"`):
```json
"structure": "Устройство и управление школой",
"community": "Учителя, дети и родители",
"programs": "Академическая программа"
```

Add to `metadata` (after the `partners` block):
```json
"structure": {
  "title": "Структура школы | Scandic International School",
  "description": "Узнайте об устройстве, управлении и инфраструктуре Scandic International School"
},
"community": {
  "title": "Сообщество | Scandic International School",
  "description": "Учителя, дети и родители — три стороны образовательного процесса"
},
"academicPrograms": {
  "title": "Академическая программа | Scandic International School",
  "description": "Междисциплинарный подход с фокусом на STEM и развитие личности"
}
```

- [ ] **Step 2: Add `structure` page content keys to `messages/ru.json`**

Add before the closing `}` of the file (after `partners` section):

```json
"structure": {
  "heroLabel": "Структура",
  "title": "СТРУКТУРА ШКОЛЫ",
  "subtitle": "2-уровневое профессиональное управление. Международная учебная программа",
  "managementLabel": "Управление",
  "managementTitle": "Как устроена наша школа",
  "operationalLevel": "Операционное управление",
  "coordinationLevel": "Общее управление / координация",
  "ceo": {
    "title": "CEO школы",
    "description": "Стратегическое руководство и развитие школы"
  },
  "management": {
    "title": "Менеджмент школы",
    "description": "Операционное управление образовательным процессом"
  },
  "board": {
    "title": "Попечительский совет",
    "description": "Надзор и стратегическое направление развития"
  },
  "pta": {
    "title": "PTA",
    "fullName": "Parent-Teacher Association",
    "description": "Связь между семьёй и школой, совместные инициативы"
  },
  "curriculumLabel": "Программа",
  "curriculumTitle": "Учебная программа по ступеням",
  "primary": {
    "title": "Начальная школа",
    "subtitle": "Фундамент образования",
    "description": "Развитие критического мышления, индивидуальности и навыков через игру и исследования",
    "tags": ["IB PYP", "Трилингвальная среда"]
  },
  "secondary": {
    "title": "Средняя и старшая школа",
    "subtitle": "Путь к академическому лидерству",
    "description": "Углублённое изучение предметов STEM, подготовка к международным экзаменам",
    "tags": ["IB MYP & DP", "Научные проекты", "Гостевые лекции"]
  },
  "extracurricular": {
    "title": "Внеучебное развитие",
    "subtitle": "Развитие практических навыков",
    "description": "Самостоятельность через проекты и дебаты, ролевые опыты",
    "tags": ["Контроль ДЗ", "Кружки и секции", "Работа с экспертами"]
  },
  "infrastructureLabel": "Инфраструктура",
  "infrastructureTitle": "Блоки школы",
  "classrooms": {
    "title": "Аудитории высшего класса",
    "description": "Современные учебные пространства с интерактивным оборудованием"
  },
  "parentHub": {
    "title": "Родительский хаб",
    "description": "Концептуальное пространство для родителей и встреч"
  },
  "stemLab": {
    "title": "Лаборатория STEM",
    "description": "Оборудованная лаборатория для технологических проектов"
  },
  "physicsLab": {
    "title": "Лаборатория физики",
    "description": "Пространство для экспериментов и научных исследований"
  },
  "ctaTitle": "Продолжите знакомство",
  "ctaPrograms": "Академическая программа",
  "ctaAbout": "О нас",
  "ctaApplication": "Подать заявку"
},
```

- [ ] **Step 3: Add `community` page content keys to `messages/ru.json`**

Add after the `structure` block:

```json
"community": {
  "heroLabel": "Сообщество",
  "title": "УЧИТЕЛЯ — ДЕТИ — РОДИТЕЛИ",
  "subtitle": "Воспитание ребёнка — это трёхсторонний процесс",
  "philosophy": "Мы строим доверительные отношения между учителями, детьми и родителями, слышим мнение каждого и укрепляем связь между школой и семьёй, понимая, что воспитание ребёнка — это трёхсторонний процесс.",
  "sidesLabel": "Сообщество",
  "sidesTitle": "Три стороны одного процесса",
  "teachers": {
    "title": "Учителя",
    "description": "Наставничество, профессионализм, индивидуальный подход к каждому ученику"
  },
  "children": {
    "title": "Дети",
    "description": "Центр образовательного процесса, развитие потенциала и самостоятельности"
  },
  "parents": {
    "title": "Родители",
    "description": "Партнёры в обучении, активная вовлечённость и постоянная обратная связь"
  },
  "teamPhotoCaption": "Наша команда — наша сила",
  "teamPhotoPlaceholder": "Фото команды",
  "ctaTitle": "Продолжите знакомство",
  "ctaApplication": "Подать заявку",
  "ctaContact": "Связаться с нами"
},
```

- [ ] **Step 4: Add `academicPrograms` page content keys to `messages/ru.json`**

Add after the `community` block:

```json
"academicPrograms": {
  "heroLabel": "Программа",
  "title": "АКАДЕМИЧЕСКАЯ ПРОГРАММА",
  "subtitle": "Междисциплинарный подход: фокус на STEM и развитие личности",
  "subjectsLabel": "Предметы",
  "subjectsTitle": "Наши предметные области",
  "science": {
    "title": "Естественные науки",
    "description": "Физика, химия и биология через исследование, эксперименты и практическую деятельность. Наука не по учебнику, а через реальные опыты и проекты. Обучение ведётся на английском языке, что позволяет одновременно осваивать предмет и развивать язык в естественной среде.",
    "tags": ["Экспериментальные модули", "Экологические проекты"]
  },
  "math": {
    "title": "Математика",
    "description": "Calculus, арифметика, алгебра, геометрия — выдающийся уровень развития логики и аналитического аппарата высшего уровня.",
    "tags": ["Аналитическое мышление", "Решение задач"]
  },
  "arts": {
    "title": "Искусство и История",
    "description": "Визуальное искусство, музыка и драма как инструменты самовыражения. История как фундамент понимания современного мира.",
    "tags": ["Визуальное искусство", "Музыка и драма"]
  },
  "languages": {
    "title": "Языковая программа",
    "description": "Трилингвальная среда — казахский, русский, английский. Изучение языков через контекст и практику в повседневной учебной деятельности.",
    "tags": ["Казахский", "Русский", "Английский"]
  },
  "structureTeaserText": "Узнайте, как устроена наша школа — от управления до инфраструктуры",
  "structureTeaserButton": "Структура школы",
  "stemLabel": "STEM",
  "stemTitle": "Междисциплинарный подход",
  "stemDescription": "Наши предметы не существуют изолированно — они связаны между собой через проекты, исследования и практическое применение знаний. Фокус на STEM позволяет ученикам видеть связи между наукой, технологиями, инженерией и математикой.",
  "ctaTitle": "Продолжите знакомство",
  "ctaApplication": "Подать заявку",
  "ctaAbout": "О нас",
  "ctaContact": "Связаться с нами"
},
```

- [ ] **Step 5: Add equivalent keys to `messages/en.json`**

Add the same structure to `messages/en.json` with English translations:

Navigation keys:
```json
"structure": "Structure",
"community": "Community",
"programs": "Programs"
```

Header descriptions:
```json
"structure": "School organization and governance",
"community": "Teachers, children, and parents",
"programs": "Academic curriculum"
```

Metadata:
```json
"structure": {
  "title": "School Structure | Scandic International School",
  "description": "Learn about the organization, governance, and infrastructure of Scandic International School"
},
"community": {
  "title": "Community | Scandic International School",
  "description": "Teachers, children, and parents — three sides of the educational process"
},
"academicPrograms": {
  "title": "Academic Program | Scandic International School",
  "description": "Interdisciplinary approach with a focus on STEM and personal development"
}
```

Page content — `structure`:
```json
"structure": {
  "heroLabel": "Structure",
  "title": "SCHOOL STRUCTURE",
  "subtitle": "Two-level professional governance. International curriculum",
  "managementLabel": "Governance",
  "managementTitle": "How our school is organized",
  "operationalLevel": "Operational Management",
  "coordinationLevel": "General Management / Coordination",
  "ceo": {
    "title": "School CEO",
    "description": "Strategic leadership and school development"
  },
  "management": {
    "title": "School Management",
    "description": "Operational management of the educational process"
  },
  "board": {
    "title": "Board of Trustees",
    "description": "Oversight and strategic direction"
  },
  "pta": {
    "title": "PTA",
    "fullName": "Parent-Teacher Association",
    "description": "Connection between family and school, joint initiatives"
  },
  "curriculumLabel": "Curriculum",
  "curriculumTitle": "Curriculum by stages",
  "primary": {
    "title": "Primary School",
    "subtitle": "Foundation of education",
    "description": "Developing critical thinking, individuality, and skills through play and inquiry",
    "tags": ["IB PYP", "Trilingual environment"]
  },
  "secondary": {
    "title": "Middle & High School",
    "subtitle": "Path to academic leadership",
    "description": "In-depth study of STEM subjects, preparation for international exams",
    "tags": ["IB MYP & DP", "Science projects", "Guest lectures"]
  },
  "extracurricular": {
    "title": "Extracurricular Development",
    "subtitle": "Developing practical skills",
    "description": "Independence through projects and debates, role-based experiences",
    "tags": ["Homework monitoring", "Clubs & activities", "Expert workshops"]
  },
  "infrastructureLabel": "Infrastructure",
  "infrastructureTitle": "School facilities",
  "classrooms": {
    "title": "Premium Classrooms",
    "description": "Modern learning spaces with interactive equipment"
  },
  "parentHub": {
    "title": "Parent Hub",
    "description": "A conceptual space for parents and meetings"
  },
  "stemLab": {
    "title": "STEM Laboratory",
    "description": "Equipped laboratory for technology projects"
  },
  "physicsLab": {
    "title": "Physics Laboratory",
    "description": "Space for experiments and scientific research"
  },
  "ctaTitle": "Continue exploring",
  "ctaPrograms": "Academic Program",
  "ctaAbout": "About Us",
  "ctaApplication": "Apply Now"
}
```

Page content — `community`:
```json
"community": {
  "heroLabel": "Community",
  "title": "TEACHERS — CHILDREN — PARENTS",
  "subtitle": "Raising a child is a three-way process",
  "philosophy": "We build trusting relationships between teachers, children, and parents, hear everyone's voice, and strengthen the bond between school and family, understanding that raising a child is a three-way process.",
  "sidesLabel": "Community",
  "sidesTitle": "Three sides of one process",
  "teachers": {
    "title": "Teachers",
    "description": "Mentorship, professionalism, individual approach to every student"
  },
  "children": {
    "title": "Children",
    "description": "At the center of education, developing potential and independence"
  },
  "parents": {
    "title": "Parents",
    "description": "Partners in learning, active involvement, and constant feedback"
  },
  "teamPhotoCaption": "Our team is our strength",
  "teamPhotoPlaceholder": "Team photo",
  "ctaTitle": "Continue exploring",
  "ctaApplication": "Apply Now",
  "ctaContact": "Contact Us"
}
```

Page content — `academicPrograms`:
```json
"academicPrograms": {
  "heroLabel": "Curriculum",
  "title": "ACADEMIC PROGRAM",
  "subtitle": "Interdisciplinary approach: focus on STEM and personal development",
  "subjectsLabel": "Subjects",
  "subjectsTitle": "Our subject areas",
  "science": {
    "title": "Natural Sciences",
    "description": "Physics, chemistry, and biology through research, experiments, and hands-on practice. Science not from a textbook, but through real experiments and projects. Taught in English, allowing students to master the subject while developing language skills naturally.",
    "tags": ["Experimental modules", "Environmental projects"]
  },
  "math": {
    "title": "Mathematics",
    "description": "Calculus, arithmetic, algebra, geometry — exceptional development of logic and advanced analytical skills.",
    "tags": ["Analytical thinking", "Problem solving"]
  },
  "arts": {
    "title": "Arts & History",
    "description": "Visual arts, music, and drama as tools for self-expression. History as the foundation for understanding the modern world.",
    "tags": ["Visual arts", "Music & drama"]
  },
  "languages": {
    "title": "Language Program",
    "description": "Trilingual environment — Kazakh, Russian, English. Language learning through context and practice in everyday academic activities.",
    "tags": ["Kazakh", "Russian", "English"]
  },
  "structureTeaserText": "Learn how our school is organized — from governance to infrastructure",
  "structureTeaserButton": "School Structure",
  "stemLabel": "STEM",
  "stemTitle": "Interdisciplinary Approach",
  "stemDescription": "Our subjects don't exist in isolation — they are connected through projects, research, and practical application of knowledge. The STEM focus allows students to see connections between science, technology, engineering, and mathematics.",
  "ctaTitle": "Continue exploring",
  "ctaApplication": "Apply Now",
  "ctaAbout": "About Us",
  "ctaContact": "Contact Us"
}
```

- [ ] **Step 6: Add equivalent keys to `messages/kk.json`**

Same structure with Kazakh translations:

Navigation keys:
```json
"structure": "Құрылым",
"community": "Қоғамдастық",
"programs": "Бағдарлама"
```

Header descriptions:
```json
"structure": "Мектептің құрылымы мен басқаруы",
"community": "Мұғалімдер, балалар және ата-аналар",
"programs": "Академиялық бағдарлама"
```

Metadata:
```json
"structure": {
  "title": "Мектеп құрылымы | Scandic International School",
  "description": "Scandic International School-дың құрылымы, басқаруы және инфрақұрылымы туралы біліңіз"
},
"community": {
  "title": "Қоғамдастық | Scandic International School",
  "description": "Мұғалімдер, балалар және ата-аналар — білім беру процесінің үш жағы"
},
"academicPrograms": {
  "title": "Академиялық бағдарлама | Scandic International School",
  "description": "STEM және тұлғаны дамытуға бағытталған пәнаралық тәсіл"
}
```

Page content — `structure`:
```json
"structure": {
  "heroLabel": "Құрылым",
  "title": "МЕКТЕП ҚҰРЫЛЫМЫ",
  "subtitle": "2 деңгейлі кәсіби басқару. Халықаралық оқу бағдарламасы",
  "managementLabel": "Басқару",
  "managementTitle": "Мектебіміз қалай құрылған",
  "operationalLevel": "Операциялық басқару",
  "coordinationLevel": "Жалпы басқару / үйлестіру",
  "ceo": {
    "title": "Мектеп CEO",
    "description": "Стратегиялық басшылық және мектепті дамыту"
  },
  "management": {
    "title": "Мектеп менеджменті",
    "description": "Білім беру процесін операциялық басқару"
  },
  "board": {
    "title": "Қамқоршылар кеңесі",
    "description": "Қадағалау және стратегиялық бағыт"
  },
  "pta": {
    "title": "PTA",
    "fullName": "Parent-Teacher Association",
    "description": "Отбасы мен мектеп арасындағы байланыс, бірлескен бастамалар"
  },
  "curriculumLabel": "Бағдарлама",
  "curriculumTitle": "Сатылар бойынша оқу бағдарламасы",
  "primary": {
    "title": "Бастауыш мектеп",
    "subtitle": "Білім негізі",
    "description": "Сыни ойлау, даралық және ойын мен зерттеу арқылы дағдыларды дамыту",
    "tags": ["IB PYP", "Үш тілді орта"]
  },
  "secondary": {
    "title": "Орта және жоғары мектеп",
    "subtitle": "Академиялық көшбасшылыққа жол",
    "description": "STEM пәндерін тереңдетіп оқыту, халықаралық емтихандарға дайындық",
    "tags": ["IB MYP & DP", "Ғылыми жобалар", "Қонақ лекциялар"]
  },
  "extracurricular": {
    "title": "Сабақтан тыс даму",
    "subtitle": "Практикалық дағдыларды дамыту",
    "description": "Жобалар мен пікірталастар арқылы дербестік, рөлдік тәжірибелер",
    "tags": ["ҮТ бақылау", "Үйірмелер", "Сарапшылармен жұмыс"]
  },
  "infrastructureLabel": "Инфрақұрылым",
  "infrastructureTitle": "Мектеп блоктары",
  "classrooms": {
    "title": "Жоғары сыныптағы аудиториялар",
    "description": "Интерактивті жабдықтармен заманауи оқу кеңістіктері"
  },
  "parentHub": {
    "title": "Ата-аналар хабы",
    "description": "Ата-аналар мен кездесулер үшін концептуалды кеңістік"
  },
  "stemLab": {
    "title": "STEM зертханасы",
    "description": "Технологиялық жобалар үшін жабдықталған зертхана"
  },
  "physicsLab": {
    "title": "Физика зертханасы",
    "description": "Тәжірибелер мен ғылыми зерттеулер үшін кеңістік"
  },
  "ctaTitle": "Танысуды жалғастырыңыз",
  "ctaPrograms": "Академиялық бағдарлама",
  "ctaAbout": "Біз туралы",
  "ctaApplication": "Өтінім беру"
}
```

Page content — `community`:
```json
"community": {
  "heroLabel": "Қоғамдастық",
  "title": "МҰҒАЛІМДЕР — БАЛАЛАР — АТА-АНАЛАР",
  "subtitle": "Баланы тәрбиелеу — үш жақты процесс",
  "philosophy": "Біз мұғалімдер, балалар және ата-аналар арасында сенімді қарым-қатынас орнатамыз, әркімнің пікірін тыңдаймыз және мектеп пен отбасы арасындағы байланысты нығайтамыз, баланы тәрбиелеу — үш жақты процесс екенін түсінеміз.",
  "sidesLabel": "Қоғамдастық",
  "sidesTitle": "Бір процестің үш жағы",
  "teachers": {
    "title": "Мұғалімдер",
    "description": "Тәлімгерлік, кәсібилік, әр оқушыға жеке көзқарас"
  },
  "children": {
    "title": "Балалар",
    "description": "Білім беру процесінің орталығы, әлеуетті дамыту және дербестік"
  },
  "parents": {
    "title": "Ата-аналар",
    "description": "Оқытудағы серіктестер, белсенді қатысу және тұрақты кері байланыс"
  },
  "teamPhotoCaption": "Біздің команда — біздің күшіміз",
  "teamPhotoPlaceholder": "Команда фотосы",
  "ctaTitle": "Танысуды жалғастырыңыз",
  "ctaApplication": "Өтінім беру",
  "ctaContact": "Бізбен байланысу"
}
```

Page content — `academicPrograms`:
```json
"academicPrograms": {
  "heroLabel": "Бағдарлама",
  "title": "АКАДЕМИЯЛЫҚ БАҒДАРЛАМА",
  "subtitle": "Пәнаралық тәсіл: STEM және тұлғаны дамытуға бағыт",
  "subjectsLabel": "Пәндер",
  "subjectsTitle": "Біздің пәндік бағыттар",
  "science": {
    "title": "Жаратылыстану ғылымдары",
    "description": "Физика, химия және биология зерттеу, тәжірибе және практикалық қызмет арқылы. Ғылым оқулық бойынша емес, нақты тәжірибелер мен жобалар арқылы. Ағылшын тілінде оқыту пәнді меңгеру мен тілді табиғи ортада дамытуға мүмкіндік береді.",
    "tags": ["Тәжірибелік модульдер", "Экологиялық жобалар"]
  },
  "math": {
    "title": "Математика",
    "description": "Calculus, арифметика, алгебра, геометрия — логика мен жоғары деңгейдегі аналитикалық аппараттың ерекше дамуы.",
    "tags": ["Аналитикалық ойлау", "Есеп шығару"]
  },
  "arts": {
    "title": "Өнер және Тарих",
    "description": "Көркем өнер, музыка және драма өзін-өзі көрсету құралдары ретінде. Тарих заманауи әлемді түсінудің негізі ретінде.",
    "tags": ["Көркем өнер", "Музыка және драма"]
  },
  "languages": {
    "title": "Тілдік бағдарлама",
    "description": "Үш тілді орта — қазақ, орыс, ағылшын. Тілдерді күнделікті оқу қызметінде контекст пен практика арқылы үйрену.",
    "tags": ["Қазақша", "Орысша", "Ағылшынша"]
  },
  "structureTeaserText": "Мектебіміздің қалай құрылғанын біліңіз — басқарудан инфрақұрылымға дейін",
  "structureTeaserButton": "Мектеп құрылымы",
  "stemLabel": "STEM",
  "stemTitle": "Пәнаралық тәсіл",
  "stemDescription": "Біздің пәндер оқшау өмір сүрмейді — олар жобалар, зерттеулер және білімді практикалық қолдану арқылы байланысқан. STEM бағыты оқушыларға ғылым, технология, инженерия және математика арасындағы байланыстарды көруге мүмкіндік береді.",
  "ctaTitle": "Танысуды жалғастырыңыз",
  "ctaApplication": "Өтінім беру",
  "ctaAbout": "Біз туралы",
  "ctaContact": "Бізбен байланысу"
}
```

- [ ] **Step 7: Verify JSON validity**

Run: `node -e "JSON.parse(require('fs').readFileSync('messages/ru.json','utf8')); console.log('ru.json OK')"` (repeat for en.json and kk.json)

Expected: All three print "OK" with no parse errors.

- [ ] **Step 8: Commit**

```bash
git add messages/ru.json messages/en.json messages/kk.json
git commit -m "feat: add translation keys for structure, community, and programs pages"
```

---

### Task 2: Add metadata cases

**Files:**
- Modify: `src/lib/metadata.ts`

- [ ] **Step 1: Add three cases to the switch statement**

In `src/lib/metadata.ts`, add before the `default` case:

```typescript
case 'structure': {
  const tr = translations as unknown as Record<string, unknown>;
  const meta = (tr.metadata as Record<string, Record<string, string>> | undefined)?.structure;
  const structureSection = tr.structure as Record<string, string> | undefined;
  return {
    title: meta?.title || structureSection?.title || "School Structure | Scandic International School",
    description: meta?.description || structureSection?.subtitle || "School structure and governance",
  };
}
case 'community': {
  const tr = translations as unknown as Record<string, unknown>;
  const meta = (tr.metadata as Record<string, Record<string, string>> | undefined)?.community;
  const communitySection = tr.community as Record<string, string> | undefined;
  return {
    title: meta?.title || communitySection?.title || "Community | Scandic International School",
    description: meta?.description || communitySection?.subtitle || "Teachers, children, and parents",
  };
}
case 'programs': {
  const tr = translations as unknown as Record<string, unknown>;
  const meta = (tr.metadata as Record<string, Record<string, string>> | undefined)?.academicPrograms;
  const programsSection = tr.academicPrograms as Record<string, string> | undefined;
  return {
    title: meta?.title || programsSection?.title || "Academic Program | Scandic International School",
    description: meta?.description || programsSection?.subtitle || "Interdisciplinary academic program",
  };
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit src/lib/metadata.ts` or `npx next build --no-lint 2>&1 | head -20`

Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/metadata.ts
git commit -m "feat: add metadata cases for structure, community, and programs pages"
```

---

### Task 3: Create Structure page component

**Files:**
- Create: `src/components/structure-page-content.tsx`
- Create: `src/app/structure/page.tsx`

- [ ] **Step 1: Create the structure page content component**

Create `src/components/structure-page-content.tsx`:

```tsx
import Link from 'next/link';
import { getLocale, getTranslations } from '@/lib/server-locale';
import { ArrowRight, Crown, Briefcase, Shield, Users, School, Coffee, FlaskConical, Microscope } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ParticleBackground } from '@/components/particle-background';

export async function StructurePageContent() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);
  const t = (translations as unknown as Record<string, Record<string, unknown>>).structure;
  const nav = translations.navigation as unknown as Record<string, string>;

  const managementCards = [
    {
      icon: Crown,
      title: (t.ceo as Record<string, string>).title,
      description: (t.ceo as Record<string, string>).description,
    },
    {
      icon: Briefcase,
      title: (t.management as Record<string, string>).title,
      description: (t.management as Record<string, string>).description,
    },
    {
      icon: Shield,
      title: (t.board as Record<string, string>).title,
      description: (t.board as Record<string, string>).description,
    },
  ];

  const curriculumCards = [
    {
      data: t.primary as Record<string, unknown>,
      accentColor: 'bg-primary',
      accentBorder: 'border-t-primary',
    },
    {
      data: t.secondary as Record<string, unknown>,
      accentColor: 'bg-secondary',
      accentBorder: 'border-t-secondary',
    },
    {
      data: t.extracurricular as Record<string, unknown>,
      accentColor: 'bg-accent',
      accentBorder: 'border-t-accent',
    },
  ];

  const infrastructureCards = [
    { icon: School, ...(t.classrooms as Record<string, string>) },
    { icon: Coffee, ...(t.parentHub as Record<string, string>) },
    { icon: FlaskConical, ...(t.stemLab as Record<string, string>) },
    { icon: Microscope, ...(t.physicsLab as Record<string, string>) },
  ];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[55vh] md:min-h-[70vh] flex items-end overflow-hidden bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />

        <div className="absolute top-20 right-[15%] w-24 h-24 bg-primary/15 rounded-full blur-xl animate-float" />
        <div className="absolute top-[40%] left-[10%] w-16 h-16 bg-primary/20 rounded-full blur-lg animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-[30%] right-[8%] w-12 h-12 bg-accent/15 rounded-full blur-lg animate-float" style={{ animationDelay: '2.5s' }} />

        <div className="container mx-auto px-4 md:px-8 pb-12 md:pb-20 relative z-10">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-primary rounded-full" />
              <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
                {t.heroLabel as string}
              </span>
            </span>
            <h1 className="text-[2.5rem] md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-4">
              {t.title as string}
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
              {t.subtitle as string}
            </p>
          </ScrollReveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </section>

      {/* ===== MANAGEMENT ===== */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--secondary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--secondary)) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14 md:mb-20">
              <span className="inline-flex items-center gap-2 text-secondary text-sm font-semibold uppercase tracking-widest mb-4">
                <span className="w-8 h-[2px] bg-primary rounded-full" />
                {t.managementLabel as string}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent mb-5">
                {t.managementTitle as string}
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto">
            {/* Operational level label */}
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-secondary/20" />
                <span className="text-xs font-semibold text-secondary/60 uppercase tracking-widest">
                  {t.operationalLevel as string}
                </span>
                <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-secondary/20" />
              </div>
            </ScrollReveal>

            {/* Three management cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-8">
              {managementCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <ScrollReveal key={index} delay={0.1 + index * 0.08}>
                    <div className="group relative p-6 md:p-7 rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm hover:border-secondary/30 hover:shadow-lg hover:shadow-secondary/8 hover:-translate-y-0.5 transition-all duration-300 text-center">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-secondary group-hover:to-secondary-800 group-hover:border-secondary group-hover:shadow-md group-hover:shadow-secondary/20 transition-all duration-300">
                        <Icon className="h-6 w-6 text-secondary group-hover:text-primary transition-colors duration-300" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-secondary transition-colors duration-300 mb-2">
                        {card.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Connector line */}
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-primary/30" />
                <span className="text-xs font-semibold text-secondary/60 uppercase tracking-widest">
                  {t.coordinationLevel as string}
                </span>
                <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-primary/30" />
              </div>
            </ScrollReveal>

            {/* PTA card */}
            <ScrollReveal delay={0.2}>
              <div className="max-w-lg mx-auto group relative p-6 md:p-8 rounded-2xl border border-primary/20 bg-primary/[0.03] hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 transition-all duration-300 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/15 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-600 group-hover:border-primary group-hover:shadow-md group-hover:shadow-primary/30 transition-all duration-300">
                  <Users className="h-6 w-6 text-secondary group-hover:text-secondary transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-secondary transition-colors duration-300 mb-1">
                  {(t.pta as Record<string, string>).title}
                </h3>
                <p className="text-xs text-secondary/50 font-medium mb-2">
                  {(t.pta as Record<string, string>).fullName}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {(t.pta as Record<string, string>).description}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== CURRICULUM ===== */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-white via-gray-50/50 to-secondary/[0.02]">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-14 md:mb-20">
              <span className="inline-flex items-center gap-2 text-secondary text-sm font-semibold uppercase tracking-widest mb-4">
                <span className="w-8 h-[2px] bg-primary rounded-full" />
                {t.curriculumLabel as string}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent mb-5">
                {t.curriculumTitle as string}
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {curriculumCards.map((card, index) => (
              <ScrollReveal key={index} delay={0.1 + index * 0.1}>
                <div className={`group relative rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-1 transition-all duration-300 border-t-4 ${card.accentBorder}`}>
                  <div className="p-7">
                    <h3 className="text-xl font-bold text-secondary mb-1">
                      {(card.data as Record<string, string>).title}
                    </h3>
                    <p className="text-primary text-sm font-semibold mb-3">
                      {(card.data as Record<string, string>).subtitle}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">
                      {(card.data as Record<string, string>).description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {((card.data as Record<string, unknown>).tags as string[]).map((tag, i) => (
                        <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-secondary/[0.06] text-secondary/80">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INFRASTRUCTURE ===== */}
      <section className="relative py-20 md:py-28 bg-secondary overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="absolute top-20 right-[20%] w-32 h-32 bg-primary/[0.06] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-[15%] w-40 h-40 bg-primary/[0.04] rounded-full blur-3xl" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14 md:mb-20">
              <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-widest mb-4">
                <span className="w-8 h-[2px] bg-primary rounded-full" />
                {t.infrastructureLabel as string}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
                {t.infrastructureTitle as string}
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {infrastructureCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={index} delay={0.1 + index * 0.08}>
                  <div className="relative bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 text-center hover:bg-white/[0.1] hover:border-primary/30 transition-all duration-300 group">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-white font-bold mb-2">{card.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{card.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SUB-NAVIGATION STRIP ===== */}
      <section className="border-y border-gray-200 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-5 md:gap-6 py-4 overflow-x-auto">
            <span className="text-secondary font-bold italic text-lg flex-shrink-0">
              {t.heroLabel as string}
            </span>
            <div className="w-px h-5 bg-gray-300 flex-shrink-0" />
            <Link href="/about" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">
              {nav.about}
            </Link>
            <Link href="/programs" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">
              {nav.programs ?? 'Programs'}
            </Link>
            <Link href="/staff" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">
              {nav.staff}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-white py-16 md:py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/[0.06] rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary italic mb-8">
                {t.ctaTitle as string}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/programs"
                  className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  <span className="text-secondary font-semibold text-[15px]">{t.ctaPrograms as string}</span>
                  <ArrowRight className="h-4 w-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
                <Link
                  href="/about"
                  className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  <span className="text-secondary font-semibold text-[15px]">{t.ctaAbout as string}</span>
                  <ArrowRight className="h-4 w-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
                <Link
                  href="/application"
                  className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  <span className="text-secondary font-semibold text-[15px]">{t.ctaApplication as string}</span>
                  <ArrowRight className="h-4 w-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Create the route page file**

Create `src/app/structure/page.tsx`:

```tsx
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StructurePageContent } from "@/components/structure-page-content";
import { getLocale } from '@/lib/server-locale';
import { generateMetadata as genMeta } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return genMeta(locale, 'structure');
}

export default function StructurePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <StructurePageContent />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 3: Verify the page renders**

Run: `npm run dev` (if not already running)
Navigate to `http://localhost:3000/structure`

Expected: Page renders with hero, management cards, curriculum cards, infrastructure section, sub-nav, and CTA. No console errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/structure/page.tsx src/components/structure-page-content.tsx
git commit -m "feat: add Structure page with management, curriculum, and infrastructure sections"
```

---

### Task 4: Create Community page component

**Files:**
- Create: `src/components/community-page-content.tsx`
- Create: `src/app/community/page.tsx`

- [ ] **Step 1: Create the community page content component**

Create `src/components/community-page-content.tsx`:

```tsx
import Link from 'next/link';
import Image from 'next/image';
import { getLocale, getTranslations } from '@/lib/server-locale';
import { ArrowRight, GraduationCap, Heart, Home, Camera } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ParticleBackground } from '@/components/particle-background';

export async function CommunityPageContent() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);
  const t = (translations as unknown as Record<string, Record<string, unknown>>).community;
  const nav = translations.navigation as unknown as Record<string, string>;

  const sides = [
    {
      icon: GraduationCap,
      data: t.teachers as Record<string, string>,
      accentColor: 'border-t-secondary',
    },
    {
      icon: Heart,
      data: t.children as Record<string, string>,
      accentColor: 'border-t-primary',
    },
    {
      icon: Home,
      data: t.parents as Record<string, string>,
      accentColor: 'border-t-accent',
    },
  ];

  // Check if the team photo file exists (placeholder if not)
  let hasTeamPhoto = false;
  try {
    const fs = await import('fs');
    hasTeamPhoto = fs.existsSync(process.cwd() + '/public/images/team-photo.jpg');
  } catch {
    hasTeamPhoto = false;
  }

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[55vh] md:min-h-[70vh] flex items-end overflow-hidden bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />

        <div className="absolute top-20 right-[15%] w-24 h-24 bg-primary/15 rounded-full blur-xl animate-float" />
        <div className="absolute top-[40%] left-[10%] w-16 h-16 bg-primary/20 rounded-full blur-lg animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-[30%] right-[8%] w-12 h-12 bg-accent/15 rounded-full blur-lg animate-float" style={{ animationDelay: '2.5s' }} />

        <div className="container mx-auto px-4 md:px-8 pb-12 md:pb-20 relative z-10">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-primary rounded-full" />
              <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
                {t.heroLabel as string}
              </span>
            </span>
            <h1 className="text-[2.5rem] md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-4">
              {t.title as string}
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
              {t.subtitle as string}
            </p>
          </ScrollReveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </section>

      {/* ===== PHILOSOPHY QUOTE ===== */}
      <section className="relative bg-primary py-16 md:py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(45deg, hsl(var(--secondary)) 25%, transparent 25%, transparent 75%, hsl(var(--secondary)) 75%), linear-gradient(45deg, hsl(var(--secondary)) 25%, transparent 25%, transparent 75%, hsl(var(--secondary)) 75%)',
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 15px 15px',
          }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <svg
                className="w-12 h-12 md:w-16 md:h-16 text-secondary/20 mx-auto mb-6"
                viewBox="0 0 100 100"
                fill="currentColor"
              >
                <path d="M20 65c0-16.6 13.4-30 30-30V20C27.9 20 10 37.9 10 60v30h40V60H20v5zm50 0c0-16.6 13.4-30 30-30V20C77.9 20 60 37.9 60 60v30h40V60H70v5z" />
              </svg>
              <blockquote className="text-secondary text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed italic">
                {t.philosophy as string}
              </blockquote>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== THREE SIDES ===== */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-white via-gray-50/50 to-secondary/[0.02]">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-14 md:mb-20">
              <span className="inline-flex items-center gap-2 text-secondary text-sm font-semibold uppercase tracking-widest mb-4">
                <span className="w-8 h-[2px] bg-primary rounded-full" />
                {t.sidesLabel as string}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent mb-5">
                {t.sidesTitle as string}
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {sides.map((side, index) => {
              const Icon = side.icon;
              return (
                <ScrollReveal key={index} delay={0.1 + index * 0.1}>
                  <div className={`group text-center p-8 rounded-2xl border border-gray-100 bg-white overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 border-t-4 ${side.accentColor}`}>
                    <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-600 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                      <Icon className="h-7 w-7 text-secondary group-hover:text-secondary transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-secondary mb-3">
                      {side.data.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {side.data.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TEAM PHOTO ===== */}
      <section className="relative overflow-hidden">
        {hasTeamPhoto ? (
          <div className="relative aspect-[21/9] md:aspect-[21/9] max-h-[500px]">
            <Image
              src="/images/team-photo.jpg"
              alt={t.teamPhotoCaption as string}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <p className="text-white text-2xl md:text-3xl font-bold">
                {t.teamPhotoCaption as string}
              </p>
            </div>
          </div>
        ) : (
          <div className="relative aspect-[21/9] md:aspect-[21/7] max-h-[400px] bg-secondary/[0.06] flex flex-col items-center justify-center gap-4">
            <Camera className="h-12 w-12 text-secondary/20" />
            <p className="text-secondary/30 text-lg font-medium">
              {t.teamPhotoPlaceholder as string}
            </p>
          </div>
        )}
      </section>

      {/* ===== SUB-NAVIGATION STRIP ===== */}
      <section className="border-y border-gray-200 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-5 md:gap-6 py-4 overflow-x-auto">
            <span className="text-secondary font-bold italic text-lg flex-shrink-0">
              {t.heroLabel as string}
            </span>
            <div className="w-px h-5 bg-gray-300 flex-shrink-0" />
            <Link href="/about" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">
              {nav.about}
            </Link>
            <Link href="/staff" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">
              {nav.staff}
            </Link>
            <Link href="/structure" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">
              {nav.structure ?? 'Structure'}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-white py-16 md:py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/[0.06] rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary italic mb-8">
                {t.ctaTitle as string}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                <Link
                  href="/application"
                  className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  <span className="text-secondary font-semibold text-[15px]">{t.ctaApplication as string}</span>
                  <ArrowRight className="h-4 w-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
                <Link
                  href="/contact"
                  className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  <span className="text-secondary font-semibold text-[15px]">{t.ctaContact as string}</span>
                  <ArrowRight className="h-4 w-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Create the route page file**

Create `src/app/community/page.tsx`:

```tsx
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CommunityPageContent } from "@/components/community-page-content";
import { getLocale } from '@/lib/server-locale';
import { generateMetadata as genMeta } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return genMeta(locale, 'community');
}

export default function CommunityPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <CommunityPageContent />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 3: Verify the page renders**

Navigate to `http://localhost:3000/community`

Expected: Page renders with hero, philosophy quote band, three side cards, photo placeholder, sub-nav, and CTA.

- [ ] **Step 4: Commit**

```bash
git add src/app/community/page.tsx src/components/community-page-content.tsx
git commit -m "feat: add Community page with philosophy, three sides, and team photo sections"
```

---

### Task 5: Create Programs page component

**Files:**
- Create: `src/components/programs-page-content.tsx`
- Create: `src/app/programs/page.tsx`

- [ ] **Step 1: Create the programs page content component**

Create `src/components/programs-page-content.tsx`:

```tsx
import Link from 'next/link';
import { getLocale, getTranslations } from '@/lib/server-locale';
import { ArrowRight, FlaskConical, Sigma, Palette, Languages, Building2 } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ParticleBackground } from '@/components/particle-background';

export async function ProgramsPageContent() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);
  const t = (translations as unknown as Record<string, Record<string, unknown>>).academicPrograms;
  const nav = translations.navigation as unknown as Record<string, string>;

  const subjects = [
    {
      icon: FlaskConical,
      data: t.science as Record<string, unknown>,
      accentBg: 'from-emerald-600 to-emerald-800',
      accentBorder: 'border-emerald-200',
      accentHover: 'hover:border-emerald-400',
      accent: 'bg-emerald-600',
    },
    {
      icon: Sigma,
      data: t.math as Record<string, unknown>,
      accentBg: 'from-amber-700 to-amber-900',
      accentBorder: 'border-amber-200',
      accentHover: 'hover:border-amber-400',
      accent: 'bg-amber-700',
    },
    {
      icon: Palette,
      data: t.arts as Record<string, unknown>,
      accentBg: 'from-teal-600 to-teal-800',
      accentBorder: 'border-teal-200',
      accentHover: 'hover:border-teal-400',
      accent: 'bg-teal-600',
    },
    {
      icon: Languages,
      data: t.languages as Record<string, unknown>,
      accentBg: 'from-primary to-primary-600',
      accentBorder: 'border-primary/30',
      accentHover: 'hover:border-primary/60',
      accent: 'bg-primary',
    },
  ];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[55vh] md:min-h-[70vh] flex items-end overflow-hidden bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />

        <div className="absolute top-20 right-[15%] w-24 h-24 bg-primary/15 rounded-full blur-xl animate-float" />
        <div className="absolute top-[40%] left-[10%] w-16 h-16 bg-primary/20 rounded-full blur-lg animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-[30%] right-[8%] w-12 h-12 bg-accent/15 rounded-full blur-lg animate-float" style={{ animationDelay: '2.5s' }} />

        <div className="container mx-auto px-4 md:px-8 pb-12 md:pb-20 relative z-10">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-primary rounded-full" />
              <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
                {t.heroLabel as string}
              </span>
            </span>
            <h1 className="text-[2.5rem] md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-4">
              {t.title as string}
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
              {t.subtitle as string}
            </p>
          </ScrollReveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </section>

      {/* ===== SUBJECTS ===== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-14 md:mb-20">
              <span className="inline-flex items-center gap-2 text-secondary text-sm font-semibold uppercase tracking-widest mb-4">
                <span className="w-8 h-[2px] bg-primary rounded-full" />
                {t.subjectsLabel as string}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent">
                {t.subjectsTitle as string}
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
            {subjects.map((subject, index) => {
              const Icon = subject.icon;
              const isReversed = index % 2 !== 0;

              return (
                <ScrollReveal
                  key={index}
                  direction={isReversed ? 'right' : 'left'}
                  delay={0.1}
                >
                  <div className={`group relative grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden border ${subject.accentBorder} ${subject.accentHover} bg-white hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300`}>
                    {/* Icon/accent side */}
                    <div className={`lg:col-span-2 relative bg-gradient-to-br ${subject.accentBg} p-8 md:p-12 flex items-center justify-center min-h-[200px] ${isReversed ? 'lg:order-2' : ''}`}>
                      <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full" />
                      <div className="absolute bottom-6 left-6 w-12 h-12 bg-white/[0.07] rounded-full" />
                      <Icon className="h-16 w-16 md:h-20 md:w-20 text-white/90 relative z-10" />
                    </div>

                    {/* Content side */}
                    <div className={`lg:col-span-3 p-8 md:p-10 lg:p-12 flex flex-col justify-center ${isReversed ? 'lg:order-1' : ''}`}>
                      <div className={`w-10 h-1 ${subject.accent} rounded-full mb-5 opacity-60`} />
                      <h3 className="text-xl md:text-2xl font-bold text-secondary mb-3">
                        {subject.data.title as string}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6 text-[15px]">
                        {subject.data.description as string}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(subject.data.tags as string[]).map((tag, i) => (
                          <span key={i} className="text-xs font-medium px-3 py-1.5 rounded-full bg-secondary/[0.06] text-secondary/80">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== STRUCTURE TEASER ===== */}
      <section className="relative bg-primary py-16 md:py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(45deg, hsl(var(--secondary)) 25%, transparent 25%, transparent 75%, hsl(var(--secondary)) 75%), linear-gradient(45deg, hsl(var(--secondary)) 25%, transparent 25%, transparent 75%, hsl(var(--secondary)) 75%)',
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 15px 15px',
          }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <Building2 className="h-10 w-10 text-secondary/30 mx-auto mb-5" />
              <p className="text-secondary text-xl md:text-2xl font-bold leading-relaxed mb-8">
                {t.structureTeaserText as string}
              </p>
              <Link
                href="/structure"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-800 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {t.structureTeaserButton as string}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== STEM FOCUS ===== */}
      <section className="relative py-20 md:py-28 bg-secondary overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="absolute top-20 right-[20%] w-32 h-32 bg-primary/[0.06] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-[15%] w-40 h-40 bg-primary/[0.04] rounded-full blur-3xl" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-primary rounded-full" />
                <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
                  {t.stemLabel as string}
                </span>
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                {t.stemTitle as string}
              </h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                {t.stemDescription as string}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== SUB-NAVIGATION STRIP ===== */}
      <section className="border-y border-gray-200 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-5 md:gap-6 py-4 overflow-x-auto">
            <span className="text-secondary font-bold italic text-lg flex-shrink-0">
              {t.heroLabel as string}
            </span>
            <div className="w-px h-5 bg-gray-300 flex-shrink-0" />
            <Link href="/about" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">
              {nav.about}
            </Link>
            <Link href="/structure" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">
              {nav.structure ?? 'Structure'}
            </Link>
            <Link href="/staff" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">
              {nav.staff}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-white py-16 md:py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/[0.06] rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary italic mb-8">
                {t.ctaTitle as string}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/application"
                  className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  <span className="text-secondary font-semibold text-[15px]">{t.ctaApplication as string}</span>
                  <ArrowRight className="h-4 w-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
                <Link
                  href="/about"
                  className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  <span className="text-secondary font-semibold text-[15px]">{t.ctaAbout as string}</span>
                  <ArrowRight className="h-4 w-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
                <Link
                  href="/contact"
                  className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  <span className="text-secondary font-semibold text-[15px]">{t.ctaContact as string}</span>
                  <ArrowRight className="h-4 w-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Create the route page file**

Create `src/app/programs/page.tsx`:

```tsx
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProgramsPageContent } from "@/components/programs-page-content";
import { getLocale } from '@/lib/server-locale';
import { generateMetadata as genMeta } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return genMeta(locale, 'programs');
}

export default function ProgramsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ProgramsPageContent />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 3: Verify the page renders**

Navigate to `http://localhost:3000/programs`

Expected: Page renders with hero, alternating subject cards, structure teaser, STEM section, sub-nav, and CTA.

- [ ] **Step 4: Commit**

```bash
git add src/app/programs/page.tsx src/components/programs-page-content.tsx
git commit -m "feat: add Programs page with subject areas, STEM focus, and structure teaser"
```

---

### Task 6: Update navigation and existing pages

**Files:**
- Modify: `src/components/client-header.tsx`
- Modify: `src/components/footer.tsx`
- Modify: `src/components/about-page-content.tsx`

- [ ] **Step 1: Update header navigation**

In `src/components/client-header.tsx`:

Add to imports:
```tsx
import { Building2, HeartHandshake, BookOpen } from "lucide-react";
```

Add three items to `aboutNavigation` array (after the `staff` entry):
```tsx
{
  name: translations.navigation.structure ?? "Структура",
  href: "/structure",
  icon: Building2,
  description: translations.header.descriptions.structure ?? ""
},
{
  name: translations.navigation.community ?? "Сообщество",
  href: "/community",
  icon: HeartHandshake,
  description: translations.header.descriptions.community ?? ""
},
{
  name: translations.navigation.programs ?? "Программа",
  href: "/programs",
  icon: BookOpen,
  description: translations.header.descriptions.programs ?? ""
},
```

Update the `ClientHeaderProps` interface — add to `navigation`:
```tsx
structure?: string;
community?: string;
programs?: string;
```

Add to `header.descriptions`:
```tsx
structure?: string;
community?: string;
programs?: string;
```

- [ ] **Step 2: Update footer quick links**

In `src/components/footer.tsx`, add links to the Quick Links `<ul>` (after the `/contact` link):

```tsx
<li>
  <Link href="/programs" className="text-sm text-gray-300 hover:text-white transition-colors">
    {(translations as unknown as Record<string, Record<string, string>>).navigation?.programs ?? 'Programs'}
  </Link>
</li>
<li>
  <Link href="/structure" className="text-sm text-gray-300 hover:text-white transition-colors">
    {(translations as unknown as Record<string, Record<string, string>>).navigation?.structure ?? 'Structure'}
  </Link>
</li>
```

- [ ] **Step 3: Add structure teaser to About page**

In `src/components/about-page-content.tsx`, add a teaser section before the `{/* ===== SUB-NAVIGATION STRIP ===== */}` comment:

```tsx
{/* ===== STRUCTURE TEASER ===== */}
<section className="py-14 md:py-20 bg-gradient-to-br from-white via-gray-50/50 to-secondary/[0.02]">
  <div className="container mx-auto px-4 md:px-8">
    <ScrollReveal>
      <div className="max-w-2xl mx-auto text-center">
        <Building2 className="h-8 w-8 text-secondary/40 mx-auto mb-4" />
        <h3 className="text-xl md:text-2xl font-bold text-secondary mb-3">
          {locale === 'kk' ? 'Мектеп құрылымы' : locale === 'en' ? 'School Structure' : 'Структура школы'}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          {locale === 'kk' ? 'Мектебіміздің қалай құрылғанын біліңіз — басқарудан инфрақұрылымға дейін' : locale === 'en' ? 'Learn how our school is organized — from governance to infrastructure' : 'Узнайте, как устроена наша школа — от управления до инфраструктуры'}
        </p>
        <Link
          href="/structure"
          className="inline-flex items-center gap-2 text-secondary hover:text-primary text-sm font-semibold transition-colors group"
        >
          {locale === 'kk' ? 'Толығырақ' : locale === 'en' ? 'Learn more' : 'Подробнее'}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </ScrollReveal>
  </div>
</section>
```

Also add `Building2` to the imports at the top of the file (it's already imported, just verify).

- [ ] **Step 4: Verify all changes**

- Navigate to `http://localhost:3000` and check the header dropdown "О нас" — should show 6 items
- Check footer — should show Programs and Structure links
- Navigate to `/about` — should show structure teaser section before sub-nav

Expected: All links work, no console errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/client-header.tsx src/components/footer.tsx src/components/about-page-content.tsx
git commit -m "feat: update navigation with structure, community, and programs links"
```

---

### Task 7: Final verification

- [ ] **Step 1: Test all three new pages in all locales**

Switch locale to English (via cookie/UI), verify `/structure`, `/community`, `/programs` render with English text.
Switch to Kazakh, verify all three pages render with Kazakh text.
Switch back to Russian, verify everything is correct.

- [ ] **Step 2: Test navigation flow**

- Home → Header "О нас" dropdown → click each new page link
- Each new page → sub-nav links work correctly
- Each new page → CTA links work correctly
- Footer links to new pages work

- [ ] **Step 3: Test responsive layout**

Resize browser to mobile width (375px). Verify:
- Hero text doesn't overflow
- Cards stack vertically
- Sub-nav scrolls horizontally
- CTA cards stack vertically

- [ ] **Step 4: Final commit if any fixes needed**

If any fixes were needed during verification, commit them:
```bash
git add -A
git commit -m "fix: polish new pages after verification"
```
