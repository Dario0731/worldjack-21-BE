-- ============================================
-- Tabla: Players
-- ============================================
CREATE TABLE players (
    id INT IDENTITY(1,1) PRIMARY KEY,
    worldId NVARCHAR(255) NOT NULL UNIQUE,
    username NVARCHAR(255) NOT NULL,
    balance INT DEFAULT 1000,
    isActive BIT DEFAULT 1
);


-- ============================================
-- Tabla: Bank
-- ============================================
CREATE TABLE bank (
    id INT IDENTITY(1,1) PRIMARY KEY,
    score INT DEFAULT 0
);

-- ============================================
-- Tabla: Games
-- ============================================
CREATE TABLE games (
    id INT IDENTITY(1,1) PRIMARY KEY,
    player_id INT NOT NULL,
    bank_id INT NOT NULL,
    bet_amount INT NOT NULL,
    player_score INT DEFAULT 0,
    bank_score INT DEFAULT 0,
    status NVARCHAR(10) DEFAULT 'playing' 
        CHECK (status IN ('playing', 'won', 'lost', 'push')),
    created_at DATETIME DEFAULT GETDATE(),

    CONSTRAINT fk_games_player FOREIGN KEY (player_id)
        REFERENCES players(id) ON DELETE CASCADE,

    CONSTRAINT fk_games_bank FOREIGN KEY (bank_id)
        REFERENCES bank(id) ON DELETE CASCADE
);
-- ============================================
-- Tabla: Transactions
-- ============================================
CREATE TABLE transactions (
    id INT IDENTITY(1,1) PRIMARY KEY,
    player_id INT NOT NULL,
    amount INT NOT NULL,
    type NVARCHAR(10) NOT NULL 
        CHECK (type IN ('bet', 'win', 'lose', 'deposit')),
    created_at DATETIME DEFAULT GETDATE(),

    CONSTRAINT fk_transactions_player FOREIGN KEY (player_id)
        REFERENCES players(id) ON DELETE CASCADE
);
