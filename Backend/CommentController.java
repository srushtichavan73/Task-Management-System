package com.taskapp.controller;

import com.taskapp.model.Comment;
import com.taskapp.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/api/tasks/{taskId}/comments")
    public ResponseEntity<List<Comment>> getComments(
            @PathVariable Long taskId) {
        return ResponseEntity.ok(commentService.getCommentsByTask(taskId));
    }

    @PostMapping("/api/tasks/{taskId}/comments")
    public ResponseEntity<Comment> addComment(
            @PathVariable Long taskId,
            @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(
                commentService.addComment(taskId, body.get("content")));
    }

    @DeleteMapping("/api/comments/{id}")
    public void deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
    }
}