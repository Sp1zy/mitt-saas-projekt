import { supabase } from '../auth/supabase.js';

const REQUESTS_TABLE = 'requests';
const REQUEST_COLUMNS =
    'id, title, details, status, is_urgent, position, assigned_engineer, sprint_ends_on, created_at, updated_at';

const ROW_COLUMN_BY_FIELD = {
    title: 'title',
    details: 'details',
    isUrgent: 'is_urgent',
    position: 'position',
};

function toRequest(row) {
    return {
        id: row.id,
        title: row.title,
        details: row.details,
        status: row.status,
        isUrgent: row.is_urgent,
        position: row.position,
        assignedEngineer: row.assigned_engineer,
        sprintEndsOn: row.sprint_ends_on,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

function toRowChanges(changes) {
    const rowEntries = Object.entries(changes)
        .filter(([, value]) => value !== undefined)
        .map(([fieldName, value]) => [ROW_COLUMN_BY_FIELD[fieldName], value]);
    return Object.fromEntries(rowEntries);
}

function throwIfError(error) {
    if (error) throw new Error(error.message);
}

export async function listRequests() {
    const { data: rows, error } = await supabase
        .from(REQUESTS_TABLE)
        .select(REQUEST_COLUMNS)
        .order('position', { ascending: true })
        .order('created_at', { ascending: true });
    throwIfError(error);
    return rows.map(toRequest);
}

export async function createRequest({ userId, title, details, position }) {
    const { data: row, error } = await supabase
        .from(REQUESTS_TABLE)
        .insert({ user_id: userId, title, details, position })
        .select(REQUEST_COLUMNS)
        .single();
    throwIfError(error);
    return toRequest(row);
}

export async function updateRequest(requestId, changes) {
    const { data: row, error } = await supabase
        .from(REQUESTS_TABLE)
        .update(toRowChanges(changes))
        .eq('id', requestId)
        .select(REQUEST_COLUMNS)
        .single();
    throwIfError(error);
    return toRequest(row);
}

export async function deleteRequest(requestId) {
    const { error } = await supabase.from(REQUESTS_TABLE).delete().eq('id', requestId);
    throwIfError(error);
}
