import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
  FileText, 
  ExternalLink, 
  Calendar, 
  Link as LinkIcon,
  ListTodo,
  BookOpen,
  TrendingUp,
  Download,
  Code,
  Trash2,
  ClipboardList
} from "lucide-react";
import { Button } from "../components/ui/button";
import IFrameDrawer from "../components/IFrameDrawer";
import ModuleCard from "../components/ADUPlanning/ModuleCard";
import { ApplicationQuestionnaire } from "../components/ADUPlanning/ApplicationQuestionnaire";
import PropertyAssessmentDisplay from "../components/ADUPlanning/PropertyAssessmentDisplay";
import { exampleProperty } from "../components/ADUPlanning/PropertyData";
import ChatAssistant from "../components/ChatAssistant";
import { ADUPlanningSession, Module, TaskStatus, QuestionnaireAnswers } from "../types/adu-planning";
import { 
  createNewSession, 
  calculateProgress, 
  updateModuleUnlockStatus,
  saveSessionToStorage,
  loadSessionFromStorage,
  clearSessionStorage,
  saveDevMode,
  loadDevMode
} from "../data/adu-planning-modules";
import { 
  clearQuestionnaireAnswers,
  hasQuestionnaireData 
} from "../utils/questionnaire-storage";

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  dateUpdated: string;
  category?: string;
}

// Focused resources for hackathon - AI validation of permits to reduce review cycles
const focusedResources: Resource[] = [
  {
    id: "seattle-building-code",
    title: "2021 Seattle Building Code (PDF)",
    description: "Official Seattle Building Code Chapter 1 covering scope, administration, permits, inspections, and certificates of occupancy. Critical for validation rules.",
    url: "https://www.seattle.gov/documents/Departments/SDCI/Codes/SeattleBuildingCode/2021SBCChapter1.pdf",
    dateUpdated: "2021-03-15",
    category: "Code Base"
  },
  {
    id: "seattle-residential-code",
    title: "2021 Seattle Residential Code (PDF)",
    description: "Seattle Residential Code for one- and two-family dwellings. Primary validation source for residential projects (ADUs, additions, remodels).",
    url: "https://www.seattle.gov/documents/Departments/SDCI/Codes/SeattleResidentialCode/2021SRCChapter1.pdf",
    dateUpdated: "2021-03-15",
    category: "Code Base"
  },
  {
    id: "eca-code",
    title: "Environmentally Critical Areas (ECA) Code",
    description: "ECA regulations for steep slopes, wetlands, habitats. Essential for flagging projects in environmentally sensitive areas.",
    url: "https://www.seattle.gov/sdci/codes/codes-we-enforce-(a-z)/environmentally-critical-areas-(eca)-code",
    dateUpdated: "2025-10-01",
    category: "Code Base"
  },
  {
    id: "gis-viewer",
    title: "Seattle City GIS Viewer",
    description: "Interactive GIS with parcels, zoning, ECA boundaries. Critical for address-based zoning lookups and setback validation.",
    url: "https://seattlecitygis.maps.arcgis.com/apps/webappviewer/index.html?id=f822b2c6498c4163b0cf908e2241e9c2",
    dateUpdated: "2025-10-01",
    category: "Validation Data"
  },
  {
    id: "permit-history",
    title: "SDCI Permit & Site History",
    description: "Historical permit data by address. Use for pattern analysis of common corrections and successful submissions.",
    url: "https://maps.seattle.gov/sdcipermithistory/",
    dateUpdated: "2025-10-01",
    category: "Training Data"
  },
  {
    id: "adu-permits",
    title: "Accessory Dwelling Units (ADUs)",
    description: "Complete ADU requirements - ideal pilot project type for AI validation (common, well-documented, high volume).",
    url: "https://www.seattle.gov/sdci/permits/common-projects/accessory-dwelling-units",
    dateUpdated: "2025-10-01",
    category: "Pilot Use Case"
  },
  {
    id: "common-projects",
    title: "Common Projects Guide",
    description: "Step-by-step guides for frequent project types. Use to create validation checklists and requirement matrices.",
    url: "https://www.seattle.gov/sdci/permits/common-projects",
    dateUpdated: "2025-10-01",
    category: "Validation Rules"
  },
  {
    id: "common-code-questions",
    title: "Common Code Questions",
    description: "FAQ on codes and interpretations. Valuable for training AI on nuanced code application scenarios.",
    url: "https://www.seattle.gov/sdci/codes/common-code-questions",
    dateUpdated: "2025-10-01",
    category: "Training Data"
  },
  {
    id: "codes-az",
    title: "Codes We Enforce (A-Z)",
    description: "Complete code index with full text links. Comprehensive reference for building validation rule database.",
    url: "https://www.seattle.gov/sdci/codes/codes-we-enforce-(a-z)",
    dateUpdated: "2025-10-01",
    category: "Code Base"
  },
  {
    id: "arcgis-experience",
    title: "Seattle Development Dashboard",
    description: "Development statistics and patterns. Analyze trends in corrections and review cycles by project type.",
    url: "https://experience.arcgis.com/experience/0ab08621bfa9461ab6615b727c0e5749",
    dateUpdated: "2025-10-01",
    category: "Analytics Data"
  }
];

const sdciResources: Resource[] = [
  {
    id: "sdci-main",
    title: "SDCI Main Portal",
    description: "Seattle Department of Construction and Inspections homepage. Access permits, inspections, codes, and all SDCI services.",
    url: "https://www.seattle.gov/sdci",
    dateUpdated: "2025-10-01",
    category: "Main Portal"
  },
  {
    id: "sdci-permits",
    title: "SDCI Permits Hub",
    description: "Central hub for all permitting services. Apply for permits, check status, and access permit-related resources and guidance.",
    url: "https://www.seattle.gov/sdci/permits",
    dateUpdated: "2025-10-01",
    category: "Permits"
  },
  {
    id: "adu-permits",
    title: "Accessory Dwelling Units (ADUs)",
    description: "Complete guide for building ADUs including attached units (AADUs), detached backyard cottages (DADUs), pre-approved plans, and permit requirements.",
    url: "https://www.seattle.gov/sdci/permits/common-projects/accessory-dwelling-units",
    dateUpdated: "2025-10-01",
    category: "Common Projects"
  }
];

type TabType = 'planner' | 'questionnaire' | 'property' | 'resources';

const Permitting = () => {
  const [markdownContent, setMarkdownContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showFocusedResources, setShowFocusedResources] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('planner');
  
  // ADU Planning State
  const [planningSession, setPlanningSession] = useState<ADUPlanningSession | null>(null);
  const [devMode, setDevMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/markdown/seattle-permitting-overview.md");
        if (!response.ok) {
          throw new Error("Failed to fetch markdown content");
        }
        const text = await response.text();
        setMarkdownContent(text);
        setError(null);
      } catch (err) {
        setError("Unable to load permitting guide. Please try again later.");
        console.error("Error fetching markdown:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkdown();
    
    // Load dev mode from localStorage
    const savedDevMode = loadDevMode();
    setDevMode(savedDevMode);
    
    // Load or create planning session
    const savedSession = loadSessionFromStorage();
    if (savedSession) {
      // Apply dev mode to saved session
      const unlockedModules = updateModuleUnlockStatus(savedSession.modules, savedDevMode);
      setPlanningSession({
        ...savedSession,
        modules: unlockedModules
      });
    } else {
      const newSession = createNewSession();
      const unlockedModules = updateModuleUnlockStatus(newSession.modules, savedDevMode);
      const sessionWithUnlocks = {
        ...newSession,
        modules: unlockedModules
      };
      setPlanningSession(sessionWithUnlocks);
      saveSessionToStorage(sessionWithUnlocks);
    }
  }, []);

  // Save session to localStorage whenever it changes
  useEffect(() => {
    if (planningSession) {
      saveSessionToStorage(planningSession);
    }
  }, [planningSession]);

  const handleTaskStatusChange = (
    moduleId: string,
    taskId: string,
    status: TaskStatus
  ) => {
    if (!planningSession) return;

    const updatedModules = planningSession.modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          majorTasks: module.majorTasks.map(task => {
            if (task.id === taskId) {
              return { ...task, status };
            }
            return task;
          })
        };
      }
      return module;
    });

    const unlockedModules = updateModuleUnlockStatus(updatedModules, devMode);
    const progress = calculateProgress(unlockedModules);

    setPlanningSession({
      ...planningSession,
      modules: unlockedModules,
      progressPercentage: progress,
      updatedAt: new Date()
    });
  };

  const handleTaskNotesChange = (
    moduleId: string,
    taskId: string,
    notes: string
  ) => {
    if (!planningSession) return;

    const updatedModules = planningSession.modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          majorTasks: module.majorTasks.map(task => {
            if (task.id === taskId) {
              return { ...task, notes };
            }
            return task;
          })
        };
      }
      return module;
    });

    setPlanningSession({
      ...planningSession,
      modules: updatedModules,
      updatedAt: new Date()
    });
  };

  const handleSubTaskStatusChange = (
    moduleId: string,
    taskId: string,
    subtaskId: string,
    status: TaskStatus
  ) => {
    if (!planningSession) return;

    const updatedModules = planningSession.modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          majorTasks: module.majorTasks.map(task => {
            if (task.id === taskId && task.subTasks) {
              return {
                ...task,
                subTasks: task.subTasks.map(subtask => {
                  if (subtask.id === subtaskId) {
                    return { ...subtask, status };
                  }
                  return subtask;
                })
              };
            }
            return task;
          })
        };
      }
      return module;
    });

    const progress = calculateProgress(updatedModules);

    setPlanningSession({
      ...planningSession,
      modules: updatedModules,
      progressPercentage: progress,
      updatedAt: new Date()
    });
  };

  const handleSubTaskNotesChange = (
    moduleId: string,
    taskId: string,
    subtaskId: string,
    notes: string
  ) => {
    if (!planningSession) return;

    const updatedModules = planningSession.modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          majorTasks: module.majorTasks.map(task => {
            if (task.id === taskId && task.subTasks) {
              return {
                ...task,
                subTasks: task.subTasks.map(subtask => {
                  if (subtask.id === subtaskId) {
                    return { ...subtask, notes };
                  }
                  return subtask;
                })
              };
            }
            return task;
          })
        };
      }
      return module;
    });

    setPlanningSession({
      ...planningSession,
      modules: updatedModules,
      updatedAt: new Date()
    });
  };

  const handleResourceClick = (resource: Resource) => {
    setSelectedResource(resource);
    setDrawerOpen(true);
  };

  const handleTaskResourceClick = (title: string, url: string) => {
    setSelectedResource({ id: 'task-resource', title, url, description: '', dateUpdated: '' });
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleDevModeToggle = () => {
    const newDevMode = !devMode;
    setDevMode(newDevMode);
    saveDevMode(newDevMode);
    
    // Update module unlock status based on new dev mode
    if (planningSession) {
      const unlockedModules = updateModuleUnlockStatus(planningSession.modules, newDevMode);
      setPlanningSession({
        ...planningSession,
        modules: unlockedModules
      });
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
      clearSessionStorage();
      clearQuestionnaireAnswers();
      const newSession = createNewSession();
      const unlockedModules = updateModuleUnlockStatus(newSession.modules, devMode);
      setPlanningSession({
        ...newSession,
        modules: unlockedModules
      });
    }
  };

  const handleQuestionnaireComplete = (answers: QuestionnaireAnswers) => {
    if (!planningSession) return;
    
    // Save answers to planning session
    setPlanningSession({
      ...planningSession,
      questionnaireAnswers: answers,
      updatedAt: new Date()
    });
    
    // Show success message
    alert('Questionnaire completed! Your answers have been saved.');
    
    // Optionally switch to planner tab
    setActiveTab('planner');
  };

  const handleExportProgress = () => {
    if (!planningSession) return;
    
    const dataStr = JSON.stringify(planningSession, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `adu-planning-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading permitting guide...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <div className="text-center">
          <FileText className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Error Loading Content</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-background flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Seattle ADU Planning</h1>
              <p className="text-muted-foreground mt-1">
                Plan and build your Accessory Dwelling Unit with confidence
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {/* Dev Mode Toggle */}
            <Button 
              onClick={handleDevModeToggle} 
              variant={devMode ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              <Code className="h-4 w-4" />
              {devMode ? 'Dev Mode ON' : 'Dev Mode OFF'}
            </Button>
            
            {/* Reset Button */}
            <Button onClick={handleResetProgress} variant="destructive" className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Reset
            </Button>
            
            {planningSession && (
              <Button onClick={handleExportProgress} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            )}
            <Button asChild>
              <a
                href="https://www.seattle.gov/sdci/permits"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                SDCI Portal
              </a>
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        {planningSession && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium text-foreground">Overall Progress</span>
              <span className="text-muted-foreground">{planningSession.progressPercentage}%</span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 transition-all duration-500"
                style={{ width: `${planningSession.progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mt-6">
          <button
            onClick={() => setActiveTab('planner')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'planner'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <ListTodo className="h-4 w-4" />
            ADU Planner
          </button>
          <button
            onClick={() => setActiveTab('questionnaire')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'questionnaire'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <ClipboardList className="h-4 w-4" />
            Application Details
            {hasQuestionnaireData() && (
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-green-500 text-white rounded-full">
                ✓
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('property')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'property'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <FileText className="h-4 w-4" />
            Property Data
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'resources'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Resources & Guide
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'questionnaire' && (
          <div className="h-full overflow-auto bg-gray-50">
            <div className="max-w-5xl mx-auto py-8 px-4">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Application Detail Questionnaire
                </h2>
                <p className="text-muted-foreground">
                  Complete this questionnaire to gather all necessary information for your ADU permit application.
                  Your answers are automatically saved as you progress through each section.
                </p>
              </div>
              <ApplicationQuestionnaire 
                onComplete={handleQuestionnaireComplete}
                initialAnswers={planningSession?.questionnaireAnswers}
              />
            </div>
          </div>
        )}

        {activeTab === 'property' && (
          <PropertyAssessmentDisplay property={exampleProperty} />
        )}

        {activeTab === 'planner' && planningSession && (
          <div className="h-full flex">
            {/* Left Column - Modules */}
            <div className="flex-1 overflow-auto">
              <div className="mx-auto p-6">
                {/* Welcome Message */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl p-6 mb-6 border border-blue-200 dark:border-blue-800">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Welcome to Your ADU Planning Journey! 🏡
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    This interactive checklist will guide you through every step of planning and building your
                    Accessory Dwelling Unit in Seattle. We'll help you avoid common pitfalls and minimize review
                    cycles with the City of Seattle.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-foreground">
                        <strong>{planningSession.progressPercentage}%</strong> Complete
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ListTodo className="h-4 w-4 text-blue-600" />
                      <span className="text-foreground">
                        <strong>{planningSession.modules.length}</strong> Modules
                      </span>
                    </div>
                  </div>
                </div>

                {/* Modules */}
                <div className="space-y-6">
                  {planningSession.modules.map((module) => (
                    <ModuleCard
                      key={module.id}
                      module={module}
                      onTaskStatusChange={handleTaskStatusChange}
                      onSubTaskStatusChange={handleSubTaskStatusChange}
                      onTaskNotesChange={handleTaskNotesChange}
                      onSubTaskNotesChange={handleSubTaskNotesChange}
                      onResourceClick={handleTaskResourceClick}
                    />
                  ))}
                </div>

                {/* Completion Message */}
                {planningSession.progressPercentage === 100 && (
                  <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-6 border border-green-200 dark:border-green-800 text-center">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      🎉 Congratulations!
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      You've completed all the planning steps for your ADU. You're now ready to submit your
                      permit application to the City of Seattle with confidence!
                    </p>
                    <Button asChild size="lg">
                      <a
                        href="https://www.seattle.gov/sdci/permits/common-projects/accessory-dwelling-units"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Submit Your Permit Application
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Chat Assistant */}
            <div className="w-96 flex-shrink-0">
              <ChatAssistant context="User is currently going through ADU planning modules in Seattle" />
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="flex h-full">
            {/* Markdown Content - Left Column */}
            <div className="flex-1 overflow-auto border-r border-border">
              <div className="max-w-4xl mx-auto p-6">
                <article className="prose prose-slate dark:prose-invert prose-headings:scroll-mt-20 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-pre:bg-muted max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1"
                        >
                          {props.children}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ),
                      table: ({ node, ...props }) => (
                        <div className="overflow-x-auto my-6">
                          <table className="min-w-full divide-y divide-border" {...props} />
                        </div>
                      ),
                      h1: ({ node, ...props }) => (
                        <h1 className="text-4xl font-bold mt-8 mb-4 pb-2 border-b" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className="text-3xl font-semibold mt-8 mb-4" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="text-2xl font-semibold mt-6 mb-3" {...props} />
                      ),
                      h4: ({ node, ...props }) => (
                        <h4 className="text-xl font-semibold mt-4 mb-2" {...props} />
                      ),
                      code: ({ node, ...props }) => {
                        const isInline = !String(props.className || '').includes('language-');
                        return isInline ? (
                          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                        ) : (
                          <code className="block bg-muted p-4 rounded-lg overflow-x-auto" {...props} />
                        );
                      },
                      blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-4 border-primary pl-4 italic my-4" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc list-inside space-y-2 my-4" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal list-inside space-y-2 my-4" {...props} />
                      ),
                    }}
                  >
                    {markdownContent}
                  </ReactMarkdown>
                </article>
              </div>
            </div>

            {/* Resources - Right Column */}
            <div className="w-96 overflow-auto bg-card">
              <div className="sticky top-0 bg-card border-b border-border p-4 z-10">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-primary" />
                  {showFocusedResources ? "Key Resources" : "All SDCI Resources"}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {showFocusedResources 
                    ? "Essential resources for ADU planning" 
                    : "Official tools and portals for Seattle construction"}
                </p>
                
                <div className="flex gap-2 mt-3">
                  <Button
                    variant={showFocusedResources ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowFocusedResources(true)}
                    className="flex-1"
                  >
                    Key Resources ({focusedResources.length})
                  </Button>
                  <Button
                    variant={!showFocusedResources ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowFocusedResources(false)}
                    className="flex-1"
                  >
                    All Resources ({sdciResources.length})
                  </Button>
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                {(showFocusedResources ? focusedResources : sdciResources).map((resource) => (
                  <button
                    key={resource.id}
                    onClick={() => handleResourceClick(resource)}
                    className="block w-full text-left p-4 rounded-lg border border-border bg-background hover:bg-accent hover:border-primary transition-all duration-200 group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors flex-1">
                        {resource.title}
                      </h3>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-1" />
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                      {resource.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {resource.category}
                      </span>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Updated {new Date(resource.dateUpdated).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* IFrame Drawer */}
      {selectedResource && (
        <IFrameDrawer
          isOpen={drawerOpen}
          onClose={handleCloseDrawer}
          title={selectedResource.title}
          url={selectedResource.url}
          direction="right"
        />
      )}
    </div>
  );
};

export default Permitting;
