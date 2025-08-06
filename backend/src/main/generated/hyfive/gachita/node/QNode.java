package hyfive.gachita.node;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QNode is a Querydsl query type for Node
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QNode extends EntityPathBase<Node> {

    private static final long serialVersionUID = -1731676948L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QNode node = new QNode("node");

    public final hyfive.gachita.book.QBook book;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Double> lat = createNumber("lat", Double.class);

    public final NumberPath<Double> lng = createNumber("lng", Double.class);

    public final hyfive.gachita.path.QPath path;

    public final TimePath<java.time.LocalTime> time = createTime("time", java.time.LocalTime.class);

    public final EnumPath<NodeType> type = createEnum("type", NodeType.class);

    public QNode(String variable) {
        this(Node.class, forVariable(variable), INITS);
    }

    public QNode(com.querydsl.core.types.Path<? extends Node> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QNode(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QNode(PathMetadata metadata, PathInits inits) {
        this(Node.class, metadata, inits);
    }

    public QNode(Class<? extends Node> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.book = inits.isInitialized("book") ? new hyfive.gachita.book.QBook(forProperty("book"), inits.get("book")) : null;
        this.path = inits.isInitialized("path") ? new hyfive.gachita.path.QPath(forProperty("path"), inits.get("path")) : null;
    }

}

