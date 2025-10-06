import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Mail, Calendar, Trophy, Target, TrendingUp, Edit2, Save } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: 'Profil mis à jour',
      description: 'Vos informations ont été enregistrées avec succès.',
    });
  };

  const stats = [
    {
      label: 'Exercices complétés',
      value: '47',
      icon: Target,
      color: 'text-primary',
    },
    {
      label: 'Tests réussis',
      value: '12',
      icon: Trophy,
      color: 'text-success',
    },
    {
      label: 'Heures d\'apprentissage',
      value: '87h',
      icon: TrendingUp,
      color: 'text-secondary',
    },
  ];

  const recentActivity = [
    { action: 'Test JavaScript Fondamentaux', result: '92%', date: '2 Jan 2025' },
    { action: 'Exercice React Hooks', result: 'Complété', date: '30 Déc 2024' },
    { action: 'Test Algorithmes', result: '85%', date: '28 Déc 2024' },
    { action: 'Exercice CSS Grid', result: 'Complété', date: '25 Déc 2024' },
  ];

  const skills = [
    { name: 'JavaScript', level: 85 },
    { name: 'React', level: 75 },
    { name: 'CSS/Tailwind', level: 90 },
    { name: 'TypeScript', level: 70 },
    { name: 'Algorithmes', level: 65 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <PageHeader
          title="Mon Profil"
          description="Gérez vos informations et suivez votre progression"
          icon={User}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>Informations</CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? <Save className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="text-2xl">
                    {user?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Badge variant="outline" className="mb-2">Étudiant</Badge>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Nom complet
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Membre depuis
                  </Label>
                  <p className="text-sm text-muted-foreground">Septembre 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats and Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:scale-105">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          {stat.label}
                        </CardTitle>
                        <Icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{stat.value}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="skills" className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="skills">Compétences</TabsTrigger>
                <TabsTrigger value="activity">Activité récente</TabsTrigger>
              </TabsList>

              <TabsContent value="skills" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Niveaux de compétence</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {skills.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Activité récente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-3 border-b last:border-0"
                        >
                          <div className="space-y-1">
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-sm text-muted-foreground">{activity.date}</p>
                          </div>
                          <Badge variant="outline">{activity.result}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
