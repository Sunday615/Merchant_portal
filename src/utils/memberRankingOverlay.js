export const AUTH_USER_PROFILE_STORAGE_KEY = "merchant-portal:auth-user-profile";
export const MEMBER_RANKING_OVERLAY_PENDING_KEY =
  "merchant-portal:member-ranking-overlay-pending";

const BANKCODE_PATHS = [
  ["bankcode"],
  ["bankCode"],
  ["memberBankCode"],
  ["member_bank_code"],
  ["member", "bankcode"],
  ["member", "bankCode"],
  ["member", "memberBankCode"],
  ["member", "member_bank_code"],
  ["bank", "bankcode"],
  ["bank", "bankCode"],
  ["profile", "bankcode"],
  ["profile", "bankCode"],
  ["user", "bankcode"],
  ["user", "bankCode"],
  ["memberInfo", "bankcode"],
  ["memberInfo", "bankCode"],
];

const safeParseJson = (value) => {
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch (error) {
    console.error("Failed to parse member ranking overlay storage:", error);
    return null;
  }
};

const readPath = (source, path) =>
  path.reduce(
    (value, key) =>
      value && typeof value === "object" && key in value ? value[key] : undefined,
    source
  );

const normalizeBankcode = (value) => {
  const normalized = String(value || "").trim();
  return normalized ? normalized.toUpperCase() : "";
};

export const normalizeRole = (value) => String(value || "").trim().toLowerCase();

export const readStoredAuthUserProfile = () => {
  if (typeof window === "undefined") return null;

  return safeParseJson(localStorage.getItem(AUTH_USER_PROFILE_STORAGE_KEY));
};

export const writeStoredAuthUserProfile = (profile) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(AUTH_USER_PROFILE_STORAGE_KEY, JSON.stringify(profile || {}));
  } catch (error) {
    console.error("Failed to persist auth user profile:", error);
  }
};

export const clearStoredAuthUserProfile = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(AUTH_USER_PROFILE_STORAGE_KEY);
};

export const resolveStoredUserBankcode = (source = readStoredAuthUserProfile()) => {
  const candidates = BANKCODE_PATHS.map((path) => readPath(source, path));

  if (typeof window !== "undefined") {
    candidates.push(localStorage.getItem("bankcode"));
  }

  for (const candidate of candidates) {
    const normalized = normalizeBankcode(candidate);
    if (normalized) {
      return normalized;
    }
  }

  return "";
};

export const queueMemberRankingOverlay = (payload = {}) => {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(
      MEMBER_RANKING_OVERLAY_PENDING_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        ...payload,
      })
    );
  } catch (error) {
    console.error("Failed to queue member ranking overlay:", error);
  }
};

export const readQueuedMemberRankingOverlay = () => {
  if (typeof window === "undefined") return null;

  return safeParseJson(sessionStorage.getItem(MEMBER_RANKING_OVERLAY_PENDING_KEY));
};

export const clearQueuedMemberRankingOverlay = () => {
  if (typeof window === "undefined") return;

  sessionStorage.removeItem(MEMBER_RANKING_OVERLAY_PENDING_KEY);
};
