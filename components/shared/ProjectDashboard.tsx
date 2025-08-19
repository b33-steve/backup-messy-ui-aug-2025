import React, { useState, useEffect } from 'react';
import { Card, Title, Text, Button, Badge, Stack, Group } from '@mantine/core';
import { AlertCircle, TrendingUp, Users, Calendar } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  created_at: string;
  stakeholders: string[];
  ai_insights: any;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  priority: string;
  ai_score: number;
}

interface AIAnalysis {
  analysis: string;
  confidence_score: number;
  generated_at: string;
}

export const ProjectDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    stakeholders: []
  });

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignee: ''
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      // In real implementation, this would fetch from API
      const mockProjects: Project[] = [
        {
          id: 'proj_1',
          name: 'AI-Powered Customer Portal',
          description: 'Build customer self-service portal with AI chat support',
          status: 'active',
          created_at: new Date().toISOString(),
          stakeholders: ['john@company.com', 'sarah@company.com'],
          ai_insights: {},
          tasks: [
            { id: 'task_1', title: 'Design user authentication flow', priority: 'high', ai_score: 85 },
            { id: 'task_2', title: 'Implement AI chatbot integration', priority: 'high', ai_score: 92 },
            { id: 'task_3', title: 'Create dashboard analytics', priority: 'medium', ai_score: 78 }
          ]
        }
      ];
      setProjects(mockProjects);
      if (mockProjects.length > 0) {
        setSelectedProject(mockProjects[0]);
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  };

  const createProject = async () => {
    if (!newProject.name) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });
      
      if (response.ok) {
        const project = await response.json();
        setProjects(prev => [...prev, project]);
        setNewProject({ name: '', description: '', stakeholders: [] });
      }
    } catch (error) {
      console.error('Failed to create project:', error);
    }
    setLoading(false);
  };

  const analyzeProject = async (projectId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/projects/${projectId}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          project_id: projectId, 
          analysis_type: 'comprehensive' 
        })
      });
      
      if (response.ok) {
        const analysis = await response.json();
        setAiAnalysis(analysis);
      }
    } catch (error) {
      console.error('Failed to analyze project:', error);
    }
    setLoading(false);
  };

  const createTask = async () => {
    if (!newTask.title || !selectedProject) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/projects/${selectedProject.id}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      });
      
      if (response.ok) {
        const task = await response.json();
        // Update selected project with new task
        const updatedProject = {
          ...selectedProject,
          tasks: [...selectedProject.tasks, task]
        };
        setSelectedProject(updatedProject);
        setNewTask({ title: '', description: '', priority: 'medium', assignee: '' });
      }
    } catch (error) {
      console.error('Failed to create task:', error);
    }
    setLoading(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'on_hold': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PM33 Dashboard</h1>
          <p className="text-gray-600">AI-native product management for modern teams</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project List */}
          <div className="lg:col-span-1">
            <Card>
              <Card.Section>
                <Title className="flex items-center justify-between">
                  Projects
                  <Badge className="bg-blue-100 text-blue-800">{projects.length}</Badge>
                </Title>
              </Card.Section>
              <Card.Section>
                {/* Create Project Form */}
                <div className="mb-4 p-3 border rounded-lg bg-gray-50">
                  <h4 className="font-medium mb-2">Create New Project</h4>
                  <input
                    type="text"
                    placeholder="Project name"
                    className="w-full p-2 border rounded mb-2"
                    value={newProject.name}
                    onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <textarea
                    placeholder="Description"
                    className="w-full p-2 border rounded mb-2"
                    rows={2}
                    value={newProject.description}
                    onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  />
                  <Button 
                    onClick={createProject}
                    disabled={loading || !newProject.name}
                    className="w-full"
                  >
                    Create Project
                  </Button>
                </div>

                {/* Projects List */}
                <div className="space-y-2">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedProject?.id === project.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{project.description}</div>
                      <div className="flex items-center justify-between mt-2">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500">
                          <Users className="w-3 h-3 mr-1" />
                          {project.stakeholders.length}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Section>
            </Card>
          </div>

          {/* Project Details */}
          <div className="lg:col-span-2">
            {selectedProject ? (
              <div className="space-y-6">
                {/* Project Overview */}
                <Card>
                  <Card.Section>
                    <Title className="flex items-center justify-between">
                      {selectedProject.name}
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(selectedProject.status)}>
                          {selectedProject.status}
                        </Badge>
                        <Button
                          onClick={() => analyzeProject(selectedProject.id)}
                          disabled={loading}
                          variant="outline"
                          size="sm"
                        >
                          <TrendingUp className="w-4 h-4 mr-1" />
                          AI Analysis
                        </Button>
                      </div>
                    </Title>
                  </Card.Section>
                  <Card.Section>
                    <p className="text-gray-600 mb-4">{selectedProject.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {selectedProject.stakeholders.length} stakeholders
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Created {new Date(selectedProject.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </Card.Section>
                </Card>

                {/* AI Analysis Results */}
                {aiAnalysis && (
                  <Card>
                    <Card.Section>
                      <Title className="flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        AI Analysis Results
                        <Badge className="ml-2 bg-green-100 text-green-800">
                          {Math.round(aiAnalysis.confidence_score * 100)}% confidence
                        </Badge>
                      </Title>
                    </Card.Section>
                    <Card.Section>
                      <div className="whitespace-pre-wrap text-sm">{aiAnalysis.analysis}</div>
                      <div className="text-xs text-gray-500 mt-2">
                        Generated at {new Date(aiAnalysis.generated_at).toLocaleString()}
                      </div>
                    </Card.Section>
                  </Card>
                )}

                {/* Tasks */}
                <Card>
                  <Card.Section>
                    <Title>
                      Tasks ({selectedProject.tasks.length})
                    </Title>
                  </Card.Section>
                  <Card.Section>
                    {/* Create Task Form */}
                    <div className="mb-4 p-3 border rounded-lg bg-gray-50">
                      <h4 className="font-medium mb-2">Add New Task</h4>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Task title"
                          className="p-2 border rounded"
                          value={newTask.title}
                          onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                        />
                        <select
                          className="p-2 border rounded"
                          value={newTask.priority}
                          onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                        >
                          <option value="low">Low Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="high">High Priority</option>
                          <option value="critical">Critical</option>
                        </select>
                      </div>
                      <textarea
                        placeholder="Task description"
                        className="w-full p-2 border rounded mb-2"
                        rows={2}
                        value={newTask.description}
                        onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                      />
                      <Button 
                        onClick={createTask}
                        disabled={loading || !newTask.title}
                        size="sm"
                      >
                        Add Task
                      </Button>
                    </div>

                    {/* Tasks List */}
                    <div className="space-y-2">
                      {selectedProject.tasks
                        .sort((a, b) => b.ai_score - a.ai_score)
                        .map((task) => (
                        <div key={task.id} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{task.title}</div>
                            <div className="flex items-center gap-2">
                              <Badge className={getPriorityColor(task.priority)}>
                                {task.priority}
                              </Badge>
                              <div className="text-xs text-gray-500">
                                AI Score: {task.ai_score}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card.Section>
                </Card>
              </div>
            ) : (
              <Card>
                <Card.Section className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Project Selected</h3>
                  <p className="text-gray-600">Select a project from the list to view details</p>
                </Card.Section>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;