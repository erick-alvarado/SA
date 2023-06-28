import app from '../index'
import request from "supertest";

describe("GET /getTotal", () => {
  it("retorna status code 201 y contiene los parametros necesarios", async () => {
    const res = await request(app)
      .get("/sales/getTotal/5")
      .expect(201)
      
      const { body } = res;
      expect(body).toHaveProperty('Total');
      expect(body.Total).toHaveProperty('totalSum');
      expect(body.Total).toHaveProperty('quantitySum');
      expect(body.Total).toHaveProperty('id_supplier');
  });

  it("retorna status code 500 y no contiene los parametros necesarios", async () => {
    const res = await request(app)
      .get("/sales/getTotal/0")
      .expect(500)
      
      const { body } = res;
      expect(body).toHaveProperty('status', false);
      expect(body).toHaveProperty('msg', 'Error no existe el proveedor');
  });
});