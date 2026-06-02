import {getAllLogsService, getLogByIdService, createLogService, updateLogService, deleteLogService} from './logs.service.js';

const createLog = async (req, res) => {
    result = await createLogService(req.body, req.user.id);
    res.status(201).json(result);
}
    