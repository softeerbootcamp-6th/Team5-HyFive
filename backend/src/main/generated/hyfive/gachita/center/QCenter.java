package hyfive.gachita.center;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCenter is a Querydsl query type for Center
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCenter extends EntityPathBase<Center> {

    private static final long serialVersionUID = 1321480076L;

    public static final QCenter center = new QCenter("center");

    public final ListPath<hyfive.gachita.car.Car, hyfive.gachita.car.QCar> carList = this.<hyfive.gachita.car.Car, hyfive.gachita.car.QCar>createList("carList", hyfive.gachita.car.Car.class, hyfive.gachita.car.QCar.class, PathInits.DIRECT2);

    public final StringPath centerAddr = createString("centerAddr");

    public final StringPath centerName = createString("centerName");

    public final StringPath centerTel = createString("centerTel");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Double> lat = createNumber("lat", Double.class);

    public final NumberPath<Double> lng = createNumber("lng", Double.class);

    public QCenter(String variable) {
        super(Center.class, forVariable(variable));
    }

    public QCenter(Path<? extends Center> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCenter(PathMetadata metadata) {
        super(Center.class, metadata);
    }

}

