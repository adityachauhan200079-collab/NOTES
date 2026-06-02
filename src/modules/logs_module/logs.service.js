const createLogService = async (logData, userId) => {
    // Implementation for creating a log

    const {emotion , thought} = logData;
    const user_id = userId;

    const emotion = await pool.query("INSERT INTO emotions (emotion) VALUES ($1) RETURNING id", [emotion]);
    const emotion_id = emotion.rows[0].id;

    const thought = await pool.query("INSERT INTO thoughts (thought) VALUES ($1) RETURNING id", [thought]);
    const thought_id = thought.rows[0].id;

    const log = await pool.query("INSERT INTO logs (user_id, emotion_id, thought_id) VALUES ($1, $2, $3) RETURNING *", [user_id, emotion_id, thought_id]);
    return log.rows[0];   
};

const getAllLogsService = async (userId) => {
    // Implementation for getting all logs for a user

    const logs = await pool.query(
        `SELECT logs.id, emotions.emotion, thoughts.thought, logs.created_at 
         FROM logs 
         JOIN emotions ON logs.emotion_id = emotions.id 
         JOIN thoughts ON logs.thought_id = thoughts.id 
         WHERE logs.user_id = $1`,
        [userId]
    );
    return logs.rows;
};

const getLogByIdService = async (id, userId) => {
    // Implementation for getting a log by ID
    const log = await pool.query(
        `SELECT logs.id, emotions.emotion, thoughts.thought, logs.created_at 
         FROM logs 
         JOIN emotions ON logs.emotion_id = emotions.id 
         JOIN thoughts ON logs.thought_id = thoughts.id 
         WHERE logs.id = $1 AND logs.user_id = $2`,
        [id, userId]
    );
    return log.rows[0];
};

const updateLogService = async (id, logData, userId) => {
    // Implementation for updating a log
    const {emotion , thought} = logData;
    const emotion = await pool.query("UPDATE emotions SET emotion = $1 WHERE id = $2 AND user_id = $3 RETURNING id", [emotion, id, userId]);
    const emotion_id = emotion.rows[0].id;
    const thought = await pool.query("UPDATE thoughts SET thought = $1 WHERE id = $2 AND user_id = $3 RETURNING id", [thought, id, userId]);
    const thought_id = thought.rows[0].id;
};

const deleteLogService = async (id, userId) => {
    // Implementation for deleting a log
    const log = await pool.query("DELETE FROM logs WHERE id = $1 AND user_id = $2 RETURNING *", [id, userId]);
    return log.rows[0];
};  