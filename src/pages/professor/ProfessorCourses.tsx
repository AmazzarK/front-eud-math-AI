import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BookOpen,
  Plus,
  Users,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  TrendingUp,
  FileText,
  Star,
  Download,
  Upload,
} from "lucide-react";
import { useState } from "react";

const ProfessorCourses = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const courses = [
    {
      id: 1,
      title: "Algèbre Linéaire Avancée",
      description: "Espaces vectoriels, transformations linéaires et applications",
      students: 45,
      status: "active",
      progress: 68,
      lastUpdated: "2025-01-03",
      chapters: 12,
      assignments: 8,
      rating: 4.8,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Calcul Différentiel",
      description: "Dérivées, optimisation et applications pratiques",
      students: 32,
      status: "active",
      progress: 45,
      lastUpdated: "2025-01-02",
      chapters: 10,
      assignments: 6,
      rating: 4.9,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 3,
      title: "Statistiques Appliquées",
      description: "Analyse de données et inférence statistique",
      students: 28,
      status: "draft",
      progress: 20,
      lastUpdated: "2024-12-28",
      chapters: 8,
      assignments: 4,
      rating: 4.7,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 4,
      title: "Géométrie Analytique",
      description: "Coordonnées, vecteurs et transformations géométriques",
      students: 38,
      status: "completed",
      progress: 100,
      lastUpdated: "2024-12-15",
      chapters: 15,
      assignments: 10,
      rating: 4.6,
      color: "from-orange-500 to-red-500",
    },
  ];

  const stats = [
    { label: "Cours actifs", value: courses.filter(c => c.status === "active").length, icon: BookOpen },
    { label: "Total étudiants", value: courses.reduce((sum, c) => sum + c.students, 0), icon: Users },
    { label: "Note moyenne", value: "4.8", icon: Star },
    { label: "Taux de complétion", value: "85%", icon: TrendingUp },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Actif", variant: "default" as const },
      draft: { label: "Brouillon", variant: "secondary" as const },
      completed: { label: "Terminé", variant: "outline" as const },
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
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
            <h1 className="text-3xl font-bold text-slate-800">Gestion des Cours</h1>
            <p className="text-slate-600 mt-1">Créez, gérez et suivez vos cours</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau cours
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Créer un nouveau cours</DialogTitle>
                <DialogDescription>
                  Remplissez les informations de base pour votre nouveau cours
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Titre du cours</Label>
                  <Input id="title" placeholder="Ex: Algèbre Linéaire" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Description du cours..." rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="level">Niveau</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Débutant</SelectItem>
                        <SelectItem value="intermediate">Intermédiaire</SelectItem>
                        <SelectItem value="advanced">Avancé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Durée (semaines)</Label>
                    <Input id="duration" type="number" placeholder="12" />
                  </div>
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
                  Créer le cours
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
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

        {/* Courses Grid */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-4">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="active">Actifs</TabsTrigger>
            <TabsTrigger value="draft">Brouillons</TabsTrigger>
            <TabsTrigger value="completed">Terminés</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {courses.map((course, index) => (
                <motion.div key={course.id} variants={itemVariants} whileHover={{ y: -5 }}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    <div className={`h-2 bg-gradient-to-r ${course.color}`} />
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <Badge {...getStatusBadge(course.status)} />
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{course.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-slate-500" />
                          <span>{course.students} étudiants</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-4 h-4 text-slate-500" />
                          <span>{course.chapters} chapitres</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-slate-500" />
                          <span>{course.assignments} devoirs</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          <span>{new Date(course.lastUpdated).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>

                      {course.status !== "completed" && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progression</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${course.progress}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              className={`h-2 bg-gradient-to-r ${course.color} rounded-full`}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          Voir
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Other tab contents would be filtered versions of the same grid */}
          <TabsContent value="active">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {courses
                .filter(course => course.status === "active")
                .map((course, index) => (
                  <motion.div key={course.id} variants={itemVariants} whileHover={{ y: -5 }}>
                    {/* Same card component as above */}
                    <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group">
                      <div className={`h-2 bg-gradient-to-r ${course.color}`} />
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-2">
                          <Badge {...getStatusBadge(course.status)} />
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{course.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                          {course.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {course.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-slate-500" />
                            <span>{course.students} étudiants</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <BookOpen className="w-4 h-4 text-slate-500" />
                            <span>{course.chapters} chapitres</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-slate-500" />
                            <span>{course.assignments} devoirs</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-slate-500" />
                            <span>{new Date(course.lastUpdated).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progression</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${course.progress}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              className={`h-2 bg-gradient-to-r ${course.color} rounded-full`}
                            />
                          </div>
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="w-4 h-4 mr-1" />
                            Voir
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProfessorCourses;
