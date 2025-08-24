/**
 * Component: ProjectsPage
 * Design Reference: APP_THEME_GUIDE.md - Core app design system
 * UX Pattern: PM33_COMPLETE_UX_SYSTEM.md - Project management patterns
 * 
 * Compliance Checklist:
 * - [x] Uses shadcn/ui components exclusively
 * - [x] Professional B2B SaaS design
 * - [x] lucide-react icons
 * - [x] Responsive grid layout
 */

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Folder, 
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Users,
  Target
} from 'lucide-react';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const projects = [
    {
      id: 1,
      name: 'Mobile App Redesign',
      status: 'In Progress',
      progress: 67,
      priority: 'High',
      dueDate: 'Mar 15, 2024',
      team: ['JD', 'AS', 'MK'],
      description: 'Complete redesign of mobile application with improved UX'
    },
    {
      id: 2,
      name: 'API Integration Platform',
      status: 'Planning',
      progress: 23,
      priority: 'Medium',
      dueDate: 'Apr 30, 2024',
      team: ['RG', 'LM'],
      description: 'New integration platform for third-party APIs'
    },
    {
      id: 3,
      name: 'Analytics Dashboard V2',
      status: 'In Progress',
      progress: 89,
      priority: 'High',
      dueDate: 'Feb 28, 2024',
      team: ['SK', 'PL', 'TH', 'VM'],
      description: 'Enhanced analytics dashboard with real-time insights'
    },
    {
      id: 4,
      name: 'Security Audit Implementation',
      status: 'Completed',
      progress: 100,
      priority: 'Critical',
      dueDate: 'Jan 15, 2024',
      team: ['DR', 'FN'],
      description: 'Implementation of security recommendations from audit'
    }
  ];

  const statusColors = {
    'In Progress': 'blue',
    'Planning': 'yellow',
    'Completed': 'green',
    'On Hold': 'gray'
  };

  const priorityColors = {
    'Critical': 'red',
    'High': 'orange',
    'Medium': 'blue',
    'Low': 'gray'
  };

  return (
    <div className="pt-16">
      
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <Folder className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Project Management
                  </h1>
                  <p className="text-lg text-slate-600 dark:text-slate-400">
                    Strategic project oversight with AI-powered insights
                  </p>
                </div>
              </div>
              
              <Button size="lg">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <div className="relative min-w-[300px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {projects.length} projects total
              </p>
            </div>
          </Card>

          {/* Projects Grid */}
          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                          {project.name}
                        </h3>
                        <Badge
                          variant={project.status === 'Completed' ? 'default' : project.status === 'In Progress' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {project.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            project.priority === 'Critical' ? 'border-red-200 text-red-700 bg-red-50 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300' :
                            project.priority === 'High' ? 'border-orange-200 text-orange-700 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-300' :
                            project.priority === 'Medium' ? 'border-blue-200 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300' :
                            'border-slate-200 text-slate-700 bg-slate-50 dark:bg-slate-900/20 dark:border-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {project.priority}
                        </Badge>
                      </div>
                      
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-slate-500" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          Progress: {project.progress}%
                        </span>
                        <div className="w-24">
                          <Progress value={project.progress} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-500" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          Due: {project.dueDate}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-slate-500" />
                        <div className="flex gap-1">
                          {project.team.map((member, index) => (
                            <Avatar key={index} className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {member}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="ml-4">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}