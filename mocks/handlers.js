// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";
import { URL } from "../js/constants/api";

export const handlers = [
  http.post(`${URL}auth/register`, () => {
    return HttpResponse.json({
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
    });
  }),
];
