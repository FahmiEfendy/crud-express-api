const _ = require("lodash");
const Request = require("supertest");

const GeneralHelper = require("../../server/helpers/generalHelper");
const MoviePlugin = require("../../server/api/movie");

let apiUrl;

describe("Movie JSON", () => {
  beforeAll(() => {
    server = GeneralHelper.createTestServer("/movie", MoviePlugin);
  });

  afterAll(async () => {
    await server.close();
  });

  describe("Movie", () => {
    beforeEach(() => {
      apiUrl = "/movie";
      id = "1";
    });

    test("Should Return 200: GET All Movie", async () => {
      await Request(server)
        .get(apiUrl)
        .expect(200)
        .then((res) => {
          expect(!_.isEmpty(res.body.data)).toBeTruthy();
          expect(res.body.data.length).toBe(10);

          const testData = _.find(
            res.body.data,
            (item) => item.title.toLowerCase() === "avatar"
          );
          expect(!_.isEmpty(testData)).toBeTruthy();
        });
    });

    test("Should Return 200: GET Movie By Id", async () => {
      await Request(server)
        .get(`${apiUrl}/${id}`)
        .expect(200)
        .then((res) => {
          expect(!_.isEmpty(res.body.data)).toBeTruthy();
          expect(res.body.data.length).toBe(1);

          const testData = _.find(
            res.body.data,
            (item) => item.title.toLowerCase() === "inception"
          );
          expect(!_.isEmpty(testData)).toBeTruthy();

          const testData2 = _.find(
            res.body.data,
            (item) => item.title.toLowerCase() === "avatar"
          );
          expect(_.isEmpty(testData2)).toBeTruthy();
        });
    });
  });
});
