import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  
  const [mathAnswer, setMathAnswer] = useState('');
  const [mathScore, setMathScore] = useState(0);
  const [currentMathQuestion, setCurrentMathQuestion] = useState({ a: 5, b: 3, answer: 8 });
  
  const [countingScore, setCountingScore] = useState(0);
  const [countingQuestion, setCountingQuestion] = useState({ num: 5, answer: 5 });
  
  const [wordGame, setWordGame] = useState({ 
    letters: ['К', 'О', 'Т'], 
    selected: [] as string[],
    correctWord: 'КОТ'
  });
  const [wordScore, setWordScore] = useState(0);

  const [riddleIndex, setRiddleIndex] = useState(0);
  const [riddleScore, setRiddleScore] = useState(0);
  const riddles = [
    { question: 'Зимой и летом одним цветом. Что это?', answer: 'ёлка', options: ['ёлка', 'трава', 'цветок'] },
    { question: 'Висит груша, нельзя скушать. Что это?', answer: 'лампочка', options: ['лампочка', 'груша', 'яблоко'] },
    { question: 'Без рук, без ног, а рисовать умеет. Что это?', answer: 'мороз', options: ['художник', 'мороз', 'карандаш'] }
  ];

  const lessons = [
    { id: 'math', title: 'Математика', icon: 'Calculator', color: 'bg-primary', emoji: '🔢' },
    { id: 'reading', title: 'Чтение', icon: 'Book', color: 'bg-secondary', emoji: '📚' },
    { id: 'world', title: 'Окружающий мир', icon: 'Globe', color: 'bg-accent', emoji: '🌍' },
    { id: 'art', title: 'Рисование', icon: 'Palette', color: 'bg-purple-500', emoji: '🎨' }
  ];

  const games = [
    { id: 'counting', title: 'Считалочка', description: 'Учись считать весело!', icon: 'Dices', emoji: '🎲' },
    { id: 'words', title: 'Буквы и слова', description: 'Собирай слова из букв', icon: 'Sparkles', emoji: '✨' },
    { id: 'riddles', title: 'Загадки', description: 'Отгадывай интересные загадки', icon: 'Brain', emoji: '🧩' },
    { id: 'coloring', title: 'Раскраски', description: 'Раскрашивай картинки', icon: 'Paintbrush', emoji: '🖍️' }
  ];

  const generateNewMathQuestion = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCurrentMathQuestion({ a, b, answer: a + b });
    setMathAnswer('');
  };

  const checkMathAnswer = () => {
    if (parseInt(mathAnswer) === currentMathQuestion.answer) {
      setMathScore(mathScore + 1);
      generateNewMathQuestion();
    } else {
      alert('Попробуй ещё раз! 💪');
    }
  };

  const checkCounting = (userAnswer: number) => {
    if (userAnswer === countingQuestion.answer) {
      setCountingScore(countingScore + 1);
      const newNum = Math.floor(Math.random() * 10) + 1;
      setCountingQuestion({ num: newNum, answer: newNum });
    } else {
      alert('Попробуй посчитать ещё раз! 🤔');
    }
  };

  const selectLetter = (letter: string) => {
    const newSelected = [...wordGame.selected, letter];
    setWordGame({ ...wordGame, selected: newSelected });
    
    if (newSelected.join('') === wordGame.correctWord) {
      setWordScore(wordScore + 1);
      const words = [
        { letters: ['Д', 'О', 'М'], word: 'ДОМ' },
        { letters: ['С', 'О', 'К'], word: 'СОК' },
        { letters: ['Л', 'Е', 'С'], word: 'ЛЕС' },
        { letters: ['М', 'Я', 'Ч'], word: 'МЯЧ' }
      ];
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setWordGame({ letters: randomWord.letters, selected: [], correctWord: randomWord.word });
    }
  };

  const checkRiddle = (answer: string) => {
    if (answer === riddles[riddleIndex].answer) {
      setRiddleScore(riddleScore + 1);
      if (riddleIndex < riddles.length - 1) {
        setRiddleIndex(riddleIndex + 1);
      } else {
        alert(`Молодец! Ты отгадал все загадки! Твой счёт: ${riddleScore + 1} из ${riddles.length} 🎉`);
        setRiddleIndex(0);
        setRiddleScore(0);
      }
    } else {
      alert('Подумай ещё! 🤔');
    }
  };

  const renderMathLesson = () => (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Card className="border-2">
        <CardHeader className="text-center">
          <div className="text-7xl mb-4">🔢</div>
          <CardTitle className="text-4xl">Урок математики</CardTitle>
          <CardDescription className="text-xl">Реши примеры и получи звёздочки!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-center">
            <div className="text-2xl mb-4">Твой счёт: <span className="text-primary font-bold">{mathScore} ⭐</span></div>
            <div className="text-5xl font-bold mb-8 p-8 bg-muted rounded-2xl">
              {currentMathQuestion.a} + {currentMathQuestion.b} = ?
            </div>
            <div className="space-y-4">
              <Input 
                type="number" 
                value={mathAnswer}
                onChange={(e) => setMathAnswer(e.target.value)}
                placeholder="Введи ответ"
                className="text-3xl h-16 text-center"
                onKeyDown={(e) => e.key === 'Enter' && checkMathAnswer()}
              />
              <Button onClick={checkMathAnswer} size="lg" className="w-full text-xl">
                Проверить ответ ✓
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Button 
        onClick={() => setActiveLesson(null)} 
        variant="outline" 
        size="lg" 
        className="w-full mt-6"
      >
        ← Назад к урокам
      </Button>
    </div>
  );

  const renderReadingLesson = () => (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Card className="border-2">
        <CardHeader className="text-center">
          <div className="text-7xl mb-4">📚</div>
          <CardTitle className="text-4xl">Урок чтения</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold mb-4">Сказка "Колобок"</h3>
            <p className="text-xl leading-relaxed">
              Жили-были старик со старухой. Вот и говорит старик старухе:
              — Поди-ка, старуха, по коробу поскреби, по сусеку помети, 
              не наскребешь ли муки на колобок.
            </p>
            <p className="text-xl leading-relaxed mt-4">
              Взяла старуха крылышко, по коробу поскребла, по сусеку помела 
              и наскребла муки горсти две. Замесила муку на сметане, 
              состряпала колобок, изжарила в масле и на окошко студить положила.
            </p>
            <div className="bg-muted p-6 rounded-2xl mt-8">
              <h4 className="text-xl font-bold mb-4">Вопросы к тексту:</h4>
              <ul className="space-y-2 text-lg">
                <li>✏️ Кто попросил испечь колобок?</li>
                <li>✏️ Из чего старуха замесила тесто?</li>
                <li>✏️ Куда положили колобок остывать?</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      <Button 
        onClick={() => setActiveLesson(null)} 
        variant="outline" 
        size="lg" 
        className="w-full mt-6"
      >
        ← Назад к урокам
      </Button>
    </div>
  );

  const renderWorldLesson = () => (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Card className="border-2">
        <CardHeader className="text-center">
          <div className="text-7xl mb-4">🌍</div>
          <CardTitle className="text-4xl">Окружающий мир</CardTitle>
          <CardDescription className="text-xl">Узнай о природе вокруг нас!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-muted">
              <CardHeader>
                <div className="text-5xl mb-2">🌸</div>
                <CardTitle className="text-2xl">Времена года</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-lg">
                  <li>🌷 Весна - природа просыпается</li>
                  <li>☀️ Лето - жарко и солнечно</li>
                  <li>🍂 Осень - листья желтеют</li>
                  <li>❄️ Зима - снег и холод</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-muted">
              <CardHeader>
                <div className="text-5xl mb-2">🐾</div>
                <CardTitle className="text-2xl">Животные</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-lg">
                  <li>🐕 Домашние животные</li>
                  <li>🦁 Дикие животные</li>
                  <li>🐦 Птицы</li>
                  <li>🐠 Рыбы</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-muted">
              <CardHeader>
                <div className="text-5xl mb-2">🌳</div>
                <CardTitle className="text-2xl">Растения</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-lg">
                  <li>🌲 Деревья дают кислород</li>
                  <li>🌺 Цветы украшают природу</li>
                  <li>🌾 Злаки дают нам хлеб</li>
                  <li>🍎 Фрукты полезны для здоровья</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-muted">
              <CardHeader>
                <div className="text-5xl mb-2">💧</div>
                <CardTitle className="text-2xl">Природа</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-lg">
                  <li>☀️ Солнце даёт свет и тепло</li>
                  <li>💧 Вода нужна всему живому</li>
                  <li>🌬️ Воздух необходим для дыхания</li>
                  <li>🌍 Берегите природу!</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      <Button 
        onClick={() => setActiveLesson(null)} 
        variant="outline" 
        size="lg" 
        className="w-full mt-6"
      >
        ← Назад к урокам
      </Button>
    </div>
  );

  const renderArtLesson = () => (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Card className="border-2">
        <CardHeader className="text-center">
          <div className="text-7xl mb-4">🎨</div>
          <CardTitle className="text-4xl">Урок рисования</CardTitle>
          <CardDescription className="text-xl">Учись рисовать и познавай цвета!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Основные цвета 🌈</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-full h-32 bg-red-500 rounded-2xl mb-2"></div>
                <p className="text-xl font-bold">Красный 🔴</p>
              </div>
              <div className="text-center">
                <div className="w-full h-32 bg-blue-500 rounded-2xl mb-2"></div>
                <p className="text-xl font-bold">Синий 🔵</p>
              </div>
              <div className="text-center">
                <div className="w-full h-32 bg-yellow-400 rounded-2xl mb-2"></div>
                <p className="text-xl font-bold">Жёлтый 🟡</p>
              </div>
              <div className="text-center">
                <div className="w-full h-32 bg-green-500 rounded-2xl mb-2"></div>
                <p className="text-xl font-bold">Зелёный 🟢</p>
              </div>
              <div className="text-center">
                <div className="w-full h-32 bg-orange-500 rounded-2xl mb-2"></div>
                <p className="text-xl font-bold">Оранжевый 🟠</p>
              </div>
              <div className="text-center">
                <div className="w-full h-32 bg-purple-500 rounded-2xl mb-2"></div>
                <p className="text-xl font-bold">Фиолетовый 🟣</p>
              </div>
            </div>
          </div>

          <Card className="bg-muted">
            <CardHeader>
              <CardTitle className="text-2xl">Учись рисовать поэтапно:</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-lg list-decimal list-inside">
                <li>Начни с простых форм (круг, квадрат, треугольник)</li>
                <li>Добавь детали к основной форме</li>
                <li>Раскрась рисунок яркими цветами</li>
                <li>Не бойся экспериментировать! 🎨</li>
              </ol>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <Button 
        onClick={() => setActiveLesson(null)} 
        variant="outline" 
        size="lg" 
        className="w-full mt-6"
      >
        ← Назад к урокам
      </Button>
    </div>
  );

  const renderCountingGame = () => (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Card className="border-2">
        <CardHeader className="text-center">
          <div className="text-7xl mb-4">🎲</div>
          <CardTitle className="text-4xl">Считалочка</CardTitle>
          <CardDescription className="text-xl">Посчитай предметы!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-center">
            <div className="text-2xl mb-4">Твой счёт: <span className="text-primary font-bold">{countingScore} ⭐</span></div>
            <div className="text-3xl mb-6">Сколько яблок ты видишь?</div>
            <div className="text-8xl mb-8">
              {'🍎'.repeat(countingQuestion.num)}
            </div>
            <div className="grid grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <Button
                  key={num}
                  size="lg"
                  onClick={() => checkCounting(num)}
                  className="text-2xl h-16 hover-scale"
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <Button 
        onClick={() => setActiveGame(null)} 
        variant="outline" 
        size="lg" 
        className="w-full mt-6"
      >
        ← Назад к играм
      </Button>
    </div>
  );

  const renderWordGame = () => (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Card className="border-2">
        <CardHeader className="text-center">
          <div className="text-7xl mb-4">✨</div>
          <CardTitle className="text-4xl">Буквы и слова</CardTitle>
          <CardDescription className="text-xl">Собери слово из букв!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-center">
            <div className="text-2xl mb-4">Твой счёт: <span className="text-primary font-bold">{wordScore} ⭐</span></div>
            
            <div className="mb-8 p-6 bg-muted rounded-2xl">
              <div className="text-3xl mb-4">Твоё слово:</div>
              <div className="text-6xl font-bold min-h-[80px] flex items-center justify-center">
                {wordGame.selected.join('') || '?'}
              </div>
            </div>

            <div className="text-2xl mb-4">Нажми на буквы по порядку:</div>
            <div className="flex gap-4 justify-center">
              {wordGame.letters.map((letter, index) => (
                <Button
                  key={index}
                  size="lg"
                  onClick={() => selectLetter(letter)}
                  className="text-5xl h-32 w-32 hover-scale"
                  disabled={wordGame.selected.includes(letter)}
                >
                  {letter}
                </Button>
              ))}
            </div>
            <Button 
              onClick={() => setWordGame({ ...wordGame, selected: [] })}
              variant="outline"
              size="lg"
              className="mt-6"
            >
              Начать заново
            </Button>
          </div>
        </CardContent>
      </Card>
      <Button 
        onClick={() => setActiveGame(null)} 
        variant="outline" 
        size="lg" 
        className="w-full mt-6"
      >
        ← Назад к играм
      </Button>
    </div>
  );

  const renderRiddleGame = () => (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Card className="border-2">
        <CardHeader className="text-center">
          <div className="text-7xl mb-4">🧩</div>
          <CardTitle className="text-4xl">Загадки</CardTitle>
          <CardDescription className="text-xl">Отгадай загадку!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-center">
            <div className="text-2xl mb-4">Счёт: <span className="text-primary font-bold">{riddleScore} из {riddles.length}</span></div>
            
            <div className="p-8 bg-muted rounded-2xl mb-8">
              <div className="text-3xl font-bold leading-relaxed">
                {riddles[riddleIndex].question}
              </div>
            </div>

            <div className="space-y-4">
              {riddles[riddleIndex].options.map((option, index) => (
                <Button
                  key={index}
                  size="lg"
                  onClick={() => checkRiddle(option)}
                  className="w-full text-2xl h-16 hover-scale"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <Button 
        onClick={() => setActiveGame(null)} 
        variant="outline" 
        size="lg" 
        className="w-full mt-6"
      >
        ← Назад к играм
      </Button>
    </div>
  );

  const renderColoringGame = () => (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Card className="border-2">
        <CardHeader className="text-center">
          <div className="text-7xl mb-4">🖍️</div>
          <CardTitle className="text-4xl">Раскраски</CardTitle>
          <CardDescription className="text-xl">Выбери цвет и раскрась картинку!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-center text-9xl p-12 bg-muted rounded-2xl">
            🦋
          </div>
          <div>
            <div className="text-2xl mb-4">Выбери цвет:</div>
            <div className="grid grid-cols-4 gap-4">
              <Button className="h-16 bg-red-500 hover:bg-red-600">Красный</Button>
              <Button className="h-16 bg-blue-500 hover:bg-blue-600">Синий</Button>
              <Button className="h-16 bg-green-500 hover:bg-green-600">Зелёный</Button>
              <Button className="h-16 bg-yellow-400 hover:bg-yellow-500">Жёлтый</Button>
              <Button className="h-16 bg-purple-500 hover:bg-purple-600">Фиолетовый</Button>
              <Button className="h-16 bg-orange-500 hover:bg-orange-600">Оранжевый</Button>
              <Button className="h-16 bg-pink-400 hover:bg-pink-500">Розовый</Button>
              <Button className="h-16 bg-gray-800 hover:bg-gray-900">Чёрный</Button>
            </div>
          </div>
          <p className="text-center text-muted-foreground">
            В будущих версиях здесь будут настоящие раскраски! 🎨
          </p>
        </CardContent>
      </Card>
      <Button 
        onClick={() => setActiveGame(null)} 
        variant="outline" 
        size="lg" 
        className="w-full mt-6"
      >
        ← Назад к играм
      </Button>
    </div>
  );

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

  const renderLessons = () => {
    if (activeLesson === 'math') return renderMathLesson();
    if (activeLesson === 'reading') return renderReadingLesson();
    if (activeLesson === 'world') return renderWorldLesson();
    if (activeLesson === 'art') return renderArtLesson();

    return (
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
                onClick={() => setActiveLesson(lesson.id)}
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
  };

  const renderGames = () => {
    if (activeGame === 'counting') return renderCountingGame();
    if (activeGame === 'words') return renderWordGame();
    if (activeGame === 'riddles') return renderRiddleGame();
    if (activeGame === 'coloring') return renderColoringGame();

    return (
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
                onClick={() => setActiveGame(game.id)}
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
  };

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
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => {
              setActiveSection('home');
              setActiveLesson(null);
              setActiveGame(null);
            }}>
              <div className="text-4xl">🦉</div>
              <span className="text-2xl font-bold">УмнаяСова</span>
            </div>
            <div className="hidden md:flex gap-2">
              <Button 
                variant={activeSection === 'home' ? 'default' : 'ghost'} 
                onClick={() => {
                  setActiveSection('home');
                  setActiveLesson(null);
                  setActiveGame(null);
                }}
                className="text-lg"
              >
                Главная
              </Button>
              <Button 
                variant={activeSection === 'lessons' ? 'default' : 'ghost'} 
                onClick={() => {
                  setActiveSection('lessons');
                  setActiveLesson(null);
                  setActiveGame(null);
                }}
                className="text-lg"
              >
                Уроки
              </Button>
              <Button 
                variant={activeSection === 'games' ? 'default' : 'ghost'} 
                onClick={() => {
                  setActiveSection('games');
                  setActiveLesson(null);
                  setActiveGame(null);
                }}
                className="text-lg"
              >
                Игры
              </Button>
              <Button 
                variant={activeSection === 'parents' ? 'default' : 'ghost'} 
                onClick={() => {
                  setActiveSection('parents');
                  setActiveLesson(null);
                  setActiveGame(null);
                }}
                className="text-lg"
              >
                Родителям
              </Button>
              <Button 
                variant={activeSection === 'contacts' ? 'default' : 'ghost'} 
                onClick={() => {
                  setActiveSection('contacts');
                  setActiveLesson(null);
                  setActiveGame(null);
                }}
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
