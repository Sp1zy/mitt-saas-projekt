import { supabase } from '../auth/supabase.js';

const REQUESTS_TABLE = 'requests';
const REQUEST_COLUMNS = 'id, title, details, status, assigned_engineer, sprint_ends_on, created_at, updated_at';

function toRequest(row) {
    return {
        id: row.id,
        title: row.title,
        details: row.details,
        status: row.status,
        assignedEngineer: row.assigned_engineer,
        sprintEndsOn: row.sprint_ends_on,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

function throwIfError(error) {
    if (error) throw new Error(error.message);
}

export async function listRequests() {
    const { data: rows, error } = await supabase
        .from(REQUESTS_TABLE)
        .select(REQUEST_COLUMNS)
        .order('created_at', { ascending: false });
    throwIfError(error);
    return rows.map(toRequest);
}

export async function createRequest({ userId, title, details }) {
    const { data: row, error } = await supabase
        .from(REQUESTS_TABLE)
        .insert({ user_id: userId, title, details })
        .select(REQUEST_COLUMNS)
        .single();
    throwIfError(error);
    return toRequest(row);
}

export async function updateRequest(requestId, { title, details }) {
    const { data: row, error } = await supabase
        .from(REQUESTS_TABLE)
        .update({ title, details })
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
