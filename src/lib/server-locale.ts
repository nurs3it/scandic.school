import { cookies } from 'next/headers';

export type Locale = 'en' | 'ru' | 'kk';

export const locales: Locale[] = ['en', 'ru', 'kk'];
export const defaultLocale: Locale = 'ru';

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value as Locale;
  
  if (locale && locales.includes(locale)) {
    return locale;
  }
  
  return defaultLocale;
}

export function getTranslations(locale: Locale) {
  const translations = {
    en: {
      navigation: {
        home: "Home",
        about: "About Us",
        contact: "Contact",
        application: "Application",
        staff: "Staff",
        testimonials: "Testimonials",
        documents: "Documents",
        school: "School",
        contactSection: "Contact"
      },
      header: {
        schoolName: "Scandic School",
        phone: "8 706 610 57 81",
        applyButton: "Apply Now",
        descriptions: {
          staff: "Our team of educators",
          testimonials: "Parent testimonials",
          documents: "Policies and documents"
        }
      },
      hero: {
        welcome: "Welcome to",
        schoolName: "Scandic International School",
        description: "We nurture harmonious personalities committed to building a better world based on moral values.",
        stats: {
          students: "Students",
          nationalities: "Nationalities",
          ratio: "Teacher/Student Ratio",
          program: "Program"
        },
        cta: {
          apply: "Apply Now",
          learnMore: "Learn More"
        },
        features: {
          ibProgram: "IB PYP Program",
          internationalProgram: "International Primary School Program",
          grades: "Grades 0-4",
          multinational: "Multinational Environment",
          standards: "International Standards"
        },
        floating: {
          enrollment: "2025-2026",
          enrollmentOpen: "Enrollment Open",
          license: "License",
          licenseNumber: "KZ96LAA00035527"
        }
      },
      features: {
        title: "Why Choose Scandic International School?",
        subtitle: "We create an environment where every child can reach their full potential",
        items: {
          respect: {
            title: "Respect",
            description: "We foster respect for oneself, others, and the world around us"
          },
          excellence: {
            title: "Excellence",
            description: "We strive to provide the highest level of education"
          },
          community: {
            title: "Community",
            description: "We create an atmosphere of care and mutual understanding"
          },
          knowledge: {
            title: "Knowledge and Skills",
            description: "We develop creativity and self-confidence"
          },
          international: {
            title: "Internationalism",
            description: "Preparation for life in a global world"
          },
          safety: {
            title: "Safety",
            description: "We ensure a safe educational environment"
          }
        }
      },
      programs: {
        title: "Our Programs",
        subtitle: "Comprehensive education for children aged 5-10",
        earlyYears: {
          title: "Early Years (5-6 years)",
          description: "Holistic development for our youngest learners."
        },
        primary: {
          title: "Primary School (6-10 years)",
          description: "Engaging curriculum for foundational learning."
        },
        ibpyp: {
          title: "IB PYP Programme",
          description: "Inquiry-based learning for global citizens."
        },
        english: {
          title: "English Language",
          description: "Developing strong English communication skills."
        }
      },
      mission: {
        title: "SIS Mission",
        description: "We nurture harmonious personalities, committed to the idea of building a better world based on moral values."
      },
      stats: {
        title: "By the Numbers",
        subtitle: "Our impact in numbers",
        students: "Students",
        nationalities: "Nationalities",
        teachers: "Teachers",
        years: "Years of Excellence"
      },
      cta: {
        title: "Ready to Join Our Community?",
        subtitle: "Take the first step towards your child's bright future",
        apply: "Apply Now",
        learnMore: "Learn More",
        contact: "Contact Us"
      },
      footer: {
        description: "Scandic International School - providing world-class education in Uralsk",
        quickLinks: "Quick Links",
        contact: "Contact Info",
        address: "Uralsk, Kazakhstan",
        phone: "Phone",
        email: "Email",
        license: "License: KZ96LAA00035527",
        rights: "All rights reserved",
        followUs: "Follow us on Instagram",
        instagramHandle: "@scandic.school"
      },
      instagram: {
        title: "Follow us on Instagram",
        description: "Stay updated with all school events, follow student achievements and news",
        handle: "@scandic.school",
        loading: "Loading post...",
        subscribe: "Subscribe",
        contactUs: "Contact Us"
      },
      contact: {
        title: "Contact Us",
        subtitle: "We're here to answer any questions you may have",
        form: {
          name: "Name",
          email: "Email",
          phone: "Phone",
          message: "Message",
          submit: "Send Message",
          placeholders: {
            name: "Enter your name",
            email: "your@email.com",
            phone: "+7 (___) ___-__-__",
            message: "Tell us about your questions or wishes..."
          },
          messages: {
            sending: "Sending...",
            error: "An error occurred while sending the message. Please try again.",
            success: "Message sent successfully! We'll contact you soon."
          }
        },
        info: {
          address: "Address",
          phone: "Phone",
          email: "Email",
          hours: "Working Hours"
        },
        details: {
          address: "Kairat Zhumagaliyev St 18, 3rd floor",
          city: "Uralsk, Kazakhstan",
          phoneNumber: "8 706 610 57 81",
          phoneHours: "Mon-Fri: 8:30 AM - 4:30 PM",
          emailAddress: "info@scandic.school",
          emailResponse: "We'll respond within 24 hours",
          workingHours: "Mon-Fri: 8:30 AM - 4:30 PM",
          saturdayHours: ""
        }
      },
      application: {
        title: "Application Form",
        subtitle: "Apply for admission to Scandic International School",
        sections: {
          parentInfo: "Parent Information",
          childInfo: "Child Information"
        },
        fields: {
          parentName: "Parent's Full Name (Legal Representative) *",
          parentPhone: "Contact Phone Number *",
          childName: "Child's Full Name *",
          childBirthDate: "Child's Date of Birth *",
          grade: "Grade Applying For *",
          language: "Language of Instruction *",
          englishLevel: "Child's English Level *",
          preferredTime: "Preferred Interview Time *"
        },
        placeholders: {
          parentName: "Enter full name",
          parentPhone: "+1 (___) ___-____",
          childName: "Enter child's full name",
          grade: "Select grade",
          language: "Select language",
          englishLevel: "Select level",
          preferredTime: "Specify desired date and time"
        },
        options: {
          grades: [
            { value: "0", label: "Grade 0" },
            { value: "1", label: "Grade 1" },
            { value: "2", label: "Grade 2" },
            { value: "3", label: "Grade 3" },
            { value: "4", label: "Grade 4" }
          ],
          languages: [
            { value: "kazakh", label: "Kazakh" },
            { value: "russian", label: "Russian" }
          ],
          englishLevels: [
            { value: "beginner", label: "Beginner" },
            { value: "intermediate", label: "Intermediate (Pre-Intermediate and above)" },
            { value: "unknown", label: "Don't know" }
          ]
        },
        messages: {
          submitting: "Submitting application...",
          submit: "Submit Application",
          error: "An error occurred while submitting the application. Please try again.",
          success: "We will contact you to confirm the interview within 24 hours.",
          license: "License: KZ96LAA00035527 | Grades 0-4 | IB PYP"
        }
      },
      staff: {
        title: "Our Team",
        subtitle: "Professional educators dedicated to education",
        cta: "Want to join our team?",
        applyButton: "Send Resume",
        education: "Education:",
        experience: "Experience:",
        languages: "Languages:",
        parentOf: "Parent of"
      },
      testimonials: {
        title: "Parent Testimonials",
        subtitle: "What parents say about us",
        ctaTitle: "Want to share your experience?",
        ctaSubtitle: "We would love to hear your opinion about our school",
        shareButton: "Share Testimonial",
        parentOf: "Parent of"
      },
      documentsPage: {
        title: "School Documents",
        subtitle: "Official documents, policies, guidelines, and schedules of Scandic International School",
        sectionTitle: "Document Categories",
        sectionSubtitle: "Find the documents you need in the appropriate categories",
        download: "Download",
        noDocuments: "No documents found",
        contactTitle: "Need help with documents?",
        contactSubtitle: "If you can't find the document you need or have questions, contact us",
        contactButton: "Contact Us",
        requestButton: "Request Document"
      }
    },
    ru: {
      navigation: {
        home: "Главная",
        about: "О нас",
        contact: "Контакты",
        application: "Заявка",
        staff: "Сотрудники",
        testimonials: "Отзывы",
        documents: "Документы",
        school: "Школа",
        contactSection: "Связь"
      },
      header: {
        schoolName: "Scandic School",
        phone: "8 706 610 57 81",
        applyButton: "Подать заявку",
        descriptions: {
          staff: "Наша команда педагогов",
          testimonials: "Отзывы родителей",
          documents: "Политики и документы"
        }
      },
      hero: {
        welcome: "Добро пожаловать в",
        schoolName: "Scandic International School",
        description: "Мы воспитываем гармоничную личность, преданную идее построения лучшего мира на основе нравственных ценностей.",
        stats: {
          students: "Учеников",
          nationalities: "Национальностей",
          ratio: "Соотношение учитель/ученик",
          program: "Программа"
        },
        cta: {
          apply: "Подать заявку",
          learnMore: "Узнать больше"
        },
        features: {
          ibProgram: "IB PYP Программа",
          internationalProgram: "Международная программа начальной школы",
          grades: "0-4 классы",
          multinational: "Многонациональная среда",
          standards: "Международные стандарты"
        },
        floating: {
          enrollment: "2025-2026",
          enrollmentOpen: "Набор открыт",
          license: "Лицензия",
          licenseNumber: "KZ96LAA00035527"
        }
      },
      features: {
        title: "Почему выбирают Scandic International School?",
        subtitle: "Мы создаем среду, где каждый ребенок может раскрыть свой потенциал",
        items: {
          respect: {
            title: "Уважение",
            description: "Воспитываем уважение к себе, другим и окружающему миру"
          },
          excellence: {
            title: "Совершенство",
            description: "Стремимся предоставлять высочайший уровень образования"
          },
          community: {
            title: "Сообщество",
            description: "Создаем атмосферу заботы и взаимопонимания"
          },
          knowledge: {
            title: "Знания и навыки",
            description: "Развиваем креативность и уверенность в себе"
          },
          international: {
            title: "Международность",
            description: "Подготовка к жизни в глобальном мире"
          },
          safety: {
            title: "Безопасность",
            description: "Обеспечиваем безопасную образовательную среду"
          }
        }
      },
      programs: {
        title: "Наши программы",
        subtitle: "Комплексное образование для детей 5-10 лет",
        earlyYears: {
          title: "Ранние годы (5-6 лет)",
          description: "Целостное развитие для наших самых маленьких учеников."
        },
        primary: {
          title: "Начальная школа (6-10 лет)",
          description: "Увлекательная программа для базового обучения."
        },
        ibpyp: {
          title: "IB PYP Программа",
          description: "Обучение на основе исследований для граждан мира."
        },
        english: {
          title: "Английский язык",
          description: "Развитие сильных навыков общения на английском языке."
        }
      },
      mission: {
        title: "Миссия SIS",
        description: "Мы воспитываем гармоничную личность, преданную идее построения лучшего мира на основе нравственных ценностей."
      },
      stats: {
        title: "В цифрах",
        subtitle: "Наше влияние в числах",
        students: "Учеников",
        nationalities: "Национальностей",
        teachers: "Учителей",
        years: "Лет совершенства"
      },
      cta: {
        title: "Готовы присоединиться к нашему сообществу?",
        subtitle: "Сделайте первый шаг к светлому будущему вашего ребенка",
        apply: "Подать заявку",
        learnMore: "Узнать больше",
        contact: "Связаться с нами"
      },
      footer: {
        description: "Scandic International School - предоставляем образование мирового уровня в Уральске",
        quickLinks: "Быстрые ссылки",
        contact: "Контактная информация",
        address: "Уральск, Казахстан",
        phone: "Телефон",
        email: "Email",
        license: "Лицензия: KZ96LAA00035527",
        rights: "Все права защищены",
        followUs: "Следите за нами в Instagram",
        instagramHandle: "@scandic.school"
      },
      instagram: {
        title: "Следите за нами в Instagram",
        description: "Будьте в курсе всех событий нашей школы, следите за успехами учеников и новостями",
        handle: "@scandic.school",
        loading: "Загружаем пост...",
        subscribe: "Подписаться",
        contactUs: "Связаться с нами"
      },
      contact: {
        title: "Свяжитесь с нами",
        subtitle: "Мы готовы ответить на любые ваши вопросы",
        form: {
          name: "Имя",
          email: "Email",
          phone: "Телефон",
          message: "Сообщение",
          submit: "Отправить сообщение",
          placeholders: {
            name: "Введите ваше имя",
            email: "ваш@email.com",
            phone: "+7 (___) ___-__-__",
            message: "Расскажите о ваших вопросах или пожеланиях..."
          },
          messages: {
            sending: "Отправка...",
            error: "Произошла ошибка при отправке сообщения. Попробуйте еще раз.",
            success: "Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время."
          }
        },
        info: {
          address: "Адрес",
          phone: "Телефон",
          email: "Email",
          hours: "Режим работы"
        },
        details: {
          address: "ул. Кайрата Жумагалиева 18, 3 этаж",
          city: "Уральск, Казахстан",
          phoneNumber: "8 706 610 57 81",
          phoneHours: "Пн-Пт: 08:30 - 16:30",
          emailAddress: "info@scandic.school",
          emailResponse: "Ответим в течение 24 часов",
          workingHours: "Пн-Пт: 08:30 - 16:30",
          saturdayHours: ""
        }
      },
      application: {
        title: "Форма заявки",
        subtitle: "Подайте заявку на поступление в Scandic International School",
        sections: {
          parentInfo: "Информация о родителе",
          childInfo: "Информация о ребенке"
        },
        fields: {
          parentName: "ФИО родителя (законного представителя) *",
          parentPhone: "Контактный номер телефона *",
          childName: "ФИО ребенка *",
          childBirthDate: "Дата рождения ребенка *",
          grade: "Класс, на который планируете поступать *",
          language: "Язык обучения *",
          englishLevel: "Уровень знания английского языка у ребенка *",
          preferredTime: "Удобное время для собеседования *"
        },
        placeholders: {
          parentName: "Введите ФИО",
          parentPhone: "+7 (___) ___-__-__",
          childName: "Введите ФИО ребенка",
          grade: "Выберите класс",
          language: "Выберите язык",
          englishLevel: "Выберите уровень",
          preferredTime: "Укажите желаемую дату и время"
        },
        options: {
          grades: [
            { value: "0", label: "0 класс" },
            { value: "1", label: "1 класс" },
            { value: "2", label: "2 класс" },
            { value: "3", label: "3 класс" },
            { value: "4", label: "4 класс" }
          ],
          languages: [
            { value: "kazakh", label: "Казахский" },
            { value: "russian", label: "Русский" }
          ],
          englishLevels: [
            { value: "beginner", label: "Начинающий (Beginner)" },
            { value: "intermediate", label: "Средний (Pre-Intermediate и выше)" },
            { value: "unknown", label: "Не знаю" }
          ]
        },
        messages: {
          submitting: "Отправляем заявку...",
          submit: "Подать заявку",
          error: "Произошла ошибка при подаче заявки. Попробуйте еще раз.",
          success: "Мы свяжемся с вами для подтверждения собеседования в течение 24 часов.",
          license: "Лицензия: KZ96LAA00035527 | 0–4 классы | IB PYP"
        }
      },
      staff: {
        title: "Наша команда",
        subtitle: "Профессиональные педагоги, преданные делу образования",
        cta: "Хотите присоединиться к нашей команде?",
        applyButton: "Отправить резюме",
        education: "Образование:",
        experience: "Опыт работы:",
        languages: "Языки:",
        parentOf: "Родитель"
      },
      testimonials: {
        title: "Отзывы родителей",
        subtitle: "Что говорят о нас родители наших учеников",
        ctaTitle: "Хотите поделиться своим опытом?",
        ctaSubtitle: "Мы будем рады услышать ваше мнение о нашей школе",
        shareButton: "Поделиться отзывом",
        parentOf: "Родитель"
      },
      documentsPage: {
        title: "Документы школы",
        subtitle: "Официальные документы, политики, руководства и расписания Scandic International School",
        sectionTitle: "Категории документов",
        sectionSubtitle: "Найдите нужные документы в соответствующих категориях",
        download: "Скачать",
        noDocuments: "Документы не найдены",
        contactTitle: "Нужна помощь с документами?",
        contactSubtitle: "Если вы не можете найти нужный документ или у вас есть вопросы, свяжитесь с нами",
        contactButton: "Связаться с нами",
        requestButton: "Запросить документ"
      }
    },
    kk: {
      navigation: {
        home: "Басты бет",
        about: "Біз туралы",
        contact: "Байланыс",
        application: "Өтініш",
        staff: "Қызметкерлер",
        testimonials: "Пікірлер",
        documents: "Құжаттар",
        school: "Мектеп",
        contactSection: "Байланыс"
      },
      header: {
        schoolName: "Scandic School",
        phone: "8 706 610 57 81",
        applyButton: "Өтініш беру",
        descriptions: {
          staff: "Біздің педагогтар командасы",
          testimonials: "Ата-аналардың пікірлері",
          documents: "Саясаттар мен құжаттар"
        }
      },
      hero: {
        welcome: "Қош келдіңіз",
        schoolName: "Scandic International School",
        description: "Біз адамгершілік құндылықтарына негізделген жақсырақ әлем құру идеясына адал гармониялы тұлғаларды тәрбиелейміз.",
        stats: {
          students: "Оқушылар",
          nationalities: "Ұлттар",
          ratio: "Мұғалім/оқушы қатынасы",
          program: "Бағдарлама"
        },
        cta: {
          apply: "Өтініш беру",
          learnMore: "Көбірек білу"
        },
        features: {
          ibProgram: "IB PYP Бағдарламасы",
          internationalProgram: "Халықаралық бастауыш мектеп бағдарламасы",
          grades: "0-4 сыныптар",
          multinational: "Көпұлтты орта",
          standards: "Халықаралық стандарттар"
        },
        floating: {
          enrollment: "2025-2026",
          enrollmentOpen: "Қабылдау ашық",
          license: "Лицензия",
          licenseNumber: "KZ96LAA00035527"
        }
      },
      features: {
        title: "Неге Scandic International School-ты таңдау керек?",
        subtitle: "Біз әр баланың өз потенциалын ашуына мүмкіндік беретін орта жасаймыз",
        items: {
          respect: {
            title: "Құрмет",
            description: "Өзіне, басқаларға және айналадағы әлемге құрмет тәрбиелейміз"
          },
          excellence: {
            title: "Мінсіздік",
            description: "Ең жоғары деңгейде білім беруге ұмтыламыз"
          },
          community: {
            title: "Қауымдастық",
            description: "Қамқорлық пен өзара түсіністік атмосферасын жасаймыз"
          },
          knowledge: {
            title: "Білім және дағдылар",
            description: "Шығармашылық пен өз-өзіне сенімділікті дамытамыз"
          },
          international: {
            title: "Халықаралықтық",
            description: "Жаһандық әлемде өмір сүруге дайындау"
          },
          safety: {
            title: "Қауіпсіздік",
            description: "Қауіпсіз білім беру ортасын қамтамасыз етеміз"
          }
        }
      },
      programs: {
        title: "Біздің бағдарламалар",
        subtitle: "5-10 жас аралығындағы балаларға арналған кешенді білім беру",
        earlyYears: {
          title: "Ерте жылдар (5-6 жас)",
          description: "Біздің ең кішкентай оқушыларымызға арналған толық даму."
        },
        primary: {
          title: "Бастауыш мектеп (6-10 жас)",
          description: "Негізгі оқуға арналған қызықты бағдарлама."
        },
        ibpyp: {
          title: "IB PYP Бағдарламасы",
          description: "Жаһандық азаматтарға арналған зерттеуге негізделген оқыту."
        },
        english: {
          title: "Ағылшын тілі",
          description: "Ағылшын тілінде күшті коммуникация дағдыларын дамыту."
        }
      },
      mission: {
        title: "SIS миссиясы",
        description: "Біз моральдық құндылықтар негізінде жақсы әлем құру идеясына адал гармониялы тұлға тәрбиелейміз."
      },
      stats: {
        title: "Сандармен",
        subtitle: "Біздің әсеріміз сандармен",
        students: "Оқушылар",
        nationalities: "Ұлттар",
        teachers: "Мұғалімдер",
        years: "Мінсіздік жылдары"
      },
      cta: {
        title: "Біздің қауымдастыққа қосылуға дайынсыз ба?",
        subtitle: "Балаңыздың жарқын болашағына қарай бірінші қадам жасаңыз",
        apply: "Өтініш беру",
        learnMore: "Көбірек білу",
        contact: "Бізбен байланысыңыз"
      },
      footer: {
        description: "Scandic International School - Оралда әлемдік деңгейде білім беру",
        quickLinks: "Жылдам сілтемелер",
        contact: "Байланыс ақпараты",
        address: "Орал, Қазақстан",
        phone: "Телефон",
        email: "Email",
        license: "Лицензия: KZ96LAA00035527",
        rights: "Барлық құқықтар қорғалған",
        followUs: "Instagram-да бізді бақылаңыз",
        instagramHandle: "@scandic.school"
      },
      instagram: {
        title: "Instagram-да бізді бақылаңыз",
        description: "Мектеп оқиғаларымен танысыңыз, оқушылардың жетістіктері мен жаңалықтарын бақылаңыз",
        handle: "@scandic.school",
        loading: "Пост жүктелуде...",
        subscribe: "Жазылу",
        contactUs: "Бізбен байланысыңыз"
      },
      contact: {
        title: "Бізбен байланысыңыз",
        subtitle: "Біз сіздің кез келген сұрағыңызға жауап беруге дайынбыз",
        form: {
          name: "Аты-жөні",
          email: "Email",
          phone: "Телефон",
          message: "Хабарлама",
          submit: "Хабарлама жіберу",
          placeholders: {
            name: "Атыңызды енгізіңіз",
            email: "сіздің@email.com",
            phone: "+7 (___) ___-__-__",
            message: "Сұрақтарыңыз немесе тілектеріңіз туралы айтыңыз..."
          },
          messages: {
            sending: "Жіберілуде...",
            error: "Хабарлама жіберу кезінде қате орын алды. Қайталап көріңіз.",
            success: "Хабарлама сәтті жіберілді! Біз жақын арада сізбен байланысамыз."
          }
        },
        info: {
          address: "Мекенжай",
          phone: "Телефон",
          email: "Email",
          hours: "Жұмыс уақыты"
        },
        details: {
          address: "Қайрат Жұмағалиев к-сі 18, 3 қабат",
          city: "Орал, Қазақстан",
          phoneNumber: "8 706 610 57 81",
          phoneHours: "Дс-Жм: 08:30 - 16:30",
          emailAddress: "info@scandic.school",
          emailResponse: "24 сағат ішінде жауап береміз",
          workingHours: "Дс-Жм: 08:30 - 16:30",
          saturdayHours: ""
        }
      },
      application: {
        title: "Өтініш формасы",
        subtitle: "Scandic International School-қа түсу үшін өтініш беріңіз",
        sections: {
          parentInfo: "Ата-ана туралы ақпарат",
          childInfo: "Бала туралы ақпарат"
        },
        fields: {
          parentName: "Ата-ананың толық аты-жөні (заңды өкіл) *",
          parentPhone: "Байланыс телефон нөмірі *",
          childName: "Баланың толық аты-жөні *",
          childBirthDate: "Баланың туған күні *",
          grade: "Түсу жоспарлаған сынып *",
          language: "Оқыту тілі *",
          englishLevel: "Баланың ағылшын тілі деңгейі *",
          preferredTime: "Сұхбатқа ыңғайлы уақыт *"
        },
        placeholders: {
          parentName: "Толық аты-жөнін енгізіңіз",
          parentPhone: "+7 (___) ___-__-__",
          childName: "Баланың толық аты-жөнін енгізіңіз",
          grade: "Сыныпты таңдаңыз",
          language: "Тілді таңдаңыз",
          englishLevel: "Деңгейді таңдаңыз",
          preferredTime: "Қалаған күн мен уақытты көрсетіңіз"
        },
        options: {
          grades: [
            { value: "0", label: "0 сынып" },
            { value: "1", label: "1 сынып" },
            { value: "2", label: "2 сынып" },
            { value: "3", label: "3 сынып" },
            { value: "4", label: "4 сынып" }
          ],
          languages: [
            { value: "kazakh", label: "Қазақ тілі" },
            { value: "russian", label: "Орыс тілі" }
          ],
          englishLevels: [
            { value: "beginner", label: "Бастапқы (Beginner)" },
            { value: "intermediate", label: "Орта (Pre-Intermediate және жоғары)" },
            { value: "unknown", label: "Білмеймін" }
          ]
        },
        messages: {
          submitting: "Өтініш жіберілуде...",
          submit: "Өтініш жіберу",
          error: "Өтініш жіберу кезінде қате орын алды. Қайталап көріңіз.",
          success: "Сұхбатты растау үшін 24 сағат ішінде сізбен байланысамыз.",
          license: "Лицензия: KZ96LAA00035527 | 0–4 сыныптар | IB PYP"
        }
      },
      staff: {
        title: "Біздің команда",
        subtitle: "Білім беру ісіне адал кәсіби педагогтар",
        cta: "Біздің командаға қосылғыңыз келе ме?",
        applyButton: "Резюме жіберу",
        education: "Білім:",
        experience: "Жұмыс тәжірибесі:",
        languages: "Тілдер:",
        parentOf: "Ата-анасы"
      },
      testimonials: {
        title: "Ата-аналардың пікірлері",
        subtitle: "Ата-аналар біз туралы не дейді",
        ctaTitle: "Өз тәжірибеңізбен бөлісгіңіз келе ме?",
        ctaSubtitle: "Біз мектеп туралы сіздің пікіріңізді естуге қуаныштымыз",
        shareButton: "Пікір бөлісу",
        parentOf: "Ата-анасы"
      },
      documentsPage: {
        title: "Мектеп құжаттары",
        subtitle: "Scandic International School-дың ресми құжаттары, саясаттары, нұсқаулықтары мен кестелері",
        sectionTitle: "Құжат санаттары",
        sectionSubtitle: "Қажетті құжаттарды тиісті санаттардан табыңыз",
        download: "Жүктеп алу",
        noDocuments: "Құжаттар табылмады",
        contactTitle: "Құжаттар бойынша көмек қажет пе?",
        contactSubtitle: "Егер қажетті құжатты таба алмасаңыз немесе сұрақтарыңыз болса, бізге хабарласыңыз",
        contactButton: "Бізбен байланысу",
        requestButton: "Құжат сұрау"
      }
    }
  };

  return translations[locale];
}
