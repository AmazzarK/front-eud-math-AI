import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface BadgeCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  earned: boolean;
  date?: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

export const BadgeCard = ({ title, description, icon: Icon, earned, date, rarity = 'common' }: BadgeCardProps) => {
  const rarityColors = {
    common: 'from-muted to-muted/50',
    rare: 'from-primary/20 to-primary/5',
    epic: 'from-secondary/20 to-secondary/5',
    legendary: 'from-accent/20 to-accent/5',
  };

  const rarityBorders = {
    common: 'border-muted',
    rare: 'border-primary/30',
    epic: 'border-secondary/30',
    legendary: 'border-accent/30',
  };

  return (
    <Card className={`p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-br ${rarityColors[rarity]} border-2 ${rarityBorders[rarity]} ${!earned && 'opacity-60 grayscale'}`}>
      <div className="flex flex-col items-center text-center gap-4">
        <div className={`p-4 rounded-2xl ${earned ? 'bg-gradient-to-br from-primary to-secondary shadow-glow' : 'bg-muted'}`}>
          <Icon className={`h-10 w-10 ${earned ? 'text-white' : 'text-muted-foreground'}`} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <h3 className="font-semibold text-lg">{title}</h3>
            {earned && <Badge variant="default" className="text-xs">Obtenu</Badge>}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
          {earned && date && (
            <p className="text-xs text-muted-foreground mt-2">{date}</p>
          )}
        </div>
      </div>
    </Card>
  );
};
