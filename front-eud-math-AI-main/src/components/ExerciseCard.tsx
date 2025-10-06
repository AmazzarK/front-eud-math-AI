import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle2, Circle } from 'lucide-react';

interface ExerciseCardProps {
  title: string;
  description: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  duration: string;
  progress?: number;
  completed?: boolean;
  onStart?: () => void;
}

export const ExerciseCard = ({ 
  title, 
  description, 
  difficulty, 
  duration, 
  progress = 0, 
  completed = false,
  onStart 
}: ExerciseCardProps) => {
  const difficultyColors = {
    'Facile': 'bg-success text-success-foreground',
    'Moyen': 'bg-warning text-warning-foreground',
    'Difficile': 'bg-destructive text-destructive-foreground',
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl">{title}</CardTitle>
          {completed ? (
            <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0" />
          ) : (
            <Circle className="h-6 w-6 text-muted-foreground flex-shrink-0" />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{description}</p>
        
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className={difficultyColors[difficulty]}>{difficulty}</Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>

        {!completed && progress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progression</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onStart} 
          className="w-full" 
          variant={completed ? "outline" : "default"}
        >
          {completed ? 'Revoir' : progress > 0 ? 'Continuer' : 'Commencer'}
        </Button>
      </CardFooter>
    </Card>
  );
};
