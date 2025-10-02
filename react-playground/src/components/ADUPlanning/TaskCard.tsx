import React from 'react';
import { MajorTask, SubTask } from '../../types/adu-planning';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  ChevronDown, 
  ChevronRight, 
  ExternalLink,
  AlertCircle,
  Loader2,
  StickyNote
} from 'lucide-react';
import { Button } from '../ui/button';

interface TaskCardProps {
  task: MajorTask;
  onStatusChange: (taskId: string, status: 'not-started' | 'in-progress' | 'completed' | 'blocked') => void;
  onSubTaskStatusChange?: (taskId: string, subtaskId: string, status: 'not-started' | 'in-progress' | 'completed' | 'blocked') => void;
  onNotesChange?: (taskId: string, notes: string) => void;
  onSubTaskNotesChange?: (taskId: string, subtaskId: string, notes: string) => void;
  onResourceClick?: (title: string, url: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onStatusChange, 
  onSubTaskStatusChange,
  onNotesChange,
  onSubTaskNotesChange,
  onResourceClick
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [showNotes, setShowNotes] = React.useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'blocked':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50 dark:bg-green-950/20';
      case 'in-progress':
        return 'border-blue-500 bg-blue-50 dark:bg-blue-950/20';
      case 'blocked':
        return 'border-red-500 bg-red-50 dark:bg-red-950/20';
      default:
        return 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800';
    }
  };

  const hasSubTasks = task.subTasks && task.subTasks.length > 0;

  return (
    <div className={`border-2 rounded-lg p-4 transition-all duration-200 ${getStatusColor(task.status)}`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => {
            const nextStatus = task.status === 'completed' ? 'not-started' : 
                             task.status === 'in-progress' ? 'completed' : 'in-progress';
            onStatusChange(task.id, nextStatus);
          }}
          className="mt-0.5 flex-shrink-0 hover:scale-110 transition-transform"
        >
          {getStatusIcon(task.status)}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-foreground'}`}>
                    {task.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                </div>
                
                {hasSubTasks && (
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                  >
                    {expanded ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </button>
                )}
              </div>

              {task.conditional && task.condition && (
                <div className="mt-2 text-xs bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded inline-block">
                  Conditional: {task.condition}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
                {task.estimatedTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{task.estimatedTime}</span>
                  </div>
                )}
                
                <button
                  onClick={() => setShowNotes(!showNotes)}
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <StickyNote className="h-4 w-4" />
                  <span className="text-xs">{showNotes ? 'Hide Notes' : 'Add Notes'}</span>
                </button>
              </div>
            </div>

            {/* Prominent Resource Buttons - Right Side */}
            {task.resources && task.resources.length > 0 && (
              <div className="flex flex-col gap-2 flex-shrink-0 ml-4">
                {task.resources.map((resource, idx) => (
                  <Button
                    key={idx}
                    onClick={() => onResourceClick?.(resource.title, resource.url)}
                    variant="default"
                    size="sm"
                    className="flex items-center gap-2 whitespace-nowrap font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>{resource.title}</span>
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Notes Section */}
          {showNotes && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-foreground mb-1">Notes</label>
              <textarea
                value={task.notes || ''}
                onChange={(e) => onNotesChange?.(task.id, e.target.value)}
                placeholder="Add your notes here..."
                className="w-full min-h-[80px] p-2 text-sm border border-border rounded-lg bg-background text-foreground resize-y focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}

          {/* Sub Tasks */}
          {hasSubTasks && expanded && (
            <div className="mt-4 space-y-2 pl-4 border-l-2 border-gray-300 dark:border-gray-600">
              {task.subTasks!.map((subtask) => (
                <SubTaskItem
                  key={subtask.id}
                  subtask={subtask}
                  onStatusChange={(status) => onSubTaskStatusChange?.(task.id, subtask.id, status)}
                  onNotesChange={(notes) => onSubTaskNotesChange?.(task.id, subtask.id, notes)}
                  onResourceClick={onResourceClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface SubTaskItemProps {
  subtask: SubTask;
  onStatusChange: (status: 'not-started' | 'in-progress' | 'completed' | 'blocked') => void;
  onNotesChange?: (notes: string) => void;
  onResourceClick?: (title: string, url: string) => void;
}

const SubTaskItem: React.FC<SubTaskItemProps> = ({ subtask, onStatusChange, onNotesChange, onResourceClick }) => {
  const [showNotes, setShowNotes] = React.useState(false);
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'blocked':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="flex items-start gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
      <button
        onClick={() => {
          const nextStatus = subtask.status === 'completed' ? 'not-started' : 
                           subtask.status === 'in-progress' ? 'completed' : 'in-progress';
          onStatusChange(nextStatus);
        }}
        className="mt-0.5 flex-shrink-0 hover:scale-110 transition-transform"
      >
        {getStatusIcon(subtask.status)}
      </button>

      <div className="flex-1 min-w-0 flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className={`font-medium text-sm ${subtask.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
              {subtask.title}
            </h4>
            {subtask.required && (
              <span className="text-xs bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-0.5 rounded">
                Required
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{subtask.description}</p>
          
          <div className="mt-2">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <StickyNote className="h-3 w-3" />
              <span className="text-xs">{showNotes ? 'Hide Notes' : 'Add Notes'}</span>
            </button>
          </div>
        </div>

        {/* Prominent Resource Buttons - Right Side */}
        {subtask.resources && subtask.resources.length > 0 && (
          <div className="flex flex-col gap-2 flex-shrink-0">
            {subtask.resources.map((resource, idx) => (
              <Button
                key={idx}
                onClick={() => onResourceClick?.(resource.title, resource.url)}
                variant="default"
                size="sm"
                className="flex items-center gap-2 whitespace-nowrap font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs"
              >
                <ExternalLink className="h-3 w-3" />
                {resource.title}
              </Button>
            ))}
          </div>
        )}

        {/* Notes Section */}
        {showNotes && (
          <div className="mt-2">
            <textarea
              value={subtask.notes || ''}
              onChange={(e) => onNotesChange?.(e.target.value)}
              placeholder="Add your notes here..."
              className="w-full min-h-[60px] p-2 text-xs border border-border rounded-lg bg-background text-foreground resize-y focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;

