import { expect, describe, it } from "vitest";
import { http, HttpResponse } from "msw";
import { URL } from "../../constants/api.js";
import { register } from "./register.js";
import { server } from "../../../mocks/node.js";

describe("Module | register", () => {
  it("returns the user data when registration succeeds", async () => {
    const successResponse = {
      data: {
        name: "my_username",
        email: "first.last@stud.noroff.no",
        bio: "This is my profile bio",
        avatar: {
          url: "https://img.service.com/avatar.jpg",
          alt: "My avatar alt text",
        },
        banner: {
          url: "https://img.service.com/banner.jpg",
          alt: "My banner alt text",
        },
        venueManager: true,
      },
      meta: {},
    };

    const json = await register({
      id: 1,
      name: "John Smith",
      email: "john@stud.noroff.no",
    });

    expect(json).toEqual(successResponse);
  });

  it("throws an error when registration fails", async () => {
    const url = `${URL}auth/register`;
    server.use(
      http.post(url, () => {
        return new HttpResponse("Registration failed", { status: 400 });
      })
    );

    await expect(register()).rejects.toThrow("Registration failed");
  });
});
