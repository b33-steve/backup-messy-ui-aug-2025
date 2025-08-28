/**
 * Component: WorkMappingPage
 * Design Reference: docs/shared/PM33_COMPLETE_UI_SYSTEM.md - Work mapping interface
 * UX Pattern: docs/shared/PM33_COMPLETE_UX_SYSTEM.md - Drag and drop patterns
 * 
 * Compliance Checklist:
 * - [x] Uses shadcn/ui components exclusively
 * - [x] Glass morphism applied with GlassCard
 * - [x] Professional B2B SaaS design
 * - [x] lucide-react icons with animations
 * - [x] Drag and drop functionality with @dnd-kit
 * - [x] Responsive layout with work mapping interface
 * - [x] Follows 8pt grid spacing
 */

'use client';

import React, { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import GlassCard, { AIGlassCard, StrategicGlassCard, PremiumGlassCard } from '@/components/ui/glass-card';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitBranch,
  Target,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  Plus,
  Search,
  Filter,
  BarChart3,
  Zap,
  ArrowRight,
  GripVertical,
  Link,
  RefreshCw,
  Settings,
  Download,
  Upload
} from 'lucide-react';
import CoreAppNavigation from '../../../components/app/CoreAppNavigation';

// Types
interface WorkItem {
  id: string;
  title: string;
  description: string;
  type: 'epic' | 'story' | 'task' | 'bug';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'backlog' | 'todo' | 'in-progress' | 'done';
  assignee?: string;
  storyPoints?: number;
  labels: string[];
  projectKey: string;
  createdAt: Date;
  dueDate?: Date;
}

interface Initiative {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'planning' | 'active' | 'paused' | 'completed';
  progress: number;
  workItems: string[]; // Array of work item IDs
  stakeholders: string[];
  targetDate?: Date;
  businessValue: number;
  effort: number;
  confidence: number;
}

interface MappingRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  confidence: number;
  autoApply: boolean;
}

// Sample data
const sampleWorkItems: WorkItem[] = [
  {
    id: 'PM33-101',
    title: 'Implement user authentication system',
    description: 'Create secure login/logout functionality with OAuth support',
    type: 'epic',
    priority: 'high',
    status: 'in-progress',
    assignee: 'Sarah Chen',
    storyPoints: 13,
    labels: ['security', 'authentication', 'backend'],
    projectKey: 'PM33',
    createdAt: new Date('2024-01-15'),
    dueDate: new Date('2024-02-15')
  },
  {
    id: 'PM33-102',
    title: 'Design strategic dashboard wireframes',
    description: 'Create UX wireframes for the main dashboard interface',
    type: 'story',
    priority: 'high',
    status: 'todo',
    assignee: 'Alex Rodriguez',
    storyPoints: 8,
    labels: ['design', 'ux', 'dashboard'],
    projectKey: 'PM33',
    createdAt: new Date('2024-01-16')
  },
  {
    id: 'PM33-103',
    title: 'Fix responsive layout on mobile devices',
    description: 'Address mobile layout issues in the navigation component',
    type: 'bug',
    priority: 'medium',
    status: 'backlog',
    assignee: 'Jordan Kim',
    storyPoints: 3,
    labels: ['frontend', 'mobile', 'css'],
    projectKey: 'PM33',
    createdAt: new Date('2024-01-17')
  },
  {
    id: 'PM33-104',
    title: 'Setup CI/CD pipeline',
    description: 'Configure automated testing and deployment pipeline',
    type: 'task',
    priority: 'medium',
    status: 'todo',
    assignee: 'Sam Wilson',
    storyPoints: 5,
    labels: ['devops', 'ci-cd', 'automation'],
    projectKey: 'PM33',
    createdAt: new Date('2024-01-18')
  },
  {
    id: 'PM33-105',
    title: 'Implement real-time notifications',
    description: 'Add push notification system for important updates',
    type: 'story',
    priority: 'low',
    status: 'backlog',
    storyPoints: 8,
    labels: ['frontend', 'notifications', 'real-time'],
    projectKey: 'PM33',
    createdAt: new Date('2024-01-19')
  }
];

const sampleInitiatives: Initiative[] = [
  {
    id: 'INIT-001',
    title: 'Q1 Platform Foundation',
    description: 'Establish core platform infrastructure and security',
    priority: 'critical',
    status: 'active',
    progress: 65,
    workItems: ['PM33-101', 'PM33-104'],
    stakeholders: ['Product Team', 'Engineering', 'Security'],
    targetDate: new Date('2024-03-31'),
    businessValue: 9,
    effort: 8,
    confidence: 85
  },
  {
    id: 'INIT-002',
    title: 'User Experience Enhancement',
    description: 'Improve user interface and overall user experience',
    priority: 'high',
    status: 'planning',
    progress: 30,
    workItems: ['PM33-102', 'PM33-103'],
    stakeholders: ['Design Team', 'Product Team', 'Users'],
    targetDate: new Date('2024-04-15'),
    businessValue: 7,
    effort: 6,
    confidence: 75
  },
  {
    id: 'INIT-003',
    title: 'Feature Expansion',
    description: 'Add new features to increase user engagement',
    priority: 'medium',
    status: 'planning',
    progress: 10,
    workItems: ['PM33-105'],
    stakeholders: ['Product Team', 'Marketing'],
    targetDate: new Date('2024-05-30'),
    businessValue: 6,
    effort: 7,
    confidence: 60
  }
];

// Sortable components
const SortableWorkItem: React.FC<{ workItem: WorkItem; isOverlay?: boolean }> = ({ workItem, isOverlay = false }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: workItem.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'epic': return <GitBranch className="h-4 w-4" />;
      case 'story': return <Target className="h-4 w-4" />;
      case 'task': return <CheckCircle className="h-4 w-4" />;
      case 'bug': return <AlertTriangle className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isOverlay ? 'rotate-3 shadow-2xl' : ''}`}
    >
      <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-grab active:cursor-grabbing">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
                <GripVertical className="h-4 w-4 text-slate-400" />
              </div>
              <div className="flex items-center gap-2">
                {getTypeIcon(workItem.type)}
                <span className="font-mono text-sm text-blue-400">{workItem.id}</span>
              </div>
            </div>
            <div className={`w-3 h-3 rounded-full ${getPriorityColor(workItem.priority)}`} />
          </div>
          
          <h4 className="font-semibold text-white text-sm mb-2 line-clamp-2">
            {workItem.title}
          </h4>
          
          <p className="text-xs text-slate-400 mb-3 line-clamp-2">
            {workItem.description}
          </p>
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              {workItem.storyPoints && (
                <Badge variant="secondary" className="text-xs">
                  {workItem.storyPoints} pts
                </Badge>
              )}
              <Badge variant="outline" className="text-xs">
                {workItem.status}
              </Badge>
            </div>
            
            <div className="flex items-center gap-1 text-slate-400">
              <Users className="h-3 w-3" />
              <span>{workItem.assignee || 'Unassigned'}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {workItem.labels.slice(0, 3).map((label) => (
              <Badge key={label} variant="secondary" className="text-xs">
                {label}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SortableInitiative: React.FC<{ initiative: Initiative; workItems: WorkItem[] }> = ({ initiative, workItems }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
    setDroppableNodeRef
  } = useSortable({ 
    id: initiative.id,
    data: { type: 'initiative', initiative }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-red-500/50 bg-red-500/10';
      case 'high': return 'border-orange-500/50 bg-orange-500/10';
      case 'medium': return 'border-yellow-500/50 bg-yellow-500/10';
      case 'low': return 'border-green-500/50 bg-green-500/10';
      default: return 'border-gray-500/50 bg-gray-500/10';
    }
  };

  const mappedWorkItems = workItems.filter(item => initiative.workItems.includes(item.id));

  return (
    <div ref={setNodeRef} style={style}>
      <Card className={`${getPriorityColor(initiative.priority)} ${isOver ? 'border-blue-400 bg-blue-500/20' : ''} transition-all`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
                <GripVertical className="h-4 w-4 text-slate-400" />
              </div>
              <CardTitle className="text-lg text-white">{initiative.title}</CardTitle>
            </div>
            <Badge 
              variant="secondary" 
              className={initiative.status === 'active' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}
            >
              {initiative.status}
            </Badge>
          </div>
          
          <p className="text-sm text-slate-300">{initiative.description}</p>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4 text-blue-400" />
                <span className="text-slate-300">Value: {initiative.businessValue}/10</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-orange-400" />
                <span className="text-slate-300">Effort: {initiative.effort}/10</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-4 w-4 text-green-400" />
                <span className="text-slate-300">{initiative.confidence}% confident</span>
              </div>
            </div>
          </div>
          
          <div className="mt-2">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-slate-300">Progress</span>
              <span className="text-slate-300">{initiative.progress}%</span>
            </div>
            <Progress value={initiative.progress} className="h-2" />
          </div>
        </CardHeader>
        
        <CardContent 
          ref={setDroppableNodeRef} 
          className="pt-0 min-h-[200px] border-t border-white/10"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-white text-sm">
                Work Items ({mappedWorkItems.length})
              </h4>
              <Button size="sm" variant="outline" className="h-8 px-2">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {mappedWorkItems.length === 0 ? (
              <div className="text-center py-8 text-slate-400 border-2 border-dashed border-white/10 rounded-lg">
                <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Drop work items here</p>
              </div>
            ) : (
              <div className="space-y-2">
                {mappedWorkItems.map((workItem) => (
                  <div key={workItem.id} className="relative">
                    <SortableWorkItem workItem={workItem} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Main component
const WorkMappingPage: React.FC = () => {
  const [workItems, setWorkItems] = useState<WorkItem[]>(sampleWorkItems);
  const [initiatives, setInitiatives] = useState<Initiative[]>(sampleInitiatives);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [autoMappingEnabled, setAutoMappingEnabled] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Filter work items
  const filteredWorkItems = workItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;
    const isUnmapped = !initiatives.some(init => init.workItems.includes(item.id));
    
    return matchesSearch && matchesStatus && matchesPriority && isUnmapped;
  });

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // If dropping on an initiative
    const targetInitiative = initiatives.find(init => init.id === overId);
    if (targetInitiative) {
      setInitiatives(prev => prev.map(init => {
        if (init.id === overId) {
          return {
            ...init,
            workItems: [...init.workItems, activeId]
          };
        }
        // Remove from other initiatives if it was already mapped
        return {
          ...init,
          workItems: init.workItems.filter(id => id !== activeId)
        };
      }));
    }
  };

  const runAutoMapping = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Auto-map based on labels and priorities
    const updatedInitiatives = [...initiatives];
    
    filteredWorkItems.forEach(item => {
      if (item.priority === 'high' || item.priority === 'critical') {
        // Map high priority items to active initiatives
        const activeInit = updatedInitiatives.find(init => init.status === 'active');
        if (activeInit && !activeInit.workItems.includes(item.id)) {
          activeInit.workItems.push(item.id);
        }
      } else if (item.labels.includes('ux') || item.labels.includes('design')) {
        // Map design items to UX initiative
        const uxInit = updatedInitiatives.find(init => init.title.includes('Experience'));
        if (uxInit && !uxInit.workItems.includes(item.id)) {
          uxInit.workItems.push(item.id);
        }
      }
    });
    
    setInitiatives(updatedInitiatives);
    setIsAnalyzing(false);
  };

  const activeWorkItem = activeId ? workItems.find(item => item.id === activeId) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <CoreAppNavigation />
      
      <div className="container mx-auto px-6 py-12 pt-24 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Work Item Mapping
              </h1>
              <p className="text-lg text-slate-300 mt-2">
                Map Jira tickets to strategic initiatives with AI-powered suggestions
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={runAutoMapping}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Zap className="mr-2 h-4 w-4" />
                )}
                AI Auto-Map
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Configure
              </Button>
            </div>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Work Items Panel */}
              <div className="lg:col-span-1">
                <StrategicGlassCard title="Unmapped Work Items" className="h-full">
                  <div className="space-y-4 mb-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="Search work items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-white/5 border-white/10"
                      />
                      
                      <div className="flex gap-2">
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                          <SelectTrigger className="bg-white/5 border-white/10">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="backlog">Backlog</SelectItem>
                            <SelectItem value="todo">Todo</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Select value={filterPriority} onValueChange={setFilterPriority}>
                          <SelectTrigger className="bg-white/5 border-white/10">
                            <SelectValue placeholder="Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Priority</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <ScrollArea className="h-[600px]">
                    <div className="space-y-3 pr-4">
                      {filteredWorkItems.length === 0 ? (
                        <div className="text-center py-8 text-slate-400">
                          <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No unmapped items found</p>
                        </div>
                      ) : (
                        <SortableContext 
                          items={filteredWorkItems.map(item => item.id)} 
                          strategy={verticalListSortingStrategy}
                        >
                          {filteredWorkItems.map((workItem) => (
                            <SortableWorkItem key={workItem.id} workItem={workItem} />
                          ))}
                        </SortableContext>
                      )}
                    </div>
                  </ScrollArea>
                </StrategicGlassCard>
              </div>

              {/* Initiatives Panel */}
              <div className="lg:col-span-3">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Strategic Initiatives</h2>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                      {initiatives.length} active initiatives
                    </Badge>
                  </div>

                  <SortableContext 
                    items={initiatives.map(init => init.id)} 
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-6">
                      {initiatives.map((initiative) => (
                        <SortableInitiative
                          key={initiative.id}
                          initiative={initiative}
                          workItems={workItems}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </div>
              </div>
            </div>

            <DragOverlay>
              {activeWorkItem ? <SortableWorkItem workItem={activeWorkItem} isOverlay /> : null}
            </DragOverlay>
          </DndContext>

          {/* Mapping Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <AIGlassCard>
              <div className="text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                <div className="text-2xl font-bold text-white">
                  {workItems.length - filteredWorkItems.length}
                </div>
                <p className="text-sm text-slate-300">Mapped Items</p>
              </div>
            </AIGlassCard>

            <AIGlassCard>
              <div className="text-center">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-orange-400" />
                <div className="text-2xl font-bold text-white">
                  {filteredWorkItems.length}
                </div>
                <p className="text-sm text-slate-300">Unmapped Items</p>
              </div>
            </AIGlassCard>

            <AIGlassCard>
              <div className="text-center">
                <GitBranch className="h-8 w-8 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold text-white">
                  {initiatives.filter(i => i.status === 'active').length}
                </div>
                <p className="text-sm text-slate-300">Active Initiatives</p>
              </div>
            </AIGlassCard>

            <AIGlassCard>
              <div className="text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                <div className="text-2xl font-bold text-white">
                  {Math.round(initiatives.reduce((sum, init) => sum + init.progress, 0) / initiatives.length)}%
                </div>
                <p className="text-sm text-slate-300">Avg. Progress</p>
              </div>
            </AIGlassCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkMappingPage;