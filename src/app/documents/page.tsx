import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Calendar, Users, BookOpen, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Документы школы | Scandic International School",
  description: "Официальные документы Scandic International School - политики, руководство, расписание, календарь мероприятий",
};

export default async function DocumentsPage() {
  const documents = [
    {
      title: "Политики школы",
      description: "Внутренние политики и правила школы",
      icon: Shield,
      files: [
        { name: "Политика безопасности", size: "2.1 MB", type: "PDF" },
        { name: "Политика конфиденциальности", size: "1.8 MB", type: "PDF" },
        { name: "Политика академической честности", size: "1.5 MB", type: "PDF" },
        { name: "Политика приема учащихся", size: "2.3 MB", type: "PDF" }
      ]
    },
    {
      title: "Руководство для родителей",
      description: "Подробное руководство для родителей и опекунов",
      icon: BookOpen,
      files: [
        { name: "Руководство для родителей 2024-2025", size: "5.2 MB", type: "PDF" },
        { name: "Календарь учебного года", size: "1.1 MB", type: "PDF" },
        { name: "Правила поведения учащихся", size: "2.4 MB", type: "PDF" },
        { name: "Процедуры экстренной эвакуации", size: "1.7 MB", type: "PDF" }
      ]
    },
    {
      title: "Расписание занятий",
      description: "Актуальное расписание для всех классов",
      icon: Calendar,
      files: [
        { name: "Расписание 0-1 классов", size: "0.8 MB", type: "PDF" },
        { name: "Расписание 2-4 классов", size: "0.9 MB", type: "PDF" },
        { name: "Расписание дополнительных занятий", size: "1.2 MB", type: "PDF" }
      ]
    },
    {
      title: "Календарь мероприятий",
      description: "Планируемые мероприятия и события",
      icon: Calendar,
      files: [
        { name: "Календарь мероприятий 2024-2025", size: "1.5 MB", type: "PDF" },
        { name: "Праздники и выходные дни", size: "0.6 MB", type: "PDF" },
        { name: "Расписание экзаменов", size: "1.0 MB", type: "PDF" }
      ]
    },
    {
      title: "Учебные программы",
      description: "Детальное описание учебных программ",
      icon: FileText,
      files: [
        { name: "IB PYP Программа", size: "3.2 MB", type: "PDF" },
        { name: "Программа раннего развития", size: "2.8 MB", type: "PDF" },
        { name: "Программа английского языка", size: "2.1 MB", type: "PDF" }
      ]
    },
    {
      title: "Лицензии и сертификаты",
      description: "Официальные документы и сертификаты",
      icon: Shield,
      files: [
        { name: "Лицензия на образовательную деятельность", size: "1.3 MB", type: "PDF" },
        { name: "Сертификат IB PYP", size: "0.9 MB", type: "PDF" },
        { name: "Аккредитация школы", size: "2.2 MB", type: "PDF" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Документы школы
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              Официальные документы, политики, руководства и расписания Scandic International School
            </p>
          </div>
        </section>

        {/* Documents Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Категории документов
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Найдите нужные документы в соответствующих категориях
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {documents.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                            {category.title}
                          </CardTitle>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {category.description}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {category.files.map((file, fileIndex) => (
                          <div key={fileIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group-hover:bg-primary/5 transition-colors">
                            <div className="flex items-center space-x-3">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                <p className="text-xs text-gray-500">{file.type} • {file.size}</p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline" className="text-xs">
                              <Download className="h-3 w-3 mr-1" />
                              Скачать
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Нужна помощь с документами?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Если вы не можете найти нужный документ или у вас есть вопросы, свяжитесь с нами
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Users className="h-5 w-5 mr-2" />
                Связаться с нами
              </Button>
              <Button size="lg" variant="outline">
                <FileText className="h-5 w-5 mr-2" />
                Запросить документ
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
