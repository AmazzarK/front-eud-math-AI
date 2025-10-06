import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from '@/hooks/useForm';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, GraduationCap, Users, BookOpen, Brain, ChevronRight } from 'lucide-react';

type UserRole = 'student' | 'professor';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validate: (values) => {
      const errors: { [key: string]: string } = {};
      
      // Email validation
      if (!values.email) {
        errors.email = 'L\'email est requis';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Format d\'email invalide';
      }
      
      // Password validation
      if (!values.password) {
        errors.password = 'Le mot de passe est requis';
      } else if (values.password.length < 6) {
        errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
      }
      
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password, selectedRole);
        navigate(selectedRole === 'professor' ? '/prof/dashboard' : '/student/dashboard');
      } catch (error) {
        throw new Error('Erreur de connexion. Veuillez réessayer.');
      }
    }
  });

  const features = {
    student: [
      { icon: Brain, title: "Assistant IA personnalisé", desc: "Aide aux devoirs 24/7" },
      { icon: BookOpen, title: "Cours interactifs", desc: "Apprentissage adaptatif" },
      { icon: GraduationCap, title: "Suivi des progrès", desc: "Tableaux de bord détaillés" }
    ],
    professor: [
      { icon: Users, title: "Gestion des étudiants", desc: "Suivi individualisé" },
      { icon: BookOpen, title: "Création de cours", desc: "Outils de publication" },
      { icon: Brain, title: "Analytiques avancées", desc: "Insights sur les performances" }
    ]
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-8">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                Bienvenue sur EduMath AI
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Rejoignez la révolution de l'apprentissage des mathématiques avec l'intelligence artificielle
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left side - Features */}
              <div className="space-y-8 animate-slide-in-left">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-foreground">
                    {selectedRole === 'student' ? 'Pour les Étudiants' : 'Pour les Professeurs'}
                  </h2>
                  
                  <div className="grid gap-4">
                    {features[selectedRole].map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div
                          key={feature.title}
                          className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50 hover:shadow-md transition-all duration-200 animate-fade-in"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-foreground mb-1">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Brain className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold">Intelligence Artificielle Avancée</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Notre IA s'adapte à votre style d'apprentissage pour une expérience personnalisée et efficace.
                  </p>
                  <Button variant="outline" className="group">
                    En savoir plus
                    <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>

              {/* Right side - Login Form */}
              <div className="animate-slide-in-right">
                <Card className="card-hover">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
                    <CardDescription>
                      Choisissez votre profil et connectez-vous
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {form.submitError && (
                      <Alert variant="destructive" className="mb-4">
                        <AlertDescription>{form.submitError}</AlertDescription>
                      </Alert>
                    )}
                    
                    <Tabs value={selectedRole} onValueChange={(v) => setSelectedRole(v as UserRole)}>
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="student" className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          Étudiant
                        </TabsTrigger>
                        <TabsTrigger value="professor" className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Professeur
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="student">
                        <form onSubmit={form.handleSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="student-email">Adresse e-mail</Label>
                            <Input
                              id="student-email"
                              name="email"
                              type="email"
                              placeholder="votre@email.com"
                              {...form.getFieldProps('email')}
                              className={form.state.email?.error && form.state.email?.touched ? 'border-destructive' : ''}
                            />
                            {form.state.email?.error && form.state.email?.touched && (
                              <p className="text-sm text-destructive">{form.state.email.error}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="student-password">Mot de passe</Label>
                            <Input
                              id="student-password"
                              name="password"
                              type="password"
                              {...form.getFieldProps('password')}
                              className={form.state.password?.error && form.state.password?.touched ? 'border-destructive' : ''}
                            />
                            {form.state.password?.error && form.state.password?.touched && (
                              <p className="text-sm text-destructive">{form.state.password.error}</p>
                            )}
                          </div>

                          <Button 
                            type="submit" 
                            className="w-full btn-gradient" 
                            disabled={!form.isValid || isLoading}
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Connexion...
                              </>
                            ) : (
                              'Se connecter comme étudiant'
                            )}
                          </Button>
                        </form>
                      </TabsContent>

                      <TabsContent value="professor">
                        <form onSubmit={form.handleSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="prof-email">Adresse e-mail</Label>
                            <Input
                              id="prof-email"
                              name="email"
                              type="email"
                              placeholder="votre@email.com"
                              {...form.getFieldProps('email')}
                              className={form.state.email?.error && form.state.email?.touched ? 'border-destructive' : ''}
                            />
                            {form.state.email?.error && form.state.email?.touched && (
                              <p className="text-sm text-destructive">{form.state.email.error}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="prof-password">Mot de passe</Label>
                            <Input
                              id="prof-password"
                              name="password"
                              type="password"
                              {...form.getFieldProps('password')}
                              className={form.state.password?.error && form.state.password?.touched ? 'border-destructive' : ''}
                            />
                            {form.state.password?.error && form.state.password?.touched && (
                              <p className="text-sm text-destructive">{form.state.password.error}</p>
                            )}
                          </div>

                          <Button 
                            type="submit" 
                            className="w-full btn-gradient" 
                            disabled={!form.isValid || isLoading}
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Connexion...
                              </>
                            ) : (
                              'Se connecter comme professeur'
                            )}
                          </Button>
                        </form>
                      </TabsContent>
                    </Tabs>

                    <div className="mt-6 pt-6 border-t border-border/50">
                      <p className="text-center text-sm text-muted-foreground">
                        Pas encore de compte ?{' '}
                        <Link to="/register" className="text-primary hover:underline font-medium">
                          S'inscrire
                        </Link>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
