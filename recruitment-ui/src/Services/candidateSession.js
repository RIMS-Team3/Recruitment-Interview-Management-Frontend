export function getCandidateIdFromSession() {
  const directKeys = ['candidateId', 'CandidateId', 'candidate_id'];

  for (const key of directKeys) {
    const value = localStorage.getItem(key);
    if (value) return value;
  }

  const jsonKeys = ['user', 'profile', 'authUser'];
  for (const key of jsonKeys) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;

    try {
      const parsed = JSON.parse(raw);
      if (parsed?.candidateId) return parsed.candidateId;
      if (parsed?.CandidateId) return parsed.CandidateId;
      if (parsed?.candidate_id) return parsed.candidate_id;
    } catch {
      // ignore invalid JSON and try next key
    }
  }

  return '';
}

// Bật true để test nhanh khi chưa map candidateId từ login.
export const DEV_BYPASS_LOGIN_TO_SAVE = false;

export const DEV_CANDIDATE_ID = '11111111-1111-1111-1111-111111111111';
