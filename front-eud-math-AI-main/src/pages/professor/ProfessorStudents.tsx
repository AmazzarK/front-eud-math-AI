import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Users,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Award,
  Clock,
  BookOpen,
  MessageSquare,
  Star,
  AlertCircle,
  CheckCircle,
  Target,
  Calendar,
  BarChart3,
  Eye,
  FileText,
  Plus,
} from "lucide-react";
import { useState } from "react";

const ProfessorStudents = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);

  const students = [
    {
      id: 1,
      name: "Sophie Martin",
      email: "sophie.martin@email.com",
      avatar: "/api/placeholder/40/40",
      course: "Algèbre Linéaire",
      progress: 92,
      score: 95,
      exercisesCompleted: 45,
      lastActivity: "Il y a 2h",
      status: "excellent",
      badges: ["🏆", "🎯", "⭐"],
      streak: 15,
      timeSpent: "24h 30m",
      weakAreas: ["Transformations linéaires"],
      strongAreas: ["Espaces vectoriels", "Matrices"],
      notes: "Excellente étudiante, très motivée. Besoin d'aide sur les transformations complexes.",
    },
    {
      id: 2,
      name: "Lucas Dubois",
      email: "lucas.dubois@email.com",
      avatar: "/api/placeholder/40/40",
      course: "Calcul Différentiel",
      progress: 78,
      score: 82,
      exercisesCompleted: 38,
      lastActivity: "Il y a 5h",
      status: "good",
      badges: ["🎯", "⭐"],
      streak: 8,
      timeSpent: "18h 45m",
      weakAreas: ["Optimisation", "Dérivées partielles"],
      strongAreas: ["Limites", "Dérivées simples"],
      notes: "Progresse bien mais a besoin d'aide sur l'optimisation.",
    },
    {
      id: 3,
      name: "Emma Bernard",
      email: "emma.bernard@email.com",
      avatar: "/api/placeholder/40/40",
      course: "Statistiques",
      progress: 65,
      score: 78,
      exercisesCompleted: 32,
      lastActivity: "Il y a 1j",
      status: "needs-attention",
      badges: ["⭐"],
      streak: 3,
      timeSpent: "15h 20m",
      weakAreas: ["Tests d'hypothèses", "Régression"],
      strongAreas: ["Statistiques descriptives"],
      notes: "Ralentissement récent, contacter pour soutien supplémentaire.",
    },
    {
      id: 4,
      name: "Thomas Petit",
      email: "thomas.petit@email.com",
      avatar: "/api/placeholder/40/40",
      course: "Géométrie",
      progress: 88,
      score: 87,
      exercisesCompleted: 42,
      lastActivity: "Il y a 30m",
      status: "excellent",
      badges: ["🏆", "🎯"],
      streak: 12,
      timeSpent: "22h 15m",
      weakAreas: [],
      strongAreas: ["Géométrie analytique", "Transformations"],
      notes: "Très bon niveau, peut aider d'autres étudiants.",
    },
  ];

  const overallStats = [
    { label: "Total étudiants", value: "156", change: "+8", icon: Users },
    { label: "Score moyen", value: "85.5", change: "+2.3", icon: Star },
    { label: "Taux de complétion", value: "78%", change: "+5%", icon: CheckCircle },
    { label: "Temps moyen/semaine", value: "4h 30m", change: "+45m", icon: Clock },
  ];

  const getStatusConfig = (status: string) => {
    const configs = {
      excellent: { 
        badge: { variant: "default" as const, className: "bg-green-100 text-green-800" },
        label: "Excellent",
        icon: TrendingUp,
        color: "text-green-600"
      },
      good: { 
        badge: { variant: "secondary" as const, className: "bg-blue-100 text-blue-800" },
        label: "Bon",
        icon: TrendingUp,
        color: "text-blue-600"
      },
      "needs-attention": { 
        badge: { variant: "destructive" as const, className: "bg-orange-100 text-orange-800" },
        label: "Attention requise",
        icon: AlertCircle,
        color: "text-orange-600"
      },
    };
    return configs[status as keyof typeof configs] || configs.good;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Suivi des Étudiants</h1>
            <p className="text-slate-600 mt-1">Analysez les performances et progressions individuelles</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtrer
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Rechercher un étudiant..."
            className="pl-10"
          />
        </motion.div>

        {/* Overall Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {overallStats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                          {stat.change}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Students Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {students.map((student, index) => {
            const statusConfig = getStatusConfig(student.status);
            return (
              <motion.div key={student.id} variants={itemVariants} whileHover={{ y: -5 }}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                            {student.name}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {student.course}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge {...statusConfig.badge}>
                        {statusConfig.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progression du cours</span>
                        <span className="font-medium">{student.progress}%</span>
                      </div>
                      <Progress value={student.progress} className="h-2" />
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-lg font-bold text-slate-800">{student.score}</div>
                        <div className="text-xs text-slate-600">Score moyen</div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-lg font-bold text-slate-800">{student.exercisesCompleted}</div>
                        <div className="text-xs text-slate-600">Exercices</div>
                      </div>
                    </div>

                    {/* Badges and Streak */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        {student.badges.map((badge, i) => (
                          <span key={i} className="text-lg">{badge}</span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-slate-600">
                        <Target className="w-4 h-4" />
                        <span>{student.streak} jours</span>
                      </div>
                    </div>

                    {/* Last Activity */}
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span>Dernière activité : {student.lastActivity}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="w-4 h-4 mr-1" />
                            Détails
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle className="flex items-center space-x-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={student.avatar} />
                                <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div>{student.name}</div>
                                <div className="text-sm text-slate-600">{student.email}</div>
                              </div>
                            </DialogTitle>
                          </DialogHeader>
                          
                          <div className="grid gap-6 py-4">
                            {/* Performance Overview */}
                            <div className="grid grid-cols-3 gap-4">
                              <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">{student.progress}%</div>
                                <div className="text-sm text-slate-600">Progression</div>
                              </div>
                              <div className="text-center p-4 bg-green-50 rounded-lg">
                                <div className="text-2xl font-bold text-green-600">{student.score}</div>
                                <div className="text-sm text-slate-600">Score moyen</div>
                              </div>
                              <div className="text-center p-4 bg-purple-50 rounded-lg">
                                <div className="text-2xl font-bold text-purple-600">{student.timeSpent}</div>
                                <div className="text-sm text-slate-600">Temps total</div>
                              </div>
                            </div>

                            {/* Strengths and Weaknesses */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Points forts
                                </h4>
                                <div className="space-y-1">
                                  {student.strongAreas.map((area, i) => (
                                    <Badge key={i} variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                      {area}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold text-orange-700 mb-2 flex items-center">
                                  <AlertCircle className="w-4 h-4 mr-2" />
                                  À améliorer
                                </h4>
                                <div className="space-y-1">
                                  {student.weakAreas.map((area, i) => (
                                    <Badge key={i} variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
                                      {area}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Notes */}
                            <div>
                              <h4 className="font-semibold mb-2">Notes du professeur</h4>
                              <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                                {student.notes}
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Ajouter une note</DialogTitle>
                            <DialogDescription>
                              Ajouter une note ou intervention pour {student.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="note-type">Type d'intervention</Label>
                              <select className="w-full p-2 border rounded-md">
                                <option>Soutien académique</option>
                                <option>Encouragement</option>
                                <option>Alerte performance</option>
                                <option>Recommandation</option>
                              </select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="note">Note</Label>
                              <Textarea 
                                id="note" 
                                placeholder="Décrivez votre observation ou intervention..."
                                rows={4}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsNoteDialogOpen(false)}>
                              Annuler
                            </Button>
                            <Button onClick={() => setIsNoteDialogOpen(false)}>
                              Enregistrer
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Actions rapides</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Créer une intervention
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Rapport de classe
                </Button>
                <Button variant="outline" className="justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message groupé
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ProfessorStudents;
