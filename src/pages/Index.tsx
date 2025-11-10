import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const lessons = [
    { title: 'Математика', icon: 'Calculator', color: 'bg-primary', emoji: '🔢' },
    { title: 'Чтение', icon: 'Book', color: 'bg-secondary', emoji: '📚' },
    { title: 'Окружающий мир', icon: 'Globe', color: 'bg-accent', emoji: '🌍' },
    { title: 'Рисование', icon: 'Palette', color: 'bg-purple-500', emoji: '🎨' }
  ];

  const games = [
    { title: 'Считалочка', description: 'Учись считать весело!', icon: 'Dices', emoji: '🎲' },
    { title: 'Буквы и слова', description: 'Собирай слова из букв', icon: 'Sparkles', emoji: '✨' },
    { title: 'Загадки', description: 'Отгадывай интересные загадки', icon: 'Brain', emoji: '🧩' },
    { title: 'Раскраски', description: 'Раскрашивай картинки', icon: 'Paintbrush', emoji: '🖍️' }
  ];

  const renderHome = () => (
    <div className="space-y-16">
      <section className="text-center py-20 px-4 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex justify-center">
            <img 
              src="https://cdn.poehali.dev/projects/3f3a3e1f-e23d-4bcf-8bf4-feaa146c6eca/files/8dea3d02-61e4-48e5-ab62-b44a53cde37f.jpg" 
              alt="Умная Сова" 
              className="w-48 h-48 object-contain animate-float"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            Привет, юный ученик! 🚀
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Добро пожаловать в волшебный мир знаний! Учись играя вместе с нашей Умной Совой
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="text-lg hover-scale" onClick={() => setActiveSection('lessons')}>
              Начать учиться 📖
            </Button>
            <Button size="lg" variant="outline" className="text-lg hover-scale" onClick={() => setActiveSection('games')}>
              Поиграть 🎮
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Почему детям нравится учиться с нами? 🌟</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-scale border-2 border-primary/20">
              <CardHeader>
                <div className="text-6xl mb-4">🎯</div>
                <CardTitle>Интересно</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Уроки превращаются в увлекательные приключения!</p>
              </CardContent>
            </Card>
            <Card className="hover-scale border-2 border-secondary/20">
              <CardHeader>
                <div className="text-6xl mb-4">🛡️</div>
                <CardTitle>Безопасно</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Родительский контроль и защищенная среда обучения</p>
              </CardContent>
            </Card>
            <Card className="hover-scale border-2 border-accent/20">
              <CardHeader>
                <div className="text-6xl mb-4">⭐</div>
                <CardTitle>Результативно</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Следи за своими успехами и получай награды!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <img 
            src="https://cdn.poehali.dev/projects/3f3a3e1f-e23d-4bcf-8bf4-feaa146c6eca/files/05c5e555-d639-4878-9b5d-3511602b6d2f.jpg" 
            alt="Дети учатся вместе" 
            className="w-full max-w-2xl mx-auto rounded-3xl shadow-2xl mb-8"
          />
          <h3 className="text-3xl font-bold mb-4">Учись вместе с друзьями! 👫</h3>
          <p className="text-lg text-muted-foreground">
            Присоединяйся к тысячам ребят, которые каждый день открывают для себя что-то новое
          </p>
        </div>
      </section>
    </div>
  );

  const renderLessons = () => (
    <div className="py-12 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Мои уроки 📚</h1>
          <p className="text-xl text-muted-foreground">Выбери предмет, который хочешь изучать</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lessons.map((lesson, index) => (
            <Card 
              key={index} 
              className="hover-scale cursor-pointer border-2 hover:border-primary transition-all"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center">
                <div className="text-7xl mb-4 animate-bounce-in">{lesson.emoji}</div>
                <CardTitle className="text-2xl">{lesson.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Badge className={`${lesson.color} text-white px-6 py-2 text-base`}>
                  Открыть урок
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGames = () => (
    <div className="py-12 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Обучающие игры 🎮</h1>
          <p className="text-xl text-muted-foreground">Учись играя - это так весело!</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {games.map((game, index) => (
            <Card 
              key={index} 
              className="hover-scale cursor-pointer border-2 hover:shadow-lg transition-all"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{game.emoji}</div>
                  <div>
                    <CardTitle className="text-2xl mb-2">{game.title}</CardTitle>
                    <CardDescription className="text-base">{game.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full text-lg">Играть сейчас!</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderParents = () => (
    <div className="py-12 px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Для родителей 👨‍👩‍👧‍👦</h1>
          <p className="text-xl text-muted-foreground">Информация о безопасности и контроле обучения</p>
        </div>
        
        <div className="space-y-8">
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="text-5xl">🔒</div>
                <CardTitle className="text-3xl">Безопасная среда</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-lg">
              <p>✅ Все материалы проверены педагогами</p>
              <p>✅ Отсутствие внешней рекламы</p>
              <p>✅ Защита личных данных ребенка</p>
              <p>✅ Контроль времени использования</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="text-5xl">📊</div>
                <CardTitle className="text-3xl">Отслеживание прогресса</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-lg">
              <p>📈 Статистика выполненных заданий</p>
              <p>🎯 Отчеты об успеваемости</p>
              <p>⭐ Достижения и награды ребенка</p>
              <p>📧 Еженедельные email-отчеты</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="text-5xl">🎓</div>
                <CardTitle className="text-3xl">Образовательная программа</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-lg">
              <p>📚 Соответствует ФГОС начального образования</p>
              <p>👩‍🏫 Разработано учителями начальных классов</p>
              <p>🎯 Индивидуальный подход к каждому ребенку</p>
              <p>🔄 Регулярное обновление контента</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderContacts = () => (
    <div className="py-12 px-4 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Свяжитесь с нами 📧</h1>
          <p className="text-xl text-muted-foreground">Мы всегда рады помочь!</p>
        </div>
        
        <Card className="border-2">
          <CardContent className="pt-6">
            <form className="space-y-6">
              <div>
                <label className="text-lg font-medium mb-2 block">Ваше имя</label>
                <Input placeholder="Введите ваше имя" className="text-lg h-12" />
              </div>
              <div>
                <label className="text-lg font-medium mb-2 block">Email</label>
                <Input type="email" placeholder="your@email.com" className="text-lg h-12" />
              </div>
              <div>
                <label className="text-lg font-medium mb-2 block">Сообщение</label>
                <Textarea placeholder="Как мы можем помочь?" rows={6} className="text-lg" />
              </div>
              <Button className="w-full text-lg h-12 hover-scale">Отправить сообщение</Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 text-center space-y-4">
          <div className="flex items-center justify-center gap-3 text-lg">
            <Icon name="Mail" size={24} />
            <span>support@school-kids.ru</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-lg">
            <Icon name="Phone" size={24} />
            <span>8 (800) 123-45-67</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-lg">
            <Icon name="MapPin" size={24} />
            <span>Москва, ул. Знаний, д. 1</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection('home')}>
              <div className="text-4xl">🦉</div>
              <span className="text-2xl font-bold">УмнаяСова</span>
            </div>
            <div className="hidden md:flex gap-2">
              <Button 
                variant={activeSection === 'home' ? 'default' : 'ghost'} 
                onClick={() => setActiveSection('home')}
                className="text-lg"
              >
                Главная
              </Button>
              <Button 
                variant={activeSection === 'lessons' ? 'default' : 'ghost'} 
                onClick={() => setActiveSection('lessons')}
                className="text-lg"
              >
                Уроки
              </Button>
              <Button 
                variant={activeSection === 'games' ? 'default' : 'ghost'} 
                onClick={() => setActiveSection('games')}
                className="text-lg"
              >
                Игры
              </Button>
              <Button 
                variant={activeSection === 'parents' ? 'default' : 'ghost'} 
                onClick={() => setActiveSection('parents')}
                className="text-lg"
              >
                Родителям
              </Button>
              <Button 
                variant={activeSection === 'contacts' ? 'default' : 'ghost'} 
                onClick={() => setActiveSection('contacts')}
                className="text-lg"
              >
                Контакты
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {activeSection === 'home' && renderHome()}
        {activeSection === 'lessons' && renderLessons()}
        {activeSection === 'games' && renderGames()}
        {activeSection === 'parents' && renderParents()}
        {activeSection === 'contacts' && renderContacts()}
      </main>

      <footer className="bg-card border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-lg text-muted-foreground">
            © 2024 УмнаяСова - Образовательная платформа для младших школьников
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Сделано с ❤️ для любознательных детей и заботливых родителей
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
