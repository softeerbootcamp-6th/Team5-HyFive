package hyfive.gachita.application.node.repository;

import hyfive.gachita.application.node.Node;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NodeRepository extends JpaRepository<Node, Long>, CustomNodeRepository {
}
