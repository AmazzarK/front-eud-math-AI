import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Target, Zap, Award, TrendingUp, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const stats = [
    {
      label: 'Exercices complétés',
      value: '47',
      total: '65',
      icon: Target,
      color: 'text-primary',
      progress: 72,
    },
    {
      label: 'Tests réussis',
      value: '12',
      total: '15',
      icon: BookOpen,
      color: 'text-success',
      progress: 80,
    },
    {
      label: 'Badges obtenus',
      value: '8',
      total: '12',
      icon: Award,
      color: 'text-secondary',
      progress: 67,
    },
    {
      label: 'Niveau actuel',
      value: '12',
      change: '+2 ce mois',
      icon: TrendingUp,
      color: 'text-accent',
    },
  ];

  const recentBadges = [
    { title: 'Marathonien', icon: Zap, rarity: 'rare', date: '20 Déc' },
    { title: 'Perfectionniste', icon: Target, rarity: 'epic', date: '28 Déc' },
    { title: 'Explorateur', icon: BookOpen, rarity: 'common', date: '10 Jan' },
  ];

  const recommendedExercises = [
    { title: 'Programmation Orientée Objet', difficulty: 'Moyen', duration: '1h', category: 'JavaScript' },
    { title: 'Algorithmes de Tri', difficulty: 'Difficile', duration: '1h 30min', category: 'Algorithmes' },
    { title: 'React Hooks Essentiels', difficulty: 'Moyen', duration: '1h', category: 'React' },
  ];

  const upcomingTests = [
    { title: 'JavaScript Fondamentaux', date: 'Demain, 14:00', questions: 15 },
    { title: 'React Avancé', date: '15 Jan, 10:00', questions: 20 },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-muted to-muted/50';
      case 'rare': return 'from-primary/20 to-primary/5 border-primary/30';
      case 'epic': return 'from-secondary/20 to-secondary/5 border-secondary/30';
      default: return 'from-muted to-muted/50';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground mt-2">Bienvenue ! Continuez votre parcours d'apprentissage</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-3xl font-bold">
                    {stat.value}
                    {stat.total && <span className="text-muted-foreground text-lg">/{stat.total}</span>}
                  </div>
                  {stat.progress !== undefined ? (
                    <Progress value={stat.progress} className="h-2" />
                  ) : (
                    <Badge variant="outline" className="text-xs">{stat.change}</Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Badges récents
                </CardTitle>
                <Link to="/student/achievements">
                  <Button variant="ghost" size="sm">Voir tout<ArrowRight className="ml-2 h-4 w-4" /></Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {recentBadges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <div key={index} className={`p-4 rounded-xl bg-gradient-to-br ${getRarityColor(badge.rarity)} border-2 transition-all hover:scale-105`}>
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-glow">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{badge.title}</p>
                          <p className="text-sm text-muted-foreground">{badge.date}</p>
                        </div>
                        <Badge variant="outline" className="capitalize">{badge.rarity}</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Exercices recommandés
                </CardTitle>
                <Link to="/student/exercises">
                  <Button variant="ghost" size="sm">Voir tout<ArrowRight className="ml-2 h-4 w-4" /></Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendedExercises.map((exercise, index) => (
                  <div key={index} className="p-4 rounded-lg border hover:border-primary/50 transition-all hover:shadow-md group">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium group-hover:text-primary transition-colors">{exercise.title}</p>
                        <Badge variant="outline" className="text-xs shrink-0">{exercise.category}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className={`font-medium ${exercise.difficulty === 'Facile' ? 'text-success' : exercise.difficulty === 'Moyen' ? 'text-warning' : 'text-destructive'}`}>{exercise.difficulty}</span>
                        <div className="flex items-center gap-1"><Clock className="h-3 w-3" /><span>{exercise.duration}</span></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Tests à venir
                </CardTitle>
                <Link to="/student/tests">
                  <Button variant="ghost" size="sm">Voir tout<ArrowRight className="ml-2 h-4 w-4" /></Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {upcomingTests.map((test, index) => (
                  <div key={index} className="p-5 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 hover:shadow-md transition-all">
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-lg">{test.title}</p>
                        <p className="text-sm text-muted-foreground">{test.questions} questions</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" /><span>{test.date}</span>
                        </div>
                        <Link to="/student/tests"><Button size="sm">Commencer</Button></Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
