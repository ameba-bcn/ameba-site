import { describe, it, expect, vi, beforeEach } from "vitest";
import useAuthStore from "./useAuthStore";
import useProfileStore from "./useProfileStore";

vi.mock("../store/services/auth.service", () => ({
  default: {
    login: vi.fn(),
    register: vi.fn(),
    validateLocalToken: vi.fn(),
    getUserData: vi.fn(),
    getMemberProfile: vi.fn(),
    updateMemberProfile: vi.fn(),
    createMemberProfile: vi.fn(),
    validateEmail: vi.fn(),
    passwordRecovery: vi.fn(),
    sendEmailPasswordRecovery: vi.fn(),
    logout: vi.fn(),
    deleteUser: vi.fn(),
  },
}));

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn(), warning: vi.fn(), info: vi.fn() },
}));

let AuthService;
beforeEach(async () => {
  const mod = await import("../store/services/auth.service");
  AuthService = mod.default;
  vi.clearAllMocks();
});

describe("useAuthStore - getMemberProfile", () => {
  it("sets user_member_data on success", async () => {
    const profile = { first_name: "Joan", type: "Regular" };
    AuthService.getMemberProfile.mockResolvedValue(profile);

    await useAuthStore.getState().getMemberProfile();
    expect(useAuthStore.getState().user_member_data).toEqual(profile);
  });

  it("calls setMember when type is Socio", async () => {
    const profile = { first_name: "Joan", type: "Socio" };
    AuthService.getMemberProfile.mockResolvedValue(profile);

    await useAuthStore.getState().getMemberProfile();
    expect(useProfileStore.getState().user_profile).toBe("MEMBER");
  });

  it("sets empty object on failure", async () => {
    AuthService.getMemberProfile.mockRejectedValue({ response: { data: { detail: "Error" } } });
    try {
      await useAuthStore.getState().getMemberProfile();
    } catch { /* expected */ }
    expect(useAuthStore.getState().user_member_data).toEqual({});
  });
});

describe("useAuthStore - updateMemberProfile", () => {
  it("updates user_member_data on success", async () => {
    const updated = { first_name: "Joan", last_name: "Updated" };
    AuthService.updateMemberProfile.mockResolvedValue(updated);

    await useAuthStore.getState().updateMemberProfile("123A", "Joan", "Updated", "612345678", "user");
    expect(useAuthStore.getState().user_member_data).toEqual(updated);
  });

  it("rejects on failure", async () => {
    AuthService.updateMemberProfile.mockRejectedValue({ response: { data: { detail: "Error" } } });
    await expect(
      useAuthStore.getState().updateMemberProfile("123A", "Joan", "Garcia", "612345678", "user"),
    ).rejects.toBeUndefined();
  });
});

describe("useAuthStore - createMemberProfile", () => {
  it("sets user_member_data on success", async () => {
    const created = { first_name: "Joan", number: 42 };
    AuthService.createMemberProfile.mockResolvedValue(created);

    await useAuthStore.getState().createMemberProfile("123A", "Joan", "Garcia", "612345678");
    expect(useAuthStore.getState().user_member_data).toEqual(created);
  });

  it("rejects on failure", async () => {
    AuthService.createMemberProfile.mockRejectedValue({ response: { data: { detail: "Error" } } });
    await expect(
      useAuthStore.getState().createMemberProfile("123A", "Joan", "Garcia", "612345678"),
    ).rejects.toBeUndefined();
  });
});

describe("useAuthStore - login", () => {
  it("sets isLoggedIn=true on success", async () => {
    AuthService.login.mockResolvedValue({ access: "tok", refresh: "ref" });

    await useAuthStore.getState().login("user", "pass");
    expect(useAuthStore.getState().isLoggedIn).toBe(true);
    expect(useProfileStore.getState().user_profile).toBe("LOGGED");
  });

  it("sets isLoggedIn=false on failure", async () => {
    AuthService.login.mockRejectedValue({ response: { data: { detail: "Bad credentials" } } });
    try {
      await useAuthStore.getState().login("user", "bad");
    } catch { /* expected */ }
    expect(useAuthStore.getState().isLoggedIn).toBe(false);
    expect(useProfileStore.getState().user_profile).toBe("GUEST");
  });
});

describe("useAuthStore - logout", () => {
  it("clears auth state on success", async () => {
    useAuthStore.setState({ isLoggedIn: true, user: { access: "t" } });
    AuthService.logout.mockResolvedValue();

    useAuthStore.getState().logout();
    // Wait for the async operation
    await vi.waitFor(() => {
      expect(useAuthStore.getState().isLoggedIn).toBe(false);
    });
  });
});
