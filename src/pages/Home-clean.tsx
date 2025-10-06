import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  BookOpen, 
  Users, 
  ChevronRight, 
  Star, 
  GraduationCap,
  TrendingUp,
  Clock,
  Award,
  Zap,
  Target,
  Sparkles
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: Brain,
      title: "IA Personnalisée",
      description: "Assistant intelligent qui s'adapte à votre style d'apprentissage pour un soutien optimal.",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: BookOpen,
      title: "Cours Interactifs",
      description: "Contenu mathématique interactif avec des explications étape par étape et des exemples pratiques.",
      gradient: "from-green-500 to-teal-600"
    },
    {
      icon: TrendingUp,
      title: "Suivi des Progrès",
      description: "Analyse détaillée de vos performances avec des recommandations personnalisées.",
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Travaillez en équipe, partagez vos solutions et apprenez ensemble.",
      gradient: "from-pink-500 to-rose-600"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Étudiants actifs", icon: Users },
    { value: "500+", label: "Professeurs", icon: GraduationCap },
    { value: "95%", label: "Taux de réussite", icon: Award },
    { value: "24/7", label: "Support IA", icon: Clock }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Étudiante en Terminale",
      content: "EduMath AI a transformé ma façon d'apprendre les mathématiques. L'IA m'aide à comprendre les concepts difficiles de manière intuitive.",
      rating: 5
    },
    {
      name: "Prof. Laurent Martin",
      role: "Professeur de Mathématiques",
      content: "Un outil révolutionnaire pour l'enseignement. Mes étudiants sont plus engagés et leurs résultats se sont considérablement améliorés.",
      rating: 5
    },
    {
      name: "Ahmed Hassan",
      role: "Étudiant en Prépa",
      content: "L'assistant IA disponible 24h/24 est parfait pour mes révisions nocturnes. Je peux obtenir de l'aide instantanément.",
      rating: 5
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="content-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in">
              <Badge variant="outline" className="mb-6 px-4 py-2 text-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                Nouvelle génération d'apprentissage
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
                L'avenir de l'apprentissage des mathématiques
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Découvrez une nouvelle façon d'apprendre les mathématiques avec notre IA avancée. 
                Personnalisé, interactif et toujours disponible pour vous accompagner.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  className="btn-gradient text-lg px-8 py-3 group"
                  onClick={() => navigate('/login')}
                >
                  Commencer maintenant
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-3"
                  onClick={() => navigate('/demo')}
                >
                  Voir la démo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-spacing bg-muted/30">
        <div className="content-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={stat.label}
                  className="text-center p-6 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing">
        <div className="content-container">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pourquoi choisir EduMath AI ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une plateforme complète qui révolutionne l'apprentissage des mathématiques grâce à l'intelligence artificielle
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={feature.title}
                  className="group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="card-hover h-full">
                    <CardHeader>
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-spacing bg-muted/30">
        <div className="content-container">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ce que disent nos utilisateurs
            </h2>
            <p className="text-xl text-muted-foreground">
              Découvrez comment EduMath AI transforme l'apprentissage des mathématiques
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.name}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="card-hover h-full">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing">
        <div className="content-container">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Card className="card-hover bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="p-12">
                <Zap className="h-12 w-12 mx-auto mb-6 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Prêt à révolutionner votre apprentissage ?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Rejoignez des milliers d'étudiants et professeurs qui utilisent déjà EduMath AI 
                  pour transformer leur relation aux mathématiques.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="btn-gradient text-lg px-8 py-3 group"
                    onClick={() => navigate('/login')}
                  >
                    <Target className="mr-2 h-5 w-5" />
                    Commencer gratuitement
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="text-lg px-8 py-3"
                  >
                    Contacter l'équipe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
