-- Insert sample bridges
INSERT INTO bridges (name, location, type, status, construction_start_date, expected_completion_date) VALUES
('Tower Bridge Prime', 'Downtown District', 'drawbridge', 'operational', '2024-01-15', '2025-12-31'),
('Riverside Draw', 'Commerce Zone', 'drawbridge', 'maintenance', '2023-06-01', '2025-06-30'),
('Harbor Gate', 'Port Area', 'drawbridge', 'under_inspection', '2024-03-10', '2026-03-10'),
('Central Crossing', 'City Center', 'drawbridge', 'operational', '2023-11-01', '2025-11-01');

-- Insert bridge components for Tower Bridge Prime
INSERT INTO bridge_components (bridge_id, name, component_type, installation_date) VALUES
(1, 'Main Cable Left', 'cable', '2024-01-20'),
(1, 'Main Cable Right', 'cable', '2024-01-20'),
(1, 'Motor Assembly A', 'motor', '2024-02-01'),
(1, 'Motor Assembly B', 'motor', '2024-02-01'),
(1, 'Deck Section North', 'deck', '2024-02-15'),
(1, 'Deck Section South', 'deck', '2024-02-15'),
(1, 'Support Frame Main', 'support', '2024-01-15');

-- Insert bridge components for Riverside Draw
INSERT INTO bridge_components (bridge_id, name, component_type, installation_date) VALUES
(2, 'Main Cable A', 'cable', '2023-06-10'),
(2, 'Main Cable B', 'cable', '2023-06-10'),
(2, 'Motor Unit', 'motor', '2023-07-01'),
(2, 'Hinges', 'hinge', '2023-07-15'),
(2, 'Counterweight System', 'counterweight', '2023-08-01');

-- Insert bridge components for Harbor Gate
INSERT INTO bridge_components (bridge_id, name, component_type, installation_date) VALUES
(3, 'Cable Assembly', 'cable', '2024-03-15'),
(3, 'Drive Motor', 'motor', '2024-03-20'),
(3, 'Inspection Sensor', 'sensor', '2024-04-01');

-- Insert bridge components for Central Crossing
INSERT INTO bridge_components (bridge_id, name, component_type, installation_date) VALUES
(4, 'Cables', 'cable', '2023-11-05'),
(4, 'Main Motor', 'motor', '2023-11-10'),
(4, 'Deck Platform', 'deck', '2023-11-20'),
(4, 'Monitoring Sensor', 'sensor', '2023-12-01');

-- Insert component health status
INSERT INTO component_health (component_id, health_status, temperature_celsius, stress_level_percent, last_maintenance_date, next_maintenance_date) VALUES
(1, 'good', 35.5, 45.0, '2025-01-01', '2025-07-01'),
(2, 'good', 36.2, 43.5, '2025-01-01', '2025-07-01'),
(3, 'excellent', 42.0, 55.0, '2025-02-01', '2025-08-01'),
(4, 'good', 41.5, 54.2, '2025-02-01', '2025-08-01'),
(5, 'fair', 38.0, 65.0, '2024-12-01', '2025-06-01'),
(6, 'good', 37.5, 62.0, '2024-12-01', '2025-06-01'),
(7, 'excellent', 32.0, 40.0, '2025-01-15', '2025-07-15'),
(8, 'poor', 48.5, 75.0, '2024-11-01', '2025-05-01'),
(9, 'fair', 46.0, 72.0, '2024-11-15', '2025-05-15'),
(10, 'good', 44.0, 60.0, '2024-12-10', '2025-06-10'),
(11, 'critical', 55.0, 88.0, '2024-10-01', '2025-04-01'),
(12, 'good', 40.0, 58.0, '2024-12-20', '2025-06-20'),
(13, 'excellent', 33.0, 35.0, '2025-01-10', '2025-07-10'),
(14, 'good', 39.0, 52.0, '2024-12-15', '2025-06-15'),
(15, 'good', 37.0, 48.0, '2024-12-20', '2025-06-20'),
(16, 'fair', 45.0, 68.0, '2024-11-20', '2025-05-20'),
(17, 'excellent', 34.0, 38.0, '2025-01-20', '2025-07-20');

-- Insert sample alerts
INSERT INTO alerts (component_id, severity, alert_message, is_active) VALUES
(5, 'warning', 'Deck section showing wear patterns - schedule maintenance', TRUE),
(8, 'critical', 'Cable showing signs of corrosion - immediate attention required', TRUE),
(9, 'warning', 'Hinge temperature elevated - monitor closely', TRUE),
(11, 'critical', 'Motor stress level critically high - stop operations', TRUE),
(6, 'info', 'Routine inspection completed', FALSE),
(12, 'warning', 'Counterweight alignment off by 2mm', TRUE);

-- Insert sample health readings (last 30 days simulation)
INSERT INTO health_readings (component_id, temperature_celsius, stress_level_percent, vibration_level, humidity_percent, reading_timestamp) VALUES
(1, 35.2, 44.8, 2.1, 65.5, NOW() - INTERVAL '1 day'),
(1, 35.8, 45.5, 2.3, 64.2, NOW() - INTERVAL '2 days'),
(1, 34.9, 44.2, 2.0, 66.1, NOW() - INTERVAL '3 days'),
(2, 36.0, 43.2, 2.2, 65.0, NOW() - INTERVAL '1 day'),
(2, 36.5, 44.0, 2.4, 63.8, NOW() - INTERVAL '2 days'),
(3, 41.8, 54.8, 1.5, 58.0, NOW() - INTERVAL '1 day'),
(3, 42.3, 55.5, 1.6, 57.2, NOW() - INTERVAL '2 days'),
(8, 48.2, 74.5, 3.8, 72.1, NOW() - INTERVAL '1 day'),
(8, 49.0, 75.8, 4.1, 71.5, NOW() - INTERVAL '2 days'),
(11, 54.5, 87.2, 5.2, 68.0, NOW() - INTERVAL '1 day'),
(11, 55.5, 88.5, 5.5, 67.3, NOW() - INTERVAL '2 days');
