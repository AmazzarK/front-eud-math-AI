import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Users,
  Clock,
  Settings,
  Bell,
  Shield,
  Eye,
  Camera,
  Save,
  Edit,
} from "lucide-react";
import { useState } from "react";

const ProfessorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const professorData = {
    name: "Dr. Marie Dubois",
    email: "marie.dubois@universite.fr",
    phone: "+33 6 12 34 56 78",
    department: "Département de Mathématiques",
    position: "Professeure Associée",
    location: "Paris, France",
    joinDate: "2018-09-01",
    bio: "Spécialiste en algèbre linéaire et analyse numérique avec plus de 15 ans d'expérience dans l'enseignement supérieur. Passionnée par l'innovation pédagogique et l'intégration des technologies dans l'apprentissage des mathématiques.",
    specializations: ["Algèbre Linéaire", "Analyse Numérique", "Statistiques Appliquées"],
    languages: ["Français (Natif)", "Anglais (Courant)", "Espagnol (Intermédiaire)"],
    achievements: [
      { title: "Excellence Pédagogique 2024", date: "2024", icon: "🏆" },
      { title: "Innovation Numérique", date: "2023", icon: "💡" },
      { title: "Meilleur Professeur de l'Année", date: "2022", icon: "⭐" },
    ],
    stats: {
      totalStudents: 247,
      coursesTeaching: 6,
      yearExperience: 15,
      satisfaction: 4.8,
    },
    settings: {
      emailNotifications: true,
      pushNotifications: false,
      weeklyReports: true,
      studentMessages: true,
      darkMode: false,
      language: "fr",
      timezone: "Europe/Paris",
    },
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
            <h1 className="text-3xl font-bold text-slate-800">Profil Professeur</h1>
            <p className="text-slate-600 mt-1">Gérez vos informations personnelles et préférences</p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "default" : "outline"}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Enregistrer
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Modifier
              </>
            )}
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="h-fit">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  {/* Avatar */}
                  <div className="relative mx-auto w-32 h-32">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src="/api/placeholder/128/128" />
                      <AvatarFallback className="text-2xl">MD</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {/* Basic Info */}
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">{professorData.name}</h2>
                    <p className="text-slate-600">{professorData.position}</p>
                    <p className="text-sm text-slate-500">{professorData.department}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{professorData.stats.totalStudents}</div>
                      <div className="text-xs text-slate-600">Étudiants</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{professorData.stats.coursesTeaching}</div>
                      <div className="text-xs text-slate-600">Cours</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{professorData.stats.yearExperience}</div>
                      <div className="text-xs text-slate-600">Années</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{professorData.stats.satisfaction}</div>
                      <div className="text-xs text-slate-600">Satisfaction</div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-slate-800">Récompenses récentes</h3>
                    {professorData.achievements.slice(0, 3).map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 bg-slate-50 rounded-lg">
                        <span className="text-lg">{achievement.icon}</span>
                        <div className="text-left">
                          <div className="text-sm font-medium">{achievement.title}</div>
                          <div className="text-xs text-slate-500">{achievement.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Detailed Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personnel</TabsTrigger>
                <TabsTrigger value="academic">Académique</TabsTrigger>
                <TabsTrigger value="settings">Paramètres</TabsTrigger>
              </TabsList>

              {/* Personal Information */}
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>Informations personnelles</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input
                          id="name"
                          value={professorData.name}
                          disabled={!isEditing}
                          className={isEditing ? "" : "bg-slate-50"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={professorData.email}
                          disabled={!isEditing}
                          className={isEditing ? "" : "bg-slate-50"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          value={professorData.phone}
                          disabled={!isEditing}
                          className={isEditing ? "" : "bg-slate-50"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Localisation</Label>
                        <Input
                          id="location"
                          value={professorData.location}
                          disabled={!isEditing}
                          className={isEditing ? "" : "bg-slate-50"}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Biographie</Label>
                      <Textarea
                        id="bio"
                        value={professorData.bio}
                        disabled={!isEditing}
                        className={isEditing ? "" : "bg-slate-50"}
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Spécialisations</h4>
                        <div className="space-y-2">
                          {professorData.specializations.map((spec, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <Badge variant="secondary">{spec}</Badge>
                              {isEditing && (
                                <Button size="sm" variant="ghost" className="text-red-600">
                                  ×
                                </Button>
                              )}
                            </div>
                          ))}
                          {isEditing && (
                            <Button size="sm" variant="outline" className="w-full">
                              <span className="text-slate-600">+ Ajouter une spécialisation</span>
                            </Button>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Langues</h4>
                        <div className="space-y-2">
                          {professorData.languages.map((lang, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm">{lang}</span>
                              {isEditing && (
                                <Button size="sm" variant="ghost" className="text-red-600">
                                  ×
                                </Button>
                              )}
                            </div>
                          ))}
                          {isEditing && (
                            <Button size="sm" variant="outline" className="w-full">
                              <span className="text-slate-600">+ Ajouter une langue</span>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Academic Information */}
              <TabsContent value="academic">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5" />
                        <span>Informations académiques</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="position">Poste</Label>
                          <Input
                            id="position"
                            value={professorData.position}
                            disabled={!isEditing}
                            className={isEditing ? "" : "bg-slate-50"}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Département</Label>
                          <Input
                            id="department"
                            value={professorData.department}
                            disabled={!isEditing}
                            className={isEditing ? "" : "bg-slate-50"}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="joinDate">Date d'arrivée</Label>
                          <Input
                            id="joinDate"
                            type="date"
                            value={professorData.joinDate}
                            disabled={!isEditing}
                            className={isEditing ? "" : "bg-slate-50"}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Award className="w-5 h-5" />
                        <span>Récompenses et reconnaissances</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {professorData.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{achievement.icon}</span>
                              <div>
                                <div className="font-medium">{achievement.title}</div>
                                <div className="text-sm text-slate-500">{achievement.date}</div>
                              </div>
                            </div>
                            {isEditing && (
                              <Button size="sm" variant="ghost" className="text-red-600">
                                <span>Supprimer</span>
                              </Button>
                            )}
                          </div>
                        ))}
                        {isEditing && (
                          <Button variant="outline" className="w-full">
                            <span>+ Ajouter une récompense</span>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Settings */}
              <TabsContent value="settings">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Bell className="w-5 h-5" />
                        <span>Notifications</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Notifications email</div>
                          <div className="text-sm text-slate-500">Recevoir les notifications par email</div>
                        </div>
                        <Switch checked={professorData.settings.emailNotifications} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Notifications push</div>
                          <div className="text-sm text-slate-500">Recevoir les notifications push</div>
                        </div>
                        <Switch checked={professorData.settings.pushNotifications} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Rapports hebdomadaires</div>
                          <div className="text-sm text-slate-500">Recevoir un rapport d'activité chaque semaine</div>
                        </div>
                        <Switch checked={professorData.settings.weeklyReports} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Messages étudiants</div>
                          <div className="text-sm text-slate-500">Autoriser les messages directs des étudiants</div>
                        </div>
                        <Switch checked={professorData.settings.studentMessages} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Settings className="w-5 h-5" />
                        <span>Préférences</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="language">Langue</Label>
                          <Select value={professorData.settings.language}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fr">Français</SelectItem>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Fuseau horaire</Label>
                          <Select value={professorData.settings.timezone}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                              <SelectItem value="Europe/London">Europe/London</SelectItem>
                              <SelectItem value="America/New_York">America/New_York</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Mode sombre</div>
                          <div className="text-sm text-slate-500">Activer le thème sombre</div>
                        </div>
                        <Switch checked={professorData.settings.darkMode} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Shield className="w-5 h-5" />
                        <span>Sécurité</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        Changer le mot de passe
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Authentification à deux facteurs
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Sessions actives
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfessorProfile;
