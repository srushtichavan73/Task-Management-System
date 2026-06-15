package com.taskapp.controller;

import com.taskapp.model.Task;
import com.taskapp.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    // Get all tasks in a project
    @GetMapping("/api/projects/{projectId}/tasks")
    public ResponseEntity<List<Task>> getTasksByProject(
            @PathVariable Long projectId) {
        return ResponseEntity.ok(taskService.getTasksByProject(projectId));
    }

    // Create task in a project
    @PostMapping("/api/projects/{projectId}/tasks")
    public ResponseEntity<Task> createTask(@PathVariable Long projectId,
                                           @RequestBody Task task) {
        return ResponseEntity.ok(taskService.createTask(projectId, task));
    }

    // Get task by ID
    @GetMapping("/api/tasks/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    // Update task
    @PutMapping("/api/tasks/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id,
                                           @RequestBody Task task) {
        return ResponseEntity.ok(taskService.updateTask(id, task));
    }

    // Update status only (for drag & drop)
    @PatchMapping("/api/tasks/{id}/status")
    public ResponseEntity<Task> updateStatus(@PathVariable Long id,
                                             @RequestParam Task.Status status) {
        return ResponseEntity.ok(taskService.updateStatus(id, status));
    }

    // Assign task to user
    @PatchMapping("/api/tasks/{id}/assign")
    public ResponseEntity<Task> assignTask(@PathVariable Long id,
                                           @RequestParam Long userId) {
        return ResponseEntity.ok(taskService.assignTask(id, userId));
    }

    // Delete task
    @DeleteMapping("/api/tasks/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    // Get my tasks
    @GetMapping("/api/tasks/my")
    public ResponseEntity<List<Task>> getMyTasks() {
        return ResponseEntity.ok(taskService.getMyTasks());
    }
}