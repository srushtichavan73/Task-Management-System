package com.taskapp.repository;

import com.taskapp.model.Project;
import com.taskapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByCreatedByOrMembersContaining(User createdBy, User member);
}