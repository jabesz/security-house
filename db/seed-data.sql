-- Dados iniciais para usuários
INSERT INTO users (name, email, password) VALUES
('João Silva', 'joao@email.com', '123456'),
('Maria Oliveira', 'maria@email.com', '654321');

-- Dados iniciais para planos
INSERT INTO plans (name, description, price) VALUES
('Plano Básico', 'Ideal para quem está começando', 19.90),
('Plano Avançado', 'Recursos avançados para maior segurança', 49.90),
('Plano Premium', 'Tudo incluído para sua segurança total', 99.90);

-- Dados iniciais para dispositivos
INSERT INTO devices (name, status, user_id) VALUES
('Câmera Frontal', 'Ativo', 1),
('Sensor de Movimento', 'Ativo', 1),
('Câmera Lateral', 'Inativo', 2);
