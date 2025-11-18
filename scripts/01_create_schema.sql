-- Create Bridges table
CREATE TABLE IF NOT EXISTS bridges (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  location VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL DEFAULT 'drawbridge',
  status VARCHAR(50) NOT NULL DEFAULT 'operational' CHECK (status IN ('operational', 'maintenance', 'under_inspection', 'closed')),
  construction_start_date DATE,
  expected_completion_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Bridge Components table
CREATE TABLE IF NOT EXISTS bridge_components (
  id SERIAL PRIMARY KEY,
  bridge_id INTEGER NOT NULL REFERENCES bridges(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  component_type VARCHAR(100) NOT NULL CHECK (component_type IN ('cable', 'motor', 'deck', 'support', 'hinge', 'counterweight', 'sensor')),
  installation_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(bridge_id, name)
);

-- Create Component Health table
CREATE TABLE IF NOT EXISTS component_health (
  id SERIAL PRIMARY KEY,
  component_id INTEGER NOT NULL REFERENCES bridge_components(id) ON DELETE CASCADE,
  health_status VARCHAR(50) NOT NULL DEFAULT 'good' CHECK (health_status IN ('excellent', 'good', 'fair', 'poor', 'critical')),
  temperature_celsius DECIMAL(5, 2),
  stress_level_percent DECIMAL(5, 2),
  last_maintenance_date DATE,
  next_maintenance_date DATE,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id SERIAL PRIMARY KEY,
  component_id INTEGER NOT NULL REFERENCES bridge_components(id) ON DELETE CASCADE,
  severity VARCHAR(50) NOT NULL DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical')),
  alert_message TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP
);

-- Create Health Readings table for historical data
CREATE TABLE IF NOT EXISTS health_readings (
  id SERIAL PRIMARY KEY,
  component_id INTEGER NOT NULL REFERENCES bridge_components(id) ON DELETE CASCADE,
  temperature_celsius DECIMAL(5, 2),
  stress_level_percent DECIMAL(5, 2),
  vibration_level DECIMAL(5, 2),
  humidity_percent DECIMAL(5, 2),
  reading_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_component_bridge ON bridge_components(bridge_id);
CREATE INDEX idx_health_component ON component_health(component_id);
CREATE INDEX idx_alert_component ON alerts(component_id);
CREATE INDEX idx_alert_active ON alerts(is_active);
CREATE INDEX idx_readings_component ON health_readings(component_id);
CREATE INDEX idx_readings_timestamp ON health_readings(reading_timestamp);
