import {getAllLogsService, getLogByIdService, createLogService, updateLogService, deleteLogService} from './logs.service.js';

const createLog = async (req, res) => {
    result = await createLogService(req.body, req.user.id);
    res.status(201).json(result);
}

const getAllLogs = async (req, res) => {
    result = await getAllLogsService(req.user.id);
    res.status(200).json(result);
}

const getLogById = async (req, res) => {
    const id = req.params.id;
    result = await getLogByIdService(id, req.user.id);  
    if (!result) {
        return res.status(404).json({ message: 'Log not found' });
    }   
    res.status(200).json(result);
}

const updateLog = async (req, res) => {
    const id = req.params.id;
    result = await updateLogService(id, req.body, req.user.id); 
    if (!result) {
        return res.status(404).json({ message: 'Log not found' });
    }
    res.status(200).json(result);
}

const deleteLog = async (req, res) => {
    const id = req.params.id;
    const result = await deleteLogService(id, req.user.id);
    if (!result) {
        return res.status(404).json({ message: 'Log not found' });
    }
    res.status(200).json({ message: 'Log deleted successfully' });
}
