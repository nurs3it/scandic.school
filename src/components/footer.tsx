import Link from "next/link";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary"></div>
              <span className="text-xl font-bold">Scandic School</span>
            </div>
            <p className="text-sm text-gray-300">
              Международная школа с программой IB PYP для детей 0-4 классов
            </p>
            <p className="text-xs text-gray-400">
              Лицензия: KZ96LAA00035527
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Программы
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Поступление
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Программы</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-300">Early Years (0-1 классы)</li>
              <li className="text-sm text-gray-300">Primary School (1-4 классы)</li>
              <li className="text-sm text-gray-300">IB PYP программа</li>
              <li className="text-sm text-gray-300">Английский язык</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm text-gray-300">
                  ул. Кайрата Жумагалиева 18, 3 этаж
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-gray-300">8 706 610 57 81</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm text-gray-300">info@scandic.school</span>
              </div>
              <div className="flex items-center space-x-3">
                <Instagram className="h-4 w-4 text-primary" />
                <a 
                  href="https://www.instagram.com/scandic.school/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  @scandic.school
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2024 Scandic International School. Все права защищены.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-primary transition-colors">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-primary transition-colors">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
