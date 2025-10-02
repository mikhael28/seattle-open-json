import React from 'react';
import { Module } from '../../types/adu-planning';
import { 
  MapPin, 
  Database, 
  Home, 
  Map, 
  Hammer,
  Lock,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import TaskCard from './TaskCard';

interface ModuleCardProps {
  module: Module;
  onTaskStatusChange: (moduleId: string, taskId: string, status: 'not-started' | 'in-progress' | 'completed' | 'blocked') => void;
  onSubTaskStatusChange: (moduleId: string, taskId: string, subtaskId: string, status: 'not-started' | 'in-progress' | 'completed' | 'blocked') => void;
  onTaskNotesChange: (moduleId: string, taskId: string, notes: string) => void;
  onSubTaskNotesChange: (moduleId: string, taskId: string, subtaskId: string, notes: string) => void;
  onResourceClick: (title: string, url: string) => void;
}

const iconMap: { [key: string]: React.ElementType } = {
  MapPin,
  Database,
  Home,
  Map,
  Hammer
};

const ModuleCard: React.FC<ModuleCardProps> = ({ 
  module, 
  onTaskStatusChange, 
  onSubTaskStatusChange,
  onTaskNotesChange,
  onSubTaskNotesChange,
  onResourceClick
}) => {
  const [expanded, setExpanded] = React.useState(module.order === 1);

  const Icon = module.icon ? iconMap[module.icon] || MapPin : MapPin;

  const completedTasks = module.majorTasks.filter(task => task.status === 'completed').length;
  const totalTasks = module.majorTasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const getModuleStatusColor = () => {
    if (!module.unlocked) return 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700';
    if (completedTasks === totalTasks && totalTasks > 0) return 'bg-green-50 dark:bg-green-950/20 border-green-300 dark:border-green-700';
    if (completedTasks > 0) return 'bg-blue-50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-700';
    return 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700';
  };

  return (
    <div className={`border-2 rounded-xl overflow-hidden transition-all duration-300 ${getModuleStatusColor()}`}>
      {/* Module Header */}
      <div
        className="p-6 cursor-pointer hover:bg-opacity-80 transition-colors"
        onClick={() => module.unlocked && setExpanded(!expanded)}
      >
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${module.unlocked ? 'bg-primary/10' : 'bg-gray-300 dark:bg-gray-700'}`}>
            {module.unlocked ? (
              <Icon className="h-6 w-6 text-primary" />
            ) : (
              <Lock className="h-6 w-6 text-gray-500" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-foreground">{module.title}</h2>
                  {completedTasks === totalTasks && totalTasks > 0 && (
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  )}
                </div>
                <p className="text-muted-foreground mt-1">{module.description}</p>
              </div>
              
              {module.unlocked && (
                <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors">
                  {expanded ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{module.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Progress:</span>
                <span>{completedTasks} / {totalTasks} tasks</span>
              </div>
            </div>

            {/* Progress Bar */}
            {module.unlocked && (
              <div className="mt-4">
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{Math.round(progress)}% complete</p>
              </div>
            )}

            {!module.unlocked && (
              <div className="mt-3 text-sm text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>Complete previous stages to unlock</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Module Tasks */}
      {expanded && module.unlocked && (
        <div className="px-6 pb-6 space-y-3 border-t border-gray-200 dark:border-gray-700 pt-6">
          {module.majorTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={(taskId, status) => onTaskStatusChange(module.id, taskId, status)}
              onSubTaskStatusChange={(taskId, subtaskId, status) => 
                onSubTaskStatusChange(module.id, taskId, subtaskId, status)
              }
              onNotesChange={(taskId, notes) => onTaskNotesChange(module.id, taskId, notes)}
              onSubTaskNotesChange={(taskId, subtaskId, notes) => 
                onSubTaskNotesChange(module.id, taskId, subtaskId, notes)
              }
              onResourceClick={onResourceClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ModuleCard;

