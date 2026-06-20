import pool from '../../common/config/db.js';

const createLogService = async (logData, userId) => {
    const { emotion, thought } = logData;

    const emotionRes = await pool.query(
        'INSERT INTO emotions (emotion) VALUES ($1) RETURNING id, emotion',
        [emotion]
    );
    const emotion_id = emotionRes.rows[0].id;

    const thoughtRes = await pool.query(
        'INSERT INTO thoughts (thought) VALUES ($1) RETURNING id, thought',
        [thought]
    );
    const thought_id = thoughtRes.rows[0].id;

    const logRes = await pool.query(
        'INSERT INTO logs (user_id, emotion_id, thought_id) VALUES ($1, $2, $3) RETURNING id, created_at',
        [userId, emotion_id, thought_id]
    );

    const row = logRes.rows[0];
    return {
        id: row.id,
        emotion: emotionRes.rows[0].emotion,
        thought: thoughtRes.rows[0].thought,
        created_at: row.created_at,
    };
};

const getAllLogsService = async (userId) => {
    const logs = await pool.query(
        `SELECT logs.id, emotions.emotion, thoughts.thought, logs.created_at
         FROM logs
         JOIN emotions ON logs.emotion_id = emotions.id
         JOIN thoughts ON logs.thought_id = thoughts.id
         WHERE logs.user_id = $1
         ORDER BY logs.created_at DESC`,
        [userId]
    );
    return logs.rows;
};

const getLogByIdService = async (id, userId) => {
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
    const { emotion, thought } = logData;

    // Verify log belongs to user and get related ids
    const logRowRes = await pool.query('SELECT emotion_id, thought_id FROM logs WHERE id = $1 AND user_id = $2', [id, userId]);
    if (logRowRes.rowCount === 0) return null;
    const { emotion_id, thought_id } = logRowRes.rows[0];

    const emotionRes = await pool.query('UPDATE emotions SET emotion = $1 WHERE id = $2 RETURNING id, emotion', [emotion, emotion_id]);
    const thoughtRes = await pool.query('UPDATE thoughts SET thought = $1 WHERE id = $2 RETURNING id, thought', [thought, thought_id]);

    const updated = await pool.query(
        `SELECT logs.id, emotions.emotion, thoughts.thought, logs.created_at
         FROM logs
         JOIN emotions ON logs.emotion_id = emotions.id
         JOIN thoughts ON logs.thought_id = thoughts.id
         WHERE logs.id = $1 AND logs.user_id = $2`,
        [id, userId]
    );

    return updated.rows[0];
};

const deleteLogService = async (id, userId) => {
    const log = await pool.query('DELETE FROM logs WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
    return log.rows[0];
};

export { createLogService, getAllLogsService, getLogByIdService, updateLogService, deleteLogService };