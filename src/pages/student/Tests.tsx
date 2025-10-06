import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ClipboardCheck, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Tests = () => {
  const [selectedTest, setSelectedTest] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const availableTests = [
    {
      title: 'JavaScript Fondamentaux',
      description: 'Testez vos connaissances sur les bases de JavaScript',
      questions: 15,
      duration: '30 min',
      difficulty: 'Facile',
      status: 'available',
    },
    {
      title: 'React Avancé',
      description: 'Évaluez votre maîtrise des concepts avancés de React',
      questions: 20,
      duration: '45 min',
      difficulty: 'Difficile',
      status: 'available',
    },
    {
      title: 'Algorithmes et Structures de Données',
      description: 'Testez votre compréhension des algorithmes essentiels',
      questions: 25,
      duration: '1h',
      difficulty: 'Difficile',
      status: 'completed',
      score: 85,
    },
    {
      title: 'CSS et Design Responsive',
      description: 'Vérifiez vos compétences en mise en page moderne',
      questions: 12,
      duration: '25 min',
      difficulty: 'Moyen',
      status: 'completed',
      score: 92,
    },
  ];

  const testQuestions = [
    {
      question: 'Quelle est la différence entre let et var en JavaScript ?',
      options: [
        'let a une portée de bloc, var a une portée de fonction',
        'let est plus rapide que var',
        'var est déprécié, let est moderne',
        'Il n\'y a aucune différence',
      ],
      correct: 0,
    },
    {
      question: 'Qu\'est-ce qu\'une closure en JavaScript ?',
      options: [
        'Une fonction qui retourne une autre fonction',
        'Une fonction qui a accès aux variables de sa portée externe',
        'Une fonction anonyme',
        'Une fonction asynchrone',
      ],
      correct: 1,
    },
    {
      question: 'Quel hook React utilise-t-on pour gérer les effets de bord ?',
      options: [
        'useState',
        'useContext',
        'useEffect',
        'useMemo',
      ],
      correct: 2,
    },
  ];

  const handleStartTest = (index: number) => {
    setSelectedTest(index);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    const correctAnswers = Object.entries(answers).filter(
      ([qIndex, answer]) => parseInt(answer) === testQuestions[parseInt(qIndex)].correct
    ).length;
    const score = Math.round((correctAnswers / testQuestions.length) * 100);
    
    toast({
      title: 'Test terminé !',
      description: `Votre score : ${score}%`,
    });
  };

  const handleBackToTests = () => {
    setSelectedTest(null);
    setShowResults(false);
  };

  const getStatusBadge = (status: string, score?: number) => {
    if (status === 'completed' && score !== undefined) {
      const variant = score >= 80 ? 'default' : score >= 60 ? 'secondary' : 'destructive';
      return <Badge variant={variant}>{score}%</Badge>;
    }
    return <Badge variant="outline">Disponible</Badge>;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile': return 'text-success';
      case 'Moyen': return 'text-warning';
      case 'Difficile': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  // Test List View
  if (selectedTest === null) {
    return (
      <DashboardLayout>
        <div className="space-y-8 animate-fade-in">
          <PageHeader
            title="Tests et Évaluations"
            description="Évaluez vos connaissances et suivez votre progression"
            icon={ClipboardCheck}
          />

          <div className="grid gap-6 md:grid-cols-2">
            {availableTests.map((test, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-xl">{test.title}</CardTitle>
                    {getStatusBadge(test.status, test.score)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{test.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                      <span>{test.questions} questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{test.duration}</span>
                    </div>
                    <span className={`font-medium ${getDifficultyColor(test.difficulty)}`}>
                      {test.difficulty}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleStartTest(index)}
                    className="w-full"
                    variant={test.status === 'completed' ? 'outline' : 'default'}
                  >
                    {test.status === 'completed' ? 'Refaire le test' : 'Commencer le test'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Test Taking View
  const progress = ((currentQuestion + 1) / testQuestions.length) * 100;
  const question = testQuestions[currentQuestion];

  if (showResults) {
    const correctAnswers = Object.entries(answers).filter(
      ([qIndex, answer]) => parseInt(answer) === testQuestions[parseInt(qIndex)].correct
    ).length;
    const score = Math.round((correctAnswers / testQuestions.length) * 100);

    return (
      <DashboardLayout>
        <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                {score >= 80 ? (
                  <CheckCircle2 className="h-20 w-20 text-success" />
                ) : score >= 60 ? (
                  <AlertCircle className="h-20 w-20 text-warning" />
                ) : (
                  <XCircle className="h-20 w-20 text-destructive" />
                )}
              </div>
              <CardTitle className="text-3xl">Test terminé !</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div>
                <div className="text-6xl font-bold gradient-primary bg-clip-text text-transparent">
                  {score}%
                </div>
                <p className="text-muted-foreground mt-2">
                  {correctAnswers} / {testQuestions.length} réponses correctes
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3 text-left">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Réponses correctes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-success">{correctAnswers}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Réponses incorrectes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-destructive">
                      {testQuestions.length - correctAnswers}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Taux de réussite
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{score}%</div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={handleBackToTests} variant="outline">
                  Retour aux tests
                </Button>
                <Button onClick={() => handleStartTest(selectedTest)}>
                  Refaire le test
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
        {/* Progress Header */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{availableTests[selectedTest].title}</h2>
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} sur {testQuestions.length}
                </p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span className="text-lg font-medium">25:00</span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestion]}
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 border rounded-lg p-4 transition-all cursor-pointer hover:bg-muted/50 ${
                    answers[currentQuestion] === String(index) ? 'border-primary bg-primary/5' : ''
                  }`}
                >
                  <RadioGroupItem value={String(index)} id={`option-${index}`} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer text-base"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={currentQuestion === 0}
            >
              Précédent
            </Button>
            <div className="flex gap-2">
              <Button onClick={handleBackToTests} variant="outline">
                Quitter
              </Button>
              {currentQuestion === testQuestions.length - 1 ? (
                <Button onClick={handleSubmit}>
                  Soumettre le test
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  Suivant
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>

        {/* Question Navigator */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {testQuestions.map((_, index) => (
                <Button
                  key={index}
                  variant={currentQuestion === index ? 'default' : answers[index] !== undefined ? 'secondary' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentQuestion(index)}
                  className="w-10 h-10"
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Tests;
