CREATE TABLE `path` (
	`path_id`	long	NOT NULL,
	`car_id`	long	NOT NULL,
	`maybe_start_time`	time	NOT NULL,
	`maybe_end_time`	time	NOT NULL,
	`real_start_time`	time	NOT NULL,
	`real_end_time`	time	NOT NULL,
	`drive_date`	date	NOT NULL,
	`start_addr`	varchar(255)	NOT NULL,
	`end_addr`	varchar(255)	NOT NULL,
	`user_count`	int	NOT NULL,
	`drive_status`	varchar(50)	NOT NULL	DEFAULT 운행대기	COMMENT '운행대기, 운행중, 운행완료'
);

CREATE TABLE `node` (
	`node_id`	long	NOT NULL,
	`path_id`	long	NOT NULL,
	`book_id`	long	NOT NULL,
	`lat`	DECIMAL(9,6)	NOT NULL,
	`lon`	DECIMAL(9,6)	NOT NULL,
	`time`	time	NOT NULL,
	`type`	varchar(50)	NOT NULL	COMMENT 'START, END'
);

CREATE TABLE `car` (
	`car_id`	long	NOT NULL,
	`center_id2`	long	NOT NULL,
	`model_name`	varchar(255)	NOT NULL,
	`car_number`	varchar(255)	NOT NULL,
	`capacity`	int	NOT NULL,
	`low_floor`	boolean	NOT NULL,
	`car_image`	varchar(255)	NULL	COMMENT 'uuid 파일이름',
	`created_at`	timestamp	NOT NULL,
	`del_yn`	varchar(50)	NOT NULL
);

CREATE TABLE `pay` (
	`pay_id`	long	NOT NULL,
	`book_id2`	long	NOT NULL,
	`center_id2`	long	NOT NULL,
	`amount`	int	NOT NULL	DEFAULT 0,
	`pay_date`	date	NOT NULL
);

CREATE TABLE `book` (
	`book_id`	long	NOT NULL,
	`path_id`	long	NULL,
	`book_name`	varchar(255)	NOT NULL,
	`book_tel`	varchar(255)	NOT NULL,
	`book_date`	date	NOT NULL,
	`start_addr`	varchar(255)	NOT NULL,
	`end_addr`	varchar(255)	NOT NULL,
	`walker`	boolean	NOT NULL,
	`hospital_book_time`	time	NOT NULL,
	`deadline`	time	NOT NULL	COMMENT '병원 도착 시간 - 30분',
	`start_lat`	DECIMAL(9,6)	NOT NULL,
	`start_lon`	DECIMAL(9,6)	NOT NULL,
	`end_lat`	DECIMAL(9,6)	NOT NULL,
	`end_lon`	DECIMAL(9,6)	NOT NULL,
	`book_status`	varchar(50)	NOT NULL	DEFAULT 신규예약	COMMENT '신규예약, 예약성공, 예약실패, 경로확정',
	`created_at`	timestamp	NOT NULL
);

CREATE TABLE `rental` (
	`rental_id`	long	NOT NULL,
	`car_id`	long	NOT NULL,
	`rental_date`	date	NOT NULL,
	`rental_start_time`	time	NOT NULL,
	`rental_end_time`	time	NOT NULL
);

CREATE TABLE `center` (
	`center_id`	long	NOT NULL,
	`center_name`	varchar(255)	NOT NULL,
	`center_tel`	varchar(255)	NOT NULL,
	`center_addr`	varchar(255)	NOT NULL,
	`lat`	DECIMAL(9,6)	NOT NULL,
	`lon`	DECIMAL(9,6)	NOT NULL,
	`created_at`	timestamp	NOT NULL
);

ALTER TABLE `path` ADD CONSTRAINT `PK_PATH` PRIMARY KEY (
	`path_id`
);

ALTER TABLE `node` ADD CONSTRAINT `PK_NODE` PRIMARY KEY (
	`node_id`
);

ALTER TABLE `car` ADD CONSTRAINT `PK_CAR` PRIMARY KEY (
	`car_id`
);

ALTER TABLE `pay` ADD CONSTRAINT `PK_PAY` PRIMARY KEY (
	`pay_id`
);

ALTER TABLE `book` ADD CONSTRAINT `PK_BOOK` PRIMARY KEY (
	`book_id`
);

ALTER TABLE `rental` ADD CONSTRAINT `PK_RENTAL` PRIMARY KEY (
	`rental_id`
);

ALTER TABLE `center` ADD CONSTRAINT `PK_CENTER` PRIMARY KEY (
	`center_id`
);

ALTER TABLE `path` ADD CONSTRAINT `FK_car_TO_path_1` FOREIGN KEY (
	`car_id`
)
REFERENCES `car` (
	`car_id`
);

ALTER TABLE `node` ADD CONSTRAINT `FK_path_TO_node_1` FOREIGN KEY (
	`path_id`
)
REFERENCES `path` (
	`path_id`
);

ALTER TABLE `node` ADD CONSTRAINT `FK_book_TO_node_1` FOREIGN KEY (
	`book_id`
)
REFERENCES `book` (
	`book_id`
);

ALTER TABLE `car` ADD CONSTRAINT `FK_center_TO_car_1` FOREIGN KEY (
	`center_id2`
)
REFERENCES `center` (
	`center_id`
);

ALTER TABLE `pay` ADD CONSTRAINT `FK_book_TO_pay_1` FOREIGN KEY (
	`book_id2`
)
REFERENCES `book` (
	`book_id`
);

ALTER TABLE `pay` ADD CONSTRAINT `FK_center_TO_pay_1` FOREIGN KEY (
	`center_id2`
)
REFERENCES `center` (
	`center_id`
);

ALTER TABLE `book` ADD CONSTRAINT `FK_path_TO_book_1` FOREIGN KEY (
	`path_id`
)
REFERENCES `path` (
	`path_id`
);

ALTER TABLE `rental` ADD CONSTRAINT `FK_car_TO_rental_1` FOREIGN KEY (
	`car_id`
)
REFERENCES `car` (
	`car_id`
);

