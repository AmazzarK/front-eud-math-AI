import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { PageHeader } from '@/components/PageHeader';
import { BadgeCard } from '@/components/BadgeCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Trophy, Star, Target, Zap, BookOpen, Brain, Rocket } from 'lucide-react';

const Achievements = () => {
  const badges = [
    {
      title: 'Premier Pas',
      description: 'Complétez votre premier exercice',
      icon: Star,
      earned: true,
      date: '15 Déc 2024',
      rarity: 'common' as const,
    },
    {
      title: 'Marathonien',
      description: 'Complétez 10 exercices en une semaine',
      icon: Zap,
      earned: true,
      date: '20 Déc 2024',
      rarity: 'rare' as const,
    },
    {
      title: 'Perfectionniste',
      description: 'Obtenez 100% à 5 tests consécutifs',
      icon: Target,
      earned: true,
      date: '28 Déc 2024',
      rarity: 'epic' as const,
    },
    {
      title: 'Génie',
      description: 'Terminez tous les modules avec excellence',
      icon: Brain,
      earned: false,
      rarity: 'legendary' as const,
    },
    {
      title: 'Explorateur',
      description: 'Consultez 50 ressources pédagogiques',
      icon: BookOpen,
      earned: true,
      date: '10 Jan 2025',
      rarity: 'common' as const,
    },
    {
      title: 'Fusée',
      description: 'Progressez de 3 niveaux en un mois',
      icon: Rocket,
      earned: false,
      rarity: 'rare' as const,
    },
  ];

  const earnedBadges = badges.filter(b => b.earned);
  const totalBadges = badges.length;
  const progressPercentage = (earnedBadges.length / totalBadges) * 100;

  const stats = [
    { label: 'Badges obtenus', value: earnedBadges.length, total: totalBadges },
    { label: 'Points totaux', value: '1,250' },
    { label: 'Niveau actuel', value: '12' },
    { label: 'Classement', value: '#23', description: 'sur 234 étudiants' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <PageHeader
          title="Badges et Récompenses"
          description="Suivez vos accomplissements et débloquez de nouveaux badges"
          icon={Award}
        />

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:scale-105">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="text-3xl font-bold">
                    {stat.value}
                    {stat.total && <span className="text-muted-foreground text-lg">/{stat.total}</span>}
                  </div>
                  {stat.description && (
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Overview */}
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Progression Globale
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Badges collectés</span>
              <span className="font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-sm text-muted-foreground">
              Plus que {totalBadges - earnedBadges.length} badges à débloquer !
            </p>
          </CardContent>
        </Card>

        {/* Badges Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="earned">Obtenus</TabsTrigger>
            <TabsTrigger value="locked">Verrouillés</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {badges.map((badge, index) => (
                <BadgeCard key={index} {...badge} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="earned" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {earnedBadges.map((badge, index) => (
                <BadgeCard key={index} {...badge} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="locked" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {badges.filter(b => !b.earned).map((badge, index) => (
                <BadgeCard key={index} {...badge} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Achievements;
