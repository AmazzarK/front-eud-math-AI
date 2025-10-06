import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, BookOpen, Award } from 'lucide-react';
import { useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate(`/${user.role}/dashboard`);
    }
  }, [user, navigate]);

  return (
    <MainLayout>
      <section className="gradient-hero py-20 px-4">
        <div className="container mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Plateforme Éducative Moderne
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Une solution complète pour l'enseignement et l'apprentissage
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate('/login')}
            className="text-lg px-8 py-6"
          >
            Se connecter
          </Button>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Une plateforme pour tous
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/login')}>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Espace Professeur</CardTitle>
                <CardDescription>
                  Gérez vos classes, suivez les progrès et créez du contenu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Tableau de bord statistiques</li>
                  <li>• Gestion des étudiants</li>
                  <li>• Création de contenus</li>
                  <li>• Suivi des performances</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/login')}>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-success" />
                </div>
                <CardTitle>Espace Étudiant</CardTitle>
                <CardDescription>
                  Apprenez à votre rythme avec des exercices interactifs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Exercices personnalisés</li>
                  <li>• Tests et évaluations</li>
                  <li>• Assistant IA (EduBot)</li>
                  <li>• Badges et récompenses</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Fonctionnalités clés
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Contenus riches</h3>
              <p className="text-muted-foreground">
                Cours multimédias et exercices interactifs
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gamification</h3>
              <p className="text-muted-foreground">
                Badges, points et récompenses pour motiver
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Suivi personnalisé</h3>
              <p className="text-muted-foreground">
                Analyses détaillées des performances
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
