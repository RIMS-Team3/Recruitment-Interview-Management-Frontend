const API_BASE_URL = 'https://localhost:7272';

export async function getSavedJobIds(candidateId) {
  const response = await fetch(`${API_BASE_URL}/api/saved-jobs/${candidateId}/ids`);
  if (!response.ok) throw new Error('Không tải được danh sách job đã lưu.');
  return response.json();
}

export async function getSavedJobs(candidateId) {
  const response = await fetch(`${API_BASE_URL}/api/saved-jobs/${candidateId}`);
  if (!response.ok) throw new Error('Không tải được trang job đã lưu.');
  return response.json();
}

export async function toggleSavedJob(candidateId, jobId) {
  const response = await fetch(`${API_BASE_URL}/api/saved-jobs/toggle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ candidateId, jobId })
  });

  if (!response.ok) throw new Error('Không thể cập nhật trạng thái lưu job.');
  return response.json();
}

export async function unsaveJob(candidateId, jobId) {
  const response = await fetch(`${API_BASE_URL}/api/saved-jobs`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ candidateId, jobId })
  });

  if (!response.ok) throw new Error('Không thể bỏ lưu job.');
  return response.json();
}