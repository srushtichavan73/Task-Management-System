package com.taskapp.service;

import com.taskapp.model.Project;
import com.taskapp.model.User;
import com.taskapp.repository.ProjectRepository;
import com.taskapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    // Get current logged-in user
    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Get all projects for current user
    public List<Project> getAllProjects() {
        User user = getCurrentUser();
        return projectRepository.findByCreatedByOrMembersContaining(user, user);
    }

    // Get project by ID
    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    // Create project
    public Project createProject(Project project) {
        User user = getCurrentUser();
        project.setCreatedBy(user);
        return projectRepository.save(project);
    }

    // Update project
    public Project updateProject(Long id, Project updatedProject) {
        Project project = getProjectById(id);
        project.setName(updatedProject.getName());
        project.setDescription(updatedProject.getDescription());
        project.setDeadline(updatedProject.getDeadline());
        return projectRepository.save(project);
    }

    // Delete project
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    // Add member to project
    public Project addMember(Long projectId, Long userId) {
        Project project = getProjectById(projectId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        project.getMembers().add(user);
        return projectRepository.save(project);
    }

    // Remove member from project
    public Project removeMember(Long projectId, Long userId) {
        Project project = getProjectById(projectId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        project.getMembers().remove(user);
        return projectRepository.save(project);
    }
}