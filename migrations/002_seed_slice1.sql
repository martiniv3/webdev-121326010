INSERT INTO users (id, email, password_hash)
VALUES (1, 'student@example.com', '$2a$10$.24znOdgCk2ZdTiSx9vpre4N6mUD5o4QTkF/jsNZZtKgijZ2nuXgK')
ON CONFLICT(id) DO UPDATE SET password_hash = excluded.password_hash;

INSERT OR IGNORE INTO events (id, title, description, event_date, event_time, location, capacity) VALUES
  (1, 'Welcome Mixer', 'Meet fellow club members and start the semester together.', date('now', '+7 day'), '18:00', 'Student Union Hall', 40),
  (2, 'Board Games Night', 'A relaxed evening of board games and snacks.', date('now', '+14 day'), '19:00', 'Room 204', 24),
  (3, 'Campus Clean-up', 'Help improve shared campus spaces with the club.', date('now', '+21 day'), '10:00', 'North Gate', 30);
