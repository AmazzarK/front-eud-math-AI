import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Calendar,
  Filter,
  Search,
  Send,
  BookOpen,
  Target,
  TrendingDown,
  Heart,
  Lightbulb,
  Flag,
} from "lucide-react";
import { useState } from "react";

const ProfessorInterventions = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedIntervention, setSelectedIntervention] = useState(null);

  const interventions = [
    {
      id: 1,
      student: {
        name: "Emma Bernard",
        avatar: "/api/placeholder/40/40",
        course: "Statistiques Appliquées",
      },
      type: "academic_support",
      priority: "high",
      status: "pending",
      title: "Difficultés en régression linéaire",
      description: "L'étudiante montre des difficultés persistantes avec les concepts de régression linéaire. Scores en baisse depuis 3 semaines.",
      createdAt: "2025-01-03",
      dueDate: "2025-01-10",
      actions: [
        "Séance de tutorat individuel programmée",
        "Ressources supplémentaires partagées",
      ],
      tags: ["urgence", "mathématiques", "régression"],
    },
    {
      id: 2,
      student: {
        name: "Lucas Dubois",
        avatar: "/api/placeholder/40/40",
        course: "Calcul Différentiel",
      },
      type: "motivation",
      priority: "medium",
      status: "in_progress",
      title: "Baisse de motivation observée",
      description: "Diminution notable de l'engagement et de la fréquence de connexion. Pas de soumission d'exercices depuis 5 jours.",
      createdAt: "2025-01-01",
      dueDate: "2025-01-08",
      actions: [
        "Message d'encouragement envoyé",
        "Entretien téléphonique planifié",
      ],
      tags: ["motivation", "engagement"],
    },
    {
      id: 3,
      student: {
        name: "Sophie Martin",
        avatar: "/api/placeholder/40/40",
        course: "Algèbre Linéaire",
      },
      type: "excellence",
      priority: "low",
      status: "completed",
      title: "Proposition de défis avancés",
      description: "Excellente performance, propose des exercices plus complexes pour maintenir l'engagement.",
      createdAt: "2024-12-28",
      dueDate: "2025-01-05",
      actions: [
        "Exercices avancés assignés",
        "Proposition de mentorat d'autres étudiants",
      ],
      tags: ["excellence", "défis"],
    },
    {
      id: 4,
      student: {
        name: "Thomas Petit",
        avatar: "/api/placeholder/40/40",
        course: "Géométrie Analytique",
      },
      type: "behavioral",
      priority: "medium",
      status: "pending",
      title: "Irrégularité dans les connexions",
      description: "Pattern irrégulier de connexions, principalement en fin de semaine. Risque de retard dans le programme.",
      createdAt: "2025-01-02",
      dueDate: "2025-01-09",
      actions: [],
      tags: ["planning", "régularité"],
    },
  ];

  const interventionTypes = [
    {
      type: "academic_support",
      label: "Soutien académique",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      type: "motivation",
      label: "Motivation",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      textColor: "text-pink-700",
    },
    {
      type: "behavioral",
      label: "Comportemental",
      icon: Target,
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
    },
    {
      type: "excellence",
      label: "Excellence",
      icon: Lightbulb,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
  ];

  const priorityConfig = {
    high: { label: "Élevée", color: "bg-red-100 text-red-800", icon: AlertTriangle },
    medium: { label: "Moyenne", color: "bg-yellow-100 text-yellow-800", icon: Flag },
    low: { label: "Faible", color: "bg-green-100 text-green-800", icon: CheckCircle },
  };

  const statusConfig = {
    pending: { label: "En attente", color: "bg-slate-100 text-slate-800" },
    in_progress: { label: "En cours", color: "bg-blue-100 text-blue-800" },
    completed: { label: "Terminé", color: "bg-green-100 text-green-800" },
  };

  const getInterventionTypeConfig = (type: string) => {
    return interventionTypes.find(t => t.type === type) || interventionTypes[0];
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
            <h1 className="text-3xl font-bold text-slate-800">Interventions Pédagogiques</h1>
            <p className="text-slate-600 mt-1">Gérez et suivez vos interventions auprès des étudiants</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle intervention
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Créer une intervention</DialogTitle>
                <DialogDescription>
                  Planifiez une intervention personnalisée pour un étudiant
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="student">Étudiant concerné</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un étudiant..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emma">Emma Bernard</SelectItem>
                      <SelectItem value="lucas">Lucas Dubois</SelectItem>
                      <SelectItem value="sophie">Sophie Martin</SelectItem>
                      <SelectItem value="thomas">Thomas Petit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type d'intervention</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Type..." />
                      </SelectTrigger>
                      <SelectContent>
                        {interventionTypes.map((type) => (
                          <SelectItem key={type.type} value={type.type}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Priorité</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Priorité..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">Élevée</SelectItem>
                        <SelectItem value="medium">Moyenne</SelectItem>
                        <SelectItem value="low">Faible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="title">Titre</Label>
                  <Input id="title" placeholder="Titre de l'intervention..." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Décrivez la situation et les actions nécessaires..."
                    rows={4}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Date d'échéance</Label>
                  <Input id="dueDate" type="date" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Annuler
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Créer l'intervention
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Rechercher par étudiant, type ou description..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="in_progress">En cours</SelectItem>
                <SelectItem value="completed">Terminés</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes priorités</SelectItem>
                <SelectItem value="high">Élevée</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="low">Faible</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Interventions actives", value: "12", color: "from-blue-500 to-cyan-500" },
            { label: "Priorité élevée", value: "3", color: "from-red-500 to-pink-500" },
            { label: "Terminées ce mois", value: "18", color: "from-green-500 to-emerald-500" },
            { label: "Taux de succès", value: "87%", color: "from-purple-500 to-indigo-500" },
          ].map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                    </div>
                    <div className={`w-8 h-8 bg-gradient-to-r ${stat.color} rounded-lg`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Interventions List */}
        <Tabs defaultValue="list" className="space-y-6">
          <TabsList>
            <TabsTrigger value="list">Liste</TabsTrigger>
            <TabsTrigger value="calendar">Calendrier</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {interventions.map((intervention, index) => {
                const typeConfig = getInterventionTypeConfig(intervention.type);
                const priority = priorityConfig[intervention.priority as keyof typeof priorityConfig];
                const status = statusConfig[intervention.status as keyof typeof statusConfig];

                return (
                  <motion.div key={intervention.id} variants={itemVariants}>
                    <Card className="hover:shadow-lg transition-all duration-300 group">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={intervention.student.avatar} />
                              <AvatarFallback>
                                {intervention.student.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                                  {intervention.title}
                                </h3>
                                <Badge className={priority.color}>
                                  <priority.icon className="w-3 h-3 mr-1" />
                                  {priority.label}
                                </Badge>
                                <Badge className={status.color}>
                                  {status.label}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
                                <div className="flex items-center space-x-1">
                                  <User className="w-4 h-4" />
                                  <span>{intervention.student.name}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <BookOpen className="w-4 h-4" />
                                  <span>{intervention.student.course}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>Échéance: {new Date(intervention.dueDate).toLocaleDateString('fr-FR')}</span>
                                </div>
                              </div>
                              <p className="text-slate-700 mb-3">{intervention.description}</p>
                              
                              {intervention.actions.length > 0 && (
                                <div className="mb-3">
                                  <p className="text-sm font-medium text-slate-800 mb-2">Actions effectuées:</p>
                                  <ul className="text-sm text-slate-600 space-y-1">
                                    {intervention.actions.map((action, actionIndex) => (
                                      <li key={actionIndex} className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>{action}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              <div className="flex flex-wrap gap-2">
                                {intervention.tags.map((tag, tagIndex) => (
                                  <Badge key={tagIndex} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className={`w-12 h-12 ${typeConfig.bgColor} rounded-lg flex items-center justify-center`}>
                            <typeConfig.icon className={`w-6 h-6 ${typeConfig.textColor}`} />
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                          <div className="flex items-center space-x-2 text-sm text-slate-500">
                            <Clock className="w-4 h-4" />
                            <span>Créé le {new Date(intervention.createdAt).toLocaleDateString('fr-FR')}</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Contacter
                            </Button>
                            <Button size="sm" variant="outline">
                              Modifier
                            </Button>
                            {intervention.status !== "completed" && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Marquer terminé
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>Vue calendrier</CardTitle>
                <CardDescription>
                  Visualisez vos interventions sur un calendrier
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4" />
                  <p>Vue calendrier en développement</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Types d'interventions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {interventionTypes.map((type, index) => {
                      const count = interventions.filter(i => i.type === type.type).length;
                      const percentage = (count / interventions.length) * 100;
                      
                      return (
                        <div key={type.type} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium flex items-center space-x-2">
                              <type.icon className="w-4 h-4" />
                              <span>{type.label}</span>
                            </span>
                            <span className="text-sm text-slate-600">{count} interventions</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                              className={`h-2 bg-gradient-to-r ${type.color} rounded-full`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Efficacité des interventions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">87%</div>
                    <p className="text-slate-600 mb-4">des interventions sont résolues avec succès</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Interventions réussies</span>
                        <span className="font-medium">26/30</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Temps moyen de résolution</span>
                        <span className="font-medium">5.2 jours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Satisfaction étudiants</span>
                        <span className="font-medium">4.6/5</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProfessorInterventions;
