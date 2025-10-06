import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Award,
  Clock,
  Target,
  Download,
  Filter,
  Calendar,
  PieChart,
  LineChart,
  Activity,
} from "lucide-react";

const ProfessorStatistics = () => {
  const overviewStats = [
    {
      title: "Étudiants totaux",
      value: "247",
      change: "+12.5%",
      changeType: "increase",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Taux de réussite",
      value: "87.3%",
      change: "+5.2%",
      changeType: "increase",
      icon: Target,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Temps moyen/exercice",
      value: "12.4 min",
      change: "-2.1 min",
      changeType: "decrease",
      icon: Clock,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Satisfaction moyenne",
      value: "4.8/5",
      change: "+0.3",
      changeType: "increase",
      icon: Award,
      color: "from-orange-500 to-red-500",
    },
  ];

  const coursePerformance = [
    {
      course: "Algèbre Linéaire",
      students: 45,
      completion: 92,
      avgScore: 85.6,
      difficulty: "Intermédiaire",
      trend: "up",
    },
    {
      course: "Calcul Différentiel",
      students: 38,
      completion: 78,
      avgScore: 79.2,
      difficulty: "Avancé",
      trend: "stable",
    },
    {
      course: "Statistiques",
      students: 52,
      completion: 85,
      avgScore: 88.1,
      difficulty: "Débutant",
      trend: "up",
    },
    {
      course: "Géométrie Analytique",
      students: 41,
      completion: 67,
      avgScore: 76.8,
      difficulty: "Intermédiaire",
      trend: "down",
    },
  ];

  const monthlyData = [
    { month: "Jan", students: 180, completion: 78, score: 82 },
    { month: "Fév", students: 195, completion: 82, score: 84 },
    { month: "Mar", students: 220, completion: 85, score: 86 },
    { month: "Avr", students: 235, completion: 87, score: 85 },
    { month: "Mai", students: 247, completion: 89, score: 87 },
  ];

  const getDifficultyBadge = (difficulty: string) => {
    const configs = {
      "Débutant": { variant: "secondary" as const, className: "bg-green-100 text-green-800" },
      "Intermédiaire": { variant: "secondary" as const, className: "bg-yellow-100 text-yellow-800" },
      "Avancé": { variant: "secondary" as const, className: "bg-red-100 text-red-800" },
    };
    return configs[difficulty as keyof typeof configs] || configs["Intermédiaire"];
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-slate-600" />;
    }
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
            <h1 className="text-3xl font-bold text-slate-800">Statistiques et Analytics</h1>
            <p className="text-slate-600 mt-1">Analyse approfondie des performances et tendances</p>
          </div>
          <div className="flex space-x-2">
            <Select defaultValue="month">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
                <SelectItem value="semester">Ce semestre</SelectItem>
                <SelectItem value="year">Cette année</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </motion.div>

        {/* Overview Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {overviewStats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className={`h-1 bg-gradient-to-r ${stat.color}`} />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        {stat.changeType === "increase" ? (
                          <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
                        )}
                        <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="courses">Cours</TabsTrigger>
            <TabsTrigger value="students">Étudiants</TabsTrigger>
            <TabsTrigger value="trends">Tendances</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Chart */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <LineChart className="w-5 h-5" />
                      <span>Évolution mensuelle</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {monthlyData.map((data, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">{data.month}</span>
                            </div>
                            <div>
                              <div className="font-medium">{data.students} étudiants</div>
                              <div className="text-sm text-slate-500">{data.completion}% complétion</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-slate-800">{data.score}</div>
                            <div className="text-sm text-slate-500">Score moy.</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Activity Heatmap */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span>Activité hebdomadaire</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day, index) => (
                        <div key={day} className="flex items-center space-x-3">
                          <div className="w-12 text-sm font-medium text-slate-600">{day}</div>
                          <div className="flex-1 flex space-x-1">
                            {Array.from({ length: 24 }, (_, i) => (
                              <div
                                key={i}
                                className={`w-3 h-3 rounded-sm ${
                                  Math.random() > 0.6
                                    ? "bg-blue-500"
                                    : Math.random() > 0.3
                                    ? "bg-blue-300"
                                    : "bg-slate-200"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center justify-between text-xs text-slate-500 mt-4">
                        <span>Moins</span>
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 bg-slate-200 rounded-sm" />
                          <div className="w-3 h-3 bg-blue-300 rounded-sm" />
                          <div className="w-3 h-3 bg-blue-500 rounded-sm" />
                        </div>
                        <span>Plus</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {coursePerformance.map((course, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">{course.course}</h3>
                          <p className="text-slate-600">{course.students} étudiants inscrits</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge {...getDifficultyBadge(course.difficulty)}>
                            {course.difficulty}
                          </Badge>
                          {getTrendIcon(course.trend)}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{course.completion}%</div>
                          <div className="text-sm text-slate-600">Taux de complétion</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{course.avgScore}</div>
                          <div className="text-sm text-slate-600">Score moyen</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">{course.students}</div>
                          <div className="text-sm text-slate-600">Étudiants actifs</div>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progression globale</span>
                          <span>{course.completion}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${course.completion}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5" />
                    <span>Répartition par niveau</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { level: "Excellent", count: 45, color: "bg-green-500", percentage: 35 },
                      { level: "Bon", count: 89, color: "bg-blue-500", percentage: 45 },
                      { level: "À améliorer", count: 32, color: "bg-orange-500", percentage: 20 },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{item.level}</span>
                          <span className="text-sm text-slate-600">{item.count} étudiants</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            className={`h-2 ${item.color} rounded-full`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Engagement quotidien</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-800 mb-2">78%</div>
                    <p className="text-slate-600 mb-4">des étudiants se connectent quotidiennement</p>
                    <Badge className="bg-green-100 text-green-800">+12% ce mois</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Temps moyen par session</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-800 mb-2">24m</div>
                    <p className="text-slate-600 mb-4">durée moyenne d'utilisation</p>
                    <Badge className="bg-blue-100 text-blue-800">Optimal</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Prédictions et recommandations</CardTitle>
                <CardDescription>
                  Analyses prédictives basées sur les données historiques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-800">Tendance positive</h4>
                    <p className="text-blue-700 mt-1">
                      L'engagement des étudiants a augmenté de 15% ce mois. Cette tendance devrait se maintenir.
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                    <h4 className="font-semibold text-orange-800">Attention requise</h4>
                    <p className="text-orange-700 mt-1">
                      Le cours "Géométrie Analytique" montre une baisse de performance. Considérez des interventions supplémentaires.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-800">Recommandation</h4>
                    <p className="text-green-700 mt-1">
                      Basé sur les données, le meilleur moment pour publier de nouveaux contenus est le mardi matin.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProfessorStatistics;
