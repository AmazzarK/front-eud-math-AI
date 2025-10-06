import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, TrendingUp, ClipboardCheck, Award, Clock, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfessorDashboard = () => {
  const stats = [
    {
      title: 'Étudiants actifs',
      value: '234',
      change: '+12%',
      icon: Users,
      color: 'text-primary',
      trend: 'up',
    },
    {
      title: 'Cours publiés',
      value: '18',
      change: '+3 ce mois',
      icon: BookOpen,
      color: 'text-success',
      trend: 'up',
    },
    {
      title: 'Taux de réussite',
      value: '87%',
      change: '+5%',
      icon: TrendingUp,
      color: 'text-secondary',
      trend: 'up',
    },
    {
      title: 'Devoirs en attente',
      value: '42',
      change: '-8 cette semaine',
      icon: ClipboardCheck,
      color: 'text-accent',
      trend: 'down',
    },
  ];

  const topStudents = [
    { name: 'Sophie Martin', score: 95, progress: 100 },
    { name: 'Lucas Dubois', score: 92, progress: 95 },
    { name: 'Emma Bernard', score: 89, progress: 88 },
    { name: 'Thomas Petit', score: 87, progress: 92 },
  ];

  const recentActivity = [
    { name: 'Sophie Martin', action: 'a terminé le Quiz 3', time: 'Il y a 2h', type: 'success' },
    { name: 'Lucas Dubois', action: 'a soumis le Devoir 5', time: 'Il y a 3h', type: 'info' },
    { name: 'Emma Bernard', action: 'a posé une question', time: 'Il y a 5h', type: 'question' },
    { name: 'Thomas Petit', action: 'a terminé le Module 2', time: 'Il y a 6h', type: 'success' },
  ];

  const upcomingEvents = [
    { title: 'Correction Devoir 4', date: 'Demain, 14:00', class: 'Classe A', urgent: true },
    { title: 'Examen Final', date: '15 Jan, 10:00', class: 'Classe B', urgent: false },
    { title: 'Réunion Parents', date: '18 Jan, 16:00', class: 'Toutes classes', urgent: false },
    { title: 'Publication Notes', date: '20 Jan, 09:00', class: 'Classe A', urgent: false },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Tableau de bord</h1>
            <p className="text-muted-foreground mt-2">
              Bienvenue sur votre espace professeur
            </p>
          </div>
          <Button className="shadow-lg hover:shadow-xl transition-all">
            <BookOpen className="mr-2 h-4 w-4" />
            Nouveau cours
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={stat.trend === 'up' ? 'default' : 'secondary'} className="text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Students */}
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Meilleurs étudiants
                  </CardTitle>
                  <CardDescription>
                    Performances exceptionnelles ce mois
                  </CardDescription>
                </div>
                <Link to="/prof/students">
                  <Button variant="ghost" size="sm">Voir tout</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topStudents.map((student, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                          index === 0 ? 'bg-gradient-to-br from-accent to-warning text-white' :
                          index === 1 ? 'bg-gradient-to-br from-muted to-muted/50 text-foreground' :
                          index === 2 ? 'bg-gradient-to-br from-warning/30 to-warning/10 text-warning' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {index + 1}
                        </div>
                        <span className="font-medium">{student.name}</span>
                      </div>
                      <Badge variant="outline">{student.score}%</Badge>
                    </div>
                    <Progress value={student.progress} className="h-1.5" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Activité récente
                  </CardTitle>
                  <CardDescription>
                    Dernières actions dans vos classes
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <div className={`p-2 rounded-lg mt-1 ${
                      activity.type === 'success' ? 'bg-success/10 text-success' :
                      activity.type === 'question' ? 'bg-warning/10 text-warning' :
                      'bg-primary/10 text-primary'
                    }`}>
                      <Target className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.name}</span>{' '}
                        <span className="text-muted-foreground">{activity.action}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="lg:col-span-2 hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                Prochaines échéances
              </CardTitle>
              <CardDescription>
                Vos événements à venir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                      event.urgent ? 'border-destructive/50 bg-destructive/5' : 'border-border bg-card'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{event.title}</p>
                          {event.urgent && <Badge variant="destructive" className="text-xs">Urgent</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{event.class}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{event.date}</span>
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

export default ProfessorDashboard;
