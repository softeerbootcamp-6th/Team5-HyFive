package hyfive.gachita.path;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPath is a Querydsl query type for Path
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPath extends EntityPathBase<Path> {

    private static final long serialVersionUID = 1719931596L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPath path = new QPath("path");

    public final hyfive.gachita.car.QCar car;

    public final DatePath<java.time.LocalDate> driveDate = createDate("driveDate", java.time.LocalDate.class);

    public final EnumPath<DriveStatus> driveStatus = createEnum("driveStatus", DriveStatus.class);

    public final StringPath endAddr = createString("endAddr");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final TimePath<java.time.LocalTime> maybeEndTime = createTime("maybeEndTime", java.time.LocalTime.class);

    public final TimePath<java.time.LocalTime> maybeStartTime = createTime("maybeStartTime", java.time.LocalTime.class);

    public final ListPath<hyfive.gachita.node.Node, hyfive.gachita.node.QNode> nodeList = this.<hyfive.gachita.node.Node, hyfive.gachita.node.QNode>createList("nodeList", hyfive.gachita.node.Node.class, hyfive.gachita.node.QNode.class, PathInits.DIRECT2);

    public final TimePath<java.time.LocalTime> realEndTime = createTime("realEndTime", java.time.LocalTime.class);

    public final TimePath<java.time.LocalTime> realStartTime = createTime("realStartTime", java.time.LocalTime.class);

    public final StringPath startAddr = createString("startAddr");

    public final NumberPath<Integer> userCount = createNumber("userCount", Integer.class);

    public QPath(String variable) {
        this(Path.class, forVariable(variable), INITS);
    }

    public QPath(com.querydsl.core.types.Path<? extends Path> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPath(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPath(PathMetadata metadata, PathInits inits) {
        this(Path.class, metadata, inits);
    }

    public QPath(Class<? extends Path> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.car = inits.isInitialized("car") ? new hyfive.gachita.car.QCar(forProperty("car"), inits.get("car")) : null;
    }

}

