package hyfive.gachita.book;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBook is a Querydsl query type for Book
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBook extends EntityPathBase<Book> {

    private static final long serialVersionUID = -173036212L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBook book = new QBook("book");

    public final StringPath bookName = createString("bookName");

    public final EnumPath<BookStatus> bookStatus = createEnum("bookStatus", BookStatus.class);

    public final StringPath bookTel = createString("bookTel");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final TimePath<java.time.LocalTime> deadline = createTime("deadline", java.time.LocalTime.class);

    public final StringPath endAddr = createString("endAddr");

    public final NumberPath<Double> endLat = createNumber("endLat", Double.class);

    public final NumberPath<Double> endLng = createNumber("endLng", Double.class);

    public final DatePath<java.time.LocalDate> hospitalDate = createDate("hospitalDate", java.time.LocalDate.class);

    public final TimePath<java.time.LocalTime> hospitalTime = createTime("hospitalTime", java.time.LocalTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final hyfive.gachita.path.QPath path;

    public final StringPath startAddr = createString("startAddr");

    public final NumberPath<Double> startLat = createNumber("startLat", Double.class);

    public final NumberPath<Double> startLng = createNumber("startLng", Double.class);

    public final BooleanPath walker = createBoolean("walker");

    public QBook(String variable) {
        this(Book.class, forVariable(variable), INITS);
    }

    public QBook(com.querydsl.core.types.Path<? extends Book> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBook(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBook(PathMetadata metadata, PathInits inits) {
        this(Book.class, metadata, inits);
    }

    public QBook(Class<? extends Book> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.path = inits.isInitialized("path") ? new hyfive.gachita.path.QPath(forProperty("path"), inits.get("path")) : null;
    }

}

