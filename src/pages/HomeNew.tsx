import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Zap,
  Target,
  CheckCircle,
  ArrowRight,
  Star,
  Play,
  MessageSquare,
  BarChart3,
  Shield,
  Clock,
  Sparkles,
} from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate(`/${user.role}/dashboard`);
    }
  }, [user, navigate]);

  const features = [
    {
      icon: Brain,
      title: "IA Personnalisée",
      description: "Chatbot intelligent qui s'adapte au niveau de chaque étudiant",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: BookOpen,
      title: "Exercices Adaptatifs",
      description: "Contenu qui évolue selon les performances et besoins",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: BarChart3,
      title: "Suivi en Temps Réel",
      description: "Analytics détaillées pour professeurs et étudiants",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Award,
      title: "Gamification",
      description: "Badges, récompenses et défis pour motiver l'apprentissage",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const roles = [
    {
      title: "Étudiants",
      description: "Apprenez à votre rythme avec l'aide de l'IA",
      icon: Users,
      features: ["Chatbot personnalisé", "Exercices adaptatifs", "Suivi des progrès", "Badges et récompenses"],
      color: "from-blue-600 to-purple-600",
    },
    {
      title: "Professeurs",
      description: "Gérez vos cours et suivez vos étudiants efficacement",
      icon: Target,
      features: ["Dashboard analytique", "Gestion des cours", "Suivi individuel", "Création de contenu"],
      color: "from-green-600 to-blue-600",
    },
  ];

  const testimonials = [
    {
      name: "Dr. Marie Dupont",
      role: "Professeure de Mathématiques",
      content: "Cette plateforme a révolutionné ma façon d'enseigner. Le suivi en temps réel me permet d'identifier rapidement les difficultés de chaque étudiant.",
      rating: 5,
    },
    {
      name: "Thomas Laurent",
      role: "Étudiant en 2ème année",
      content: "Le chatbot IA m'aide énormément quand je bloque sur un exercice. C'est comme avoir un tuteur personnel 24h/24 !",
      rating: 5,
    },
    {
      name: "Prof. Jean Martin",
      role: "Directeur Pédagogique",
      content: "Les analytics nous donnent une vision claire des performances. Nous avons augmenté le taux de réussite de 23% cette année.",
      rating: 5,
    },
  ];

  const stats = [
    { value: "10,000+", label: "Étudiants actifs" },
    { value: "500+", label: "Professeurs" },
    { value: "95%", label: "Taux de satisfaction" },
    { value: "50,000+", label: "Exercices résolus" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-white/20"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduMath AI
            </span>
          </motion.div>
          <Button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Se connecter
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200">
              <Sparkles className="w-4 h-4 mr-2" />
              Nouveau : IA avancée intégrée
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Révolutionnez
              <br />
              <span className="text-slate-800">l'Apprentissage</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Plateforme éducative alimentée par l'IA qui personnalise l'apprentissage des mathématiques 
              pour chaque étudiant et offre aux professeurs des outils d'analyse avancés.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6"
              >
                <Play className="w-5 h-5 mr-2" />
                Commencer maintenant
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-slate-300 hover:bg-slate-50"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Voir la démo
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-100 text-purple-700">
              <Zap className="w-4 h-4 mr-2" />
              Fonctionnalités avancées
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Technologie de pointe pour
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                l'éducation moderne
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Découvrez comment notre plateforme utilise l'intelligence artificielle pour créer une expérience d'apprentissage unique et personnalisée.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-purple-200">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Conçu pour tous les acteurs
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                de l'éducation
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {roles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${role.color}`} />
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${role.color} flex items-center justify-center`}>
                        <role.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{role.title}</CardTitle>
                        <CardDescription className="text-base">{role.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {role.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className={`w-full mt-6 bg-gradient-to-r ${role.color} hover:opacity-90`}
                      onClick={() => navigate("/login")}
                    >
                      Commencer en tant que {role.title.slice(0, -1)}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Ce que disent nos utilisateurs
            </h2>
            <p className="text-xl text-slate-600">
              Découvrez comment EduMath AI transforme l'expérience éducative
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-700 mb-6 italic">"{testimonial.content}"</p>
                    <div>
                      <div className="font-semibold text-slate-800">{testimonial.name}</div>
                      <div className="text-slate-600 text-sm">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à transformer votre
              <br />
              expérience éducative ?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Rejoignez des milliers d'étudiants et professeurs qui utilisent déjà EduMath AI pour révolutionner l'apprentissage des mathématiques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/login")}
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
              >
                <Play className="w-5 h-5 mr-2" />
                Commencer gratuitement
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Planifier une démo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-900 text-slate-300">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">EduMath AI</span>
              </div>
              <p className="text-slate-400">
                Révolutionnez l'apprentissage des mathématiques avec notre plateforme alimentée par l'IA.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Plateforme</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sécurité</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Entreprise</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carrières</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 EduMath AI. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
