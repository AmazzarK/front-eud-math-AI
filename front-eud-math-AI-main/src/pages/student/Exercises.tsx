import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { PageHeader } from '@/components/PageHeader';
import { ExerciseCard } from '@/components/ExerciseCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PenTool, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Exercises = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const { toast } = useToast();

  const exercises = [
    {
      title: 'Variables et Types de Données',
      description: 'Apprenez les bases de la déclaration de variables et des types primitifs en JavaScript.',
      difficulty: 'Facile' as const,
      duration: '20 min',
      progress: 0,
      completed: false,
      category: 'JavaScript',
    },
    {
      title: 'Boucles et Itérations',
      description: 'Maîtrisez les structures de contrôle : for, while, et les méthodes de tableau.',
      difficulty: 'Facile' as const,
      duration: '30 min',
      progress: 100,
      completed: true,
      category: 'JavaScript',
    },
    {
      title: 'Fonctions et Portée',
      description: 'Comprenez les fonctions, les closures et la portée des variables.',
      difficulty: 'Moyen' as const,
      duration: '45 min',
      progress: 60,
      completed: false,
      category: 'JavaScript',
    },
    {
      title: 'Programmation Orientée Objet',
      description: 'Découvrez les classes, l\'héritage et le polymorphisme en JavaScript moderne.',
      difficulty: 'Moyen' as const,
      duration: '1h',
      progress: 0,
      completed: false,
      category: 'JavaScript',
    },
    {
      title: 'Algorithmes de Tri',
      description: 'Implémentez et analysez différents algorithmes de tri (bubble, quick, merge).',
      difficulty: 'Difficile' as const,
      duration: '1h 30min',
      progress: 0,
      completed: false,
      category: 'Algorithmes',
    },
    {
      title: 'Structures de Données Avancées',
      description: 'Explorez les arbres, graphes et tables de hachage.',
      difficulty: 'Difficile' as const,
      duration: '2h',
      progress: 0,
      completed: false,
      category: 'Algorithmes',
    },
    {
      title: 'React Hooks Essentiels',
      description: 'Maîtrisez useState, useEffect, useContext et les hooks personnalisés.',
      difficulty: 'Moyen' as const,
      duration: '1h',
      progress: 100,
      completed: true,
      category: 'React',
    },
    {
      title: 'Gestion d\'État avec Redux',
      description: 'Apprenez à gérer l\'état global avec Redux Toolkit.',
      difficulty: 'Difficile' as const,
      duration: '1h 30min',
      progress: 25,
      completed: false,
      category: 'React',
    },
  ];

  const handleStartExercise = (title: string) => {
    toast({
      title: 'Exercice lancé',
      description: `Vous commencez "${title}"`,
    });
  };

  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ex.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || ex.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const completedExercises = filteredExercises.filter(ex => ex.completed);
  const inProgressExercises = filteredExercises.filter(ex => ex.progress > 0 && !ex.completed);
  const notStartedExercises = filteredExercises.filter(ex => ex.progress === 0 && !ex.completed);

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <PageHeader
          title="Exercices"
          description="Pratiquez et améliorez vos compétences"
          icon={PenTool}
        />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un exercice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Difficulté" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="Facile">Facile</SelectItem>
              <SelectItem value="Moyen">Moyen</SelectItem>
              <SelectItem value="Difficile">Difficile</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Exercises Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="all">
              Tous ({filteredExercises.length})
            </TabsTrigger>
            <TabsTrigger value="progress">
              En cours ({inProgressExercises.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Terminés ({completedExercises.length})
            </TabsTrigger>
            <TabsTrigger value="new">
              Nouveaux ({notStartedExercises.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredExercises.map((exercise, index) => (
                <ExerciseCard
                  key={index}
                  {...exercise}
                  onStart={() => handleStartExercise(exercise.title)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {inProgressExercises.map((exercise, index) => (
                <ExerciseCard
                  key={index}
                  {...exercise}
                  onStart={() => handleStartExercise(exercise.title)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {completedExercises.map((exercise, index) => (
                <ExerciseCard
                  key={index}
                  {...exercise}
                  onStart={() => handleStartExercise(exercise.title)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {notStartedExercises.map((exercise, index) => (
                <ExerciseCard
                  key={index}
                  {...exercise}
                  onStart={() => handleStartExercise(exercise.title)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Exercises;
