import { v4 } from "uuid";
import { request } from "../helpers/app";

describe("Products", () => {
  describe("POST /product", () => {
    it("responds with 201 status code and newly created product data if product has been created successfully", async () => {
      const requestBody = {
        product: {
          name: `product-name-${v4()}`,
          description: `product-description-${v4()}`,
          price: Math.random() * 50,
        },
      };
      const expectedResponseBody = {
        product: {
          ...requestBody.product,
          id: expect.anything(),
          createAt: expect.anything(),
        },
      };
      const response = await request.post("/product").send(requestBody);

      expect(response.body).toEqual(expectedResponseBody);
      expect(typeof response.body.id).toEqual("string");
      expect(new Date().getTime() - new Date(response.body.createAt).getTime()).toBeLessThan(1000);
      expect(response.statusCode).toEqual(201);
    });
  });
});
