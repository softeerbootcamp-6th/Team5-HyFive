INSERT INTO path (
    path_id,
    car_id,
    rental_id,
    maybe_start_time,
    maybe_end_time,
    real_start_time,
    real_end_time,
    drive_date,
    start_addr,
    end_addr,
    user_count,
    drive_status
) VALUES (
             1,
             1,  -- car_id
             1,  -- rental_id
             '08:00:00',   -- maybe_start_time
             '09:30:00',   -- maybe_end_time
             '08:05:00',   -- real_start_time
             '09:25:00',   -- real_end_time
             '2025-08-20', -- drive_date
             '세종대로 175', -- start_addr
             '테헤란로 427', -- end_addr
             3,            -- user_count
             'WAITING'     -- drive_status
         );


-- CENTER 노드 (book_id 없음)
INSERT INTO node (node_id, path_id, book_id, lat, lng, time, type) VALUES
    (1, 1, NULL, 37.566500000000000, 126.978000000000000, '08:00:00', 'CENTER');

-- Book 1 (START → END)
INSERT INTO node (node_id, path_id, book_id, lat, lng, time, type) VALUES
                                                                       (2, 1, 1, 37.567000000000000, 126.979000000000000, '08:05:00', 'START'),
                                                                       (3, 1, 1, 37.568000000000000, 126.980000000000000, '08:30:00', 'END');

-- Book 2
INSERT INTO node (node_id, path_id, book_id, lat, lng, time, type) VALUES
                                                                       (4, 1, 2, 37.569000000000000, 126.981000000000000, '08:10:00', 'START'),
                                                                       (5, 1, 2, 37.570000000000000, 126.982000000000000, '08:40:00', 'END');

-- Book 3
INSERT INTO node (node_id, path_id, book_id, lat, lng, time, type) VALUES
                                                                       (6, 1, 3, 37.571000000000000, 126.983000000000000, '08:15:00', 'START'),
                                                                       (7, 1, 3, 37.572000000000000, 126.984000000000000, '08:50:00', 'END');

-- Book 4
INSERT INTO node (node_id, path_id, book_id, lat, lng, time, type) VALUES
                                                                       (8, 1, 4, 37.573000000000000, 126.985000000000000, '08:20:00', 'START'),
                                                                       (9, 1, 4, 37.574000000000000, 126.986000000000000, '09:00:00', 'END');

-- Book 5
INSERT INTO node (node_id, path_id, book_id, lat, lng, time, type) VALUES
                                                                       (10, 1, 5, 37.575000000000000, 126.987000000000000, '08:25:00', 'START'),
                                                                       (11, 1, 5, 37.576000000000000, 126.988000000000000, '09:10:00', 'END');


INSERT INTO segment (segment_id, start_id, end_id, duration, sequence) VALUES
                                                                           (1, 1, 2, 5, 1),   -- CENTER → Book1 START
                                                                           (2, 2, 4, 5, 2),   -- Book1 START → Book2 START
                                                                           (3, 4, 6, 5, 3),   -- Book2 START → Book3 START
                                                                           (4, 6, 8, 5, 4),   -- Book3 START → Book4 START
                                                                           (5, 8, 10, 5, 5),  -- Book4 START → Book5 START
                                                                           (6, 10, 3, 10, 6), -- Book5 START → Book1 END
                                                                           (7, 3, 5, 10, 7),  -- Book1 END → Book2 END
                                                                           (8, 5, 7, 10, 8),  -- Book2 END → Book3 END
                                                                           (9, 7, 9, 10, 9),  -- Book3 END → Book4 END
                                                                           (10, 9, 11, 10, 10); -- Book4 END → Book5 END


-- Segment 1 (CENTER → Book1 START)
INSERT INTO point (point_id, segment_id, lat, lng) VALUES
                                                       (1, 1, 37.566700000000000, 126.978500000000000),
                                                       (2, 1, 37.567000000000000, 126.979000000000000);

-- Segment 2 (Book1 START → Book2 START)
INSERT INTO point (point_id, segment_id, lat, lng) VALUES
                                                       (3, 2, 37.568000000000000, 126.980000000000000),
                                                       (4, 2, 37.569000000000000, 126.981000000000000);

-- Segment 3
INSERT INTO point (point_id, segment_id, lat, lng) VALUES
                                                       (5, 3, 37.569500000000000, 126.981500000000000),
                                                       (6, 3, 37.571000000000000, 126.983000000000000);

-- Segment 4
INSERT INTO point (point_id, segment_id, lat, lng) VALUES
                                                       (7, 4, 37.572000000000000, 126.984000000000000),
                                                       (8, 4, 37.573000000000000, 126.985000000000000);

-- Segment 5
INSERT INTO point (point_id, segment_id, lat, lng) VALUES
                                                       (9, 5, 37.574000000000000, 126.986000000000000),
                                                       (10, 5, 37.575000000000000, 126.987000000000000);

-- Segment 6
INSERT INTO point (point_id, segment_id, lat, lng) VALUES
                                                       (11, 6, 37.570000000000000, 126.982000000000000),
                                                       (12, 6, 37.568000000000000, 126.980000000000000);

-- Segment 7
INSERT INTO point (point_id, segment_id, lat, lng) VALUES
                                                       (13, 7, 37.570500000000000, 126.982500000000000),
                                                       (14, 7, 37.572000000000000, 126.984000000000000);

-- Segment 8
INSERT INTO point (point_id, segment_id, lat, lng) VALUES
                                                       (15, 8, 37.572500000000000, 126.984500000000000),
                                                       (16, 8, 37.574000000000000, 126.986000000000000);

-- Segment 9
INSERT INTO point (point_id, segment_id, lat, lng) VALUES
                                                       (17, 9, 37.574500000000000, 126.986500000000000),
                                                       (18, 9, 37.576000000000000, 126.988000000000000);

-- Segment 10
INSERT INTO point (point_id, segment_id, lat, lng) VALUES
                                                       (19, 10, 37.575500000000000, 126.987500000000000),
                                                       (20, 10, 37.576000000000000, 126.988000000000000);
